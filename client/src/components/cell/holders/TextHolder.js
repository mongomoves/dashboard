import React, {Component} from 'react';
import PropTypes from 'prop-types';
import jsonQuery from 'json-query';

/**
 * Component capable of holding textual information.
 */
class TextHolder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isArray: false
        }
    }

    /**
     * Lifecycle method. Fetches if necessary or simple sets text from props.
     */
    componentDidMount() {
        if(this.props.values.dataSource && this.props.values.attribute) {
            if(this.props.values.refreshRate && this.props.values.refreshRate > 0) {
                this.fetchText(this.props.values.dataSource, this.props.values.attribute);
                let intervalID = setInterval(this.updateContent, 1000 * 60 * this.props.values.refreshRate);
                this.setState({interval: intervalID});
            } else {
                this.fetchText(this.props.values.dataSource, this.props.values.attribute);
            }
        } else {
            this.setState({text: this.props.values.textInput});
        }
    }

    /**
     * React lifecycle function.
     */
    componentWillUnmount() {
        if(this.state.interval) {
            clearInterval(this.state.interval);
        }
    }

    /**
     * Lifecycle method. Makes sure the component updates properly when
     * the user switches between using free text and api requests.
     */
    componentDidUpdate(prevProps, prevState) {
        if(this.props.values.textInput && (prevState.text !== this.props.values.textInput)) {
            this.setState({
                text: this.props.values.textInput, 
                isArray: false, 
                externalData: false});
        } 
        else if(prevProps.values.dataSource !== this.props.values.dataSource || 
                prevProps.values.attribute !== this.props.values.attribute) {
            this.fetchText(this.props.values.dataSource, this.props.values.attribute);
        }
        else if ((this.props.values.refreshRate !== prevProps.values.refreshRate) && this.state.externalData) {
            if(this.state.interval) {
                clearInterval(this.state.interval);
            }
            if(this.props.values.refreshRate > 0) {
                let intervalID = setInterval(this.updateContent, 1000 * 60 * this.props.values.refreshRate);
                this.setState({interval: intervalID});
            }
        }
    }

    /**
     * Function for setInterval. Simply fetches the data for the same dataSource 
     * and attribute yet again.
     */
    updateContent = () => {
        this.fetchText(this.props.values.dataSource, this.props.values.attribute);
    };

    /**
     * Fetches some text from the provided URL with the provided key (attribute).
     * Sets isArray to true if an array is returned, so that it can be displayed.
     * An incorrect fetch will display a fail message.
     * @param {string} url URL to fetch from
     * @param {string} attribute JSON.Query formatted attribute
     */
    fetchText = (url, attribute) => {
        fetch(url).then((response) => {
            if(response.ok) {
                return response.json();
            }
            throw new Error('Fel');
        }).then((json) => {
            const apiText = jsonQuery(attribute, {data: json}).value;
            if((typeof apiText !== 'object' || !(apiText instanceof Object)) && apiText) {
                this.setState({
                    text: apiText, 
                    isArray: false, 
                    externalData: true});
            } else if (Array.isArray(apiText)) {
                this.setState({
                    isArray: true, 
                    text: apiText, 
                    externalData: true});
            } else if (!apiText) {
                this.setState({
                    text: 'Felaktigt attribut? Ingen data hämtad.', 
                    externalData: false});
                if(this.state.interval) {
                    clearInterval(this.state.interval);
                }
            }
        }).catch((error) => {
            this.setState({
                text: 'Fel: ' + error, 
                externalData: false});
            if(this.state.interval) {
                clearInterval(this.state.interval);
            }
        });
    };

    /**
     * Returns an array of elements with a div for each
     * entry in the array to display.
     * @param {*} array Array to print
     */
    renderArray = (array) => {
        let newArray = array.map(el => {
            let tempElement;
            if(el instanceof Object) {
                tempElement = JSON.stringify(el);
            } else {
                tempElement = String(el);
            }
        return (
            <div key={el} style={{...spanStyleText, fontSize: `${this.calculateFont()}%`}}>
                {tempElement}
            </div>
            )
        });
        return newArray;
    };

    /**
     * Calculates the font size for the TextHolder, so that it is
     * neither too big nor too small.
     * Returns the size in percentage.
     */
    calculateFont = () => {
        let size = this.props.width / 4;
        if(size < 150) {
            return 150;
        }
        return size;
    };

    render() {
        let content;
        if(this.state.isArray) {
            content = this.renderArray(this.state.text);
        } else {
            content = (
                <span style={{...spanStyleText, fontSize: `${this.calculateFont()}%`}}>{this.state.text}</span>
            )
        }
        return (
            <div style={{...divStyle, height: this.props.height - 33, width: this.props.width}}>
                {content}
            </div>
        )
    }
}

TextHolder.propTypes = {
    values: PropTypes.object.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
};

export default TextHolder;

const spanStyleText = {
    fontWeight: "bold",
    display: "inlineBlock",
    paddingRight: "5%",
    color: "orange"
};

//Style for the div displaying the text.
const divStyle={
    overflowX: 'hidden',
    overflowWrap: 'break-word',
    textOverflow: 'ellipsis',
    whiteSpace: 'pre-line',
    display: 'block',
    justifyContent: 'center'
};