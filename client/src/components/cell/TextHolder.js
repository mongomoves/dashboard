import React, {Component} from 'react';

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
            this.fetchText(this.props.values.dataSource, this.props.values.attribute);
        } else {
            this.setState({text: this.props.values.textInput});
        }
    }

    /**
     * Lifecycle method. Makes sure the component updates properly when
     * the user switches between using free text and api requests.
     */
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.values.textInput && (prevState.text !== this.props.values.textInput)) {
            this.setState({text: this.props.values.textInput, isArray: false});
        } else if(prevProps.values.dataSource !== this.props.values.dataSource || 
            prevProps.values.attribute !== this.props.values.attribute) {
                this.fetchText(this.props.values.dataSource, this.props.values.attribute);
            }
    }

    /**
     * Fetches some text from the provided URL with the provided key (attribute).
     * Sets isArray to true if an array is returned, so that it can be displayed.
     * An incorrect fetch will display a fail message.
     */
    fetchText = (url, attribute) => {
        fetch(url)
        .then(res => res.json())
        .then((out) => {
            const apiText = this.getValueByKey(out, attribute);
            if(typeof apiText === 'string' || apiText instanceof String) {
                this.setState({text: apiText, isArray: false});
            } else if (Array.isArray(apiText)) {
                this.setState({isArray: true, text: apiText});
            } else {
                this.setState({text: 'Felaktigt attribut, ingen data hämtad'});
            }
        });
    }

    /**
     * Returns the value for the specific key, even if value 
     * is nested.
     */
    getValueByKey = (object, key) => {
        var stack = [object];
        var current, index, value;
        while (stack.length) {
            current = stack.pop();
            for (index in current) {
                value = current[index];
                if (key === index) {
                    return value;
                }
                else if (value !== null && typeof value === 'object') {
                    stack.unshift(value);
                }
            }
        }
    }

    /**
     * Returns an array of elements with a div for each
     * entry in the array to display.
     */
    printArray = (array) => {
        let newArray = array.map(el => {
            let newEl;
            if(el instanceof Object) {
                newEl = JSON.stringify(el);
            } else {
                newEl = String(el);
            }
        return (
            <div key={el} style={{...spanStyleText, fontSize: `${this.calcFont()}%`}}>
                {newEl}
            </div>
            )
        });
        return newArray;
    }

    /**
     * Calculates the font size for the TextHolder, so that it is
     * neither too big nor too small.
     * Returns the size in percentage.
     */
    calcFont = () => {
        let size = this.props.width / 2;
        if(size < 200) {
            return 200;
        }
        return size;
    }

    render() {
        let content;
        if(this.state.isArray) {
            content = this.printArray(this.state.text);
        } else {
            content = (
                <span style={{...spanStyleText, fontSize: `${this.calcFont()}%`}}>{this.state.text}</span>
            )
        }
        return (
            <div style={{...divStyle, height: this.props.height - 33, width: this.props.width}}>
                {content}
            </div>
        )
    }
}

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
    textOverflow: 'ellipsis',
    whiteSpace: 'pre-line',
    display: 'block',
    justifyContent: 'center'
};