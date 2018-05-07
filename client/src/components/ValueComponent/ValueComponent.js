import React, { Component } from 'react';
import './ValueComponent.css';

class ValueComponent extends Component {

    constructor(props) {
        super(props);

    }
    render() { 
        return (
            <div>
                <div style={divStyleNumber}>{this.props.number}</div>
                <div style={divStyleUnit}>{this.props.unit}</div>
            </div>
        );
    }
}

const divStyleNumber = {
    fontSize: "300%",
    fontWeight: "bold",
    display: "inlineBlock",
    paddingRight: "5%",
    color: "orange"
}

const divStyleUnit = {
    fontSize: "150%",
    fontWeight: "bold"
}
export default ValueComponent;