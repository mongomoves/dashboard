import React, { Component } from "react";

//Component represent a Value cell that shows either external- or user entered data
class ValueComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            externalData: false,
            fetchSuccess: false,
            fetchContainer: null
        }
    }

    //checking if external data is specified, and if true fetches it 
    componentWillMount() {
        if (this.props.dataSource && this.props.attribute) {
            this.setState({ externalData: true })
            this.getData();
        }
    }

    //fetching external data and sets it to state 
    getData = () => {
        let dataURL = this.props.dataSource;
        let attribute = this.props.attribute;
        let result = false;
        let maxLength = 6;

        fetch(dataURL)
            .then(res => res.json())
            .then((out) => {
                result = this.getValueByKey(out, attribute);

                    //Makes sure it is a string and not an object 
                    if (typeof result === 'string' || result instanceof String) {
                        
                        //checks so result does not exceed length limit 
                        if(result.length <= maxLength){
                            this.setState({ fetchContainer: result, fetchSuccess: true });
                        }
                       
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
        if (this.state.fetchSuccess) {
            return (
                <div>
                    <span style={{ ...spanStyleNumber, fontSize: `${this.props.width / 5}px` }}>{this.state.fetchContainer}</span>
                    <span style={{ ...spanStyleUnit, fontSize: `${this.props.width / 9}px` }}>{this.props.unit}</span>
                </div>
            )
        }

        //if invalid URL or attribute 
        if (this.state.externalData && !this.state.fetchSuccess) {
            return (
                <div>
                    <span style={spanStyleError}><b>Sorry!</b><br /> The entered URL/attribute was invalid, or value length was exceeded.</span>
                </div>
            )
        }

        //if user entered data 
        return (
            <div>
                <span style={{ ...spanStyleNumber, fontSize: `${this.props.width / 5}px` }}>{this.props.number}</span>
                <span style={{ ...spanStyleUnit, fontSize: `${this.props.width / 9}px` }}>{this.props.unit}</span>
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
