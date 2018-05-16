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

    //checking if external data is specified, and if true fetches it 
    componentDidMount() {
        if (this.props.values.dataSource && this.props.values.attribute) {
            this.getData(this.props.values.dataSource, this.props.values.attribute);
        } else {
            this.setState({number: this.props.values.number});
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.values.update && this.state.externalData) {
            this.getData(this.props.values.dataSource, this.props.values.attribute);
        } else if (this.props.values.number && (prevState.number !== this.props.values.number)) {
            this.setState({externalData: false, number: this.props.values.number});
        } else if (this.props.values.dataSource !== prevProps.values.dataSource ||
                    this.props.values.attribute !== prevProps.values.attribute) {
            this.getData(this.props.values.dataSource, this.props.values.attribute);
        }
    }

    //fetching external data and sets it to state 
    getData = (dataURL, attribute) => {
        let result = false;

        fetch(dataURL)
            .then(res => res.json())
            .then((out) => {
                result = this.getValueByKey(out, attribute);

                //Makes sure it is a string and not an object 
                if (typeof result === 'number' || result instanceof Number) {
                    this.setState({externalData: true, number: result, fetchSuccess: true });
                } else {
                    this.setState({externalData: false, fetchSuccess: false });
                }
            })
    }

    //function iterates the fetched object to find the specified attribute 
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
                    <span style={spanStyleError}><b>Sorry!</b><br /> The entered URL or attribute was invalid.</span>
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
