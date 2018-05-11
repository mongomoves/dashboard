import React, { Component } from 'react';


class ValueComponent extends Component {

    render() {
        console.log(this.props.width)
        return (
            <div>
                <span style={{...spanStyleNumber, fontSize: `${this.props.width / 5}px`}}>{this.props.number}</span>
                <span style={{...spanStyleUnit, fontSize: `${this.props.width / 9}px`}}>{this.props.unit}</span>
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
export default ValueComponent;