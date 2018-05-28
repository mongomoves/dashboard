import React, { Component } from "react";
import PropTypes from 'prop-types';
import jsonQuery from 'json-query';

/**
 * Represent a value in a cell. Can display static inputed value or value from some
 * external data source.
 * Can refresh data at regular intervals.
 */
class ValueHolder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            externalData: false,
            fetchSuccess: false,
        }
    }

    /**
     * React lifecycle function.
     */
    componentDidMount() {
        if (this.props.values.dataSource && this.props.values.attribute) {
            if(this.props.values.refreshRate && this.props.values.refreshRate > 0) {
                this.getData(this.props.values.dataSource, this.props.values.attribute);
                let intervalID = setInterval(this.updateContent, 1000 * 60 * this.props.values.refreshRate);
                this.setState({interval: intervalID});
            } else {
                this.getData(this.props.values.dataSource, this.props.values.attribute);
            }
        } else {
            this.setState({number: this.props.values.number});
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
     * React lifecycle function. Makes it so that the component can change between
     * source of text being displayed, and different refresh rates.
     */
    componentDidUpdate(prevProps, prevState) {
        if(this.props.values.number && (prevState.number !== this.props.values.number)) {
            this.setState({externalData: false, number: this.props.values.number});
        }
        else if(this.props.values.dataSource !== prevProps.values.dataSource ||
            this.props.values.attribute !== prevProps.values.attribute) {
            this.getData(this.props.values.dataSource, this.props.values.attribute);
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
     * Function for setInterval, simply calling for a new fetch.
     */
    updateContent = () => {
        this.getData(this.props.values.dataSource, this.props.values.attribute);
    }

    /**
     * Fetch from passed url and set value found at attribute to state, if
     * a value was succesfully retrieved. 
     * @param {string} dataURL URL to fetch from
     * @param {string} attribute JSON.Query formatted query
     */
    getData = (dataURL, attribute) => {
        fetch(dataURL).then((response) => {
            if(response.ok) {
                return response.json();
            }
            throw new Error('Fel');
        }).then((json) => {
            let result = jsonQuery(attribute, {data: json}).value;

            // If the json query results in an array, we only show the first value since the
            // component only supports showing one value at the moment.
            if (result instanceof Array) {
                result = result[0];
            }

            if(typeof result === 'number' || result instanceof Number) {
                this.setState({
                        externalData: true,
                        number: result,
                        fetchSuccess: true
                    });
            }

            //if its a string, we check if it represents a number and if true create a number variable with identical content   
            else if ((typeof result === 'string' && !isNaN(result)) || (result instanceof String && !isNaN(result))) {
                let verifiedNumber = Number(result);
                this.setState({
                        externalData: true,
                        number: verifiedNumber,
                        fetchSuccess: true
                    });
            }         
            else {
                this.setState({
                        externalData: true,
                        fetchSuccess: false
                    });
                if(this.state.interval) {
                    clearInterval(this.state.interval);
                }
            }
        }).catch((error) => {
            this.setState({
                externalData: true,
                fetchSuccess: false
            });
            if(this.state.interval) {
                clearInterval(this.state.interval);
            }
        });
    };

    /**
     * Returns a font size in percentage, trying to make it neither
     * too big to fit or too small.
     * Font size based in part on cell width.
     * @param {string} type Number or unit
     */
    calculateFont = (type) => {
        const maxWhenWide = 664;
        const minSize = 470;
        let size;
        switch (type) {
            case 'number': size = this.props.width / 1.1;
            break;
            case 'unit': size = this.props.width / 1.5;
            break;
            default: size = minSize;
        }
        if(size > maxWhenWide) {
            size = maxWhenWide;
            if(type === 'unit') {
                size -= 150;
            }
        }
        if(type === 'number' && size < minSize) {
            size = minSize;
        }
        return size; 
    }

    render() {
        if (this.state.externalData && !this.state.fetchSuccess) {
            return (
                <div>
                    <span style={spanStyleError}><b>Fel vid hämtning</b><br />Antingen är URL/attribut ogiltig, eller så överskred resultatet tillåten längd(max=6)</span>
                </div>
            )
        }
        return (
            <div style={valueDiv}>
                <span style={{...spanStyleNumber, fontSize: `${this.calculateFont('number')}%`}}>{this.state.number}</span>
                <span style={{...spanStyleUnit, fontSize: `${this.calculateFont('unit')}%`}}>{this.props.values.unit}</span>
            </div>
        );
    }
}

const valueDiv = {
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
};

const spanStyleNumber = {
    fontWeight: "bold",
    color: "orange"
};

const spanStyleUnit = {
    fontWeight: "bold",
    color: "white"
};

const spanStyleError = {
    fontSize: "100%",
    color: "white",
    overflowX: 'hidden',
    textOverflow: 'ellipsis'
};

ValueHolder.propTypes = {
    width: PropTypes.number,
    values: PropTypes.object.isRequired
};

export default ValueHolder;
