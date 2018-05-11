import React, { Component } from 'react';


class ValueComponent extends Component {
    render() { 
        return (
            <div>
                <span style={spanStyleNumber}>{this.props.number}</span>
                <span style={spanStyleUnit}>{this.props.unit}</span>
            </div>
        );
    }
}

const spanStyleNumber = {
    fontSize: "300%",
    fontWeight: "bold",
    display: "inlineBlock",
    paddingRight: "5%",
    color: "orange"
}

const spanStyleUnit = {
    fontSize: "150%",
    fontWeight: "bold",
    color: "white"
}
export default ValueComponent;