import React, { Component } from "react";

//Component represent a Value cell that shows either external- or user entered data
class ValueComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            externalData: false,
            fetchSuccess: false,
        }
    }

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
        if(this.props.values.number && (prevState.number != this.props.values.number)) {
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
     * Function for interval, simply calling for a new fetch.
     */
    updateContent = () => {
        this.getData(this.props.values.dataSource, this.props.values.attribute);
    }

    /**
     * Fetch from passed url and set value found at attribute to state, if
     * a value was succesfully retrieved. 
     * @param {*} dataURL URL to fetch from
     * @param {*} attribute Attribute key for desired value
     */
    getData = (dataURL, attribute) => {
        fetch(dataURL).then((response) => {
            if(response.ok) {
                return response.json();
            }
            throw new Error('Fel');
        }).then((json) => {
            const result = this.getValueByKey(json, attribute);
            if(typeof result === 'number' || result instanceof Number) {
                this.setState({externalData: true, number: result, fetchSuccess: true});
            } else {
                this.setState({externalData: true, fetchSuccess: false});
                if(this.state.interval) {
                    clearInterval(this.state.interval);
                }
            }
        }).catch((error) => {
            this.setState({externalData: true, fetchSuccess: false});
            if(this.state.interval) {
                clearInterval(this.state.interval);
            }
        });
    }

    /**
     * Returns value for key even if nested in object.
     * @param {*} object Object to iterate
     * @param {*} key Key for value to return
     */
    getValueByKey = (object, key) => {
        var stack = [object];
        var current, index, value;
        // keep iterating until the stack is empty
        while (stack.length) {
            current = stack.pop();
            // iterate over the current object
            for (index in current) {
                value = current[index];
                // if it is a match it is returned
                if (key === index) {
                    return value;
                }
                else if (value !== null && typeof value === 'object') {
                    // add this value in the stack
                    stack.unshift(value);
                }
            }
        }
    }

    render() {
        //if external data is specified and is valid   
        if (this.state.externalData && this.state.fetchSuccess) {
            return (
                <div>
                    <span style={{...spanStyleNumber, fontSize: `${this.props.width / 9}px`}}>{this.state.number}</span>
                    <span style={{...spanStyleUnit, fontSize: `${this.props.width / 10}px`}}>{this.props.values.unit}</span>
                </div>
            )
        }

        //if invalid URL or attribute 
        if (this.state.externalData && !this.state.fetchSuccess) {
            return (
                <div>
                    <span style={spanStyleError}><b>Fel vid hämtning</b><br />Antingen är URL/attribut ogiltig, eller så överskred resultatet tillåten längd(max=6)</span>
                </div>
            )
        }

        //if user entered data 
        return (
            <div>
                <span style={{...spanStyleNumber, fontSize: `${this.props.width / 5}px`}}>{this.state.number}</span>
                <span style={{...spanStyleUnit, fontSize: `${this.props.width / 9}px`}}>{this.props.values.unit}</span>
            </div>
        );
    }
}

const spanStyleNumber = {
    fontWeight: "bold",
    display: "inlineBlock",
    paddingRight: "5%",
    color: "orange"
}

const spanStyleUnit = {
    fontWeight: "bold",
    color: "white"
}

const spanStyleError = {
    fontSize: "100%",
    color: "white"
}

export default ValueComponent;
