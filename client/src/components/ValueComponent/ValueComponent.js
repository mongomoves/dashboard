import React, { Component } from "react";
import "./ValueComponent.css";

class ValueComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            externalData: false,
            fetchSuccess: false,
            fetchResult: null


        }

    }

    //checking if external data is specified, and if true fetches it 
    componentDidMount() {
        if (this.props.dataSource && this.props.attribute) {
            this.setState({ externalData: true })
            this.getData();
        }
    }




    //fetching external data 
    getData = () => {
        let dataURL = this.props.dataSource;
        let attribute = this.props.attribute;

        fetch(dataURL)
            .then(res => res.json())
            .then((out) => {

                if (out[attribute]) {
                    this.setState({ fetchResult: out[attribute], fetchSuccess: true });
                }

            })

    }





    render() {

        //if external data is used, it is rendered 
        if (this.state.fetchSuccess) {
            return (
                <div>
                    <span style={spanStyleNumber}>{this.state.fetchResult}</span>
                    <span style={spanStyleNumber}>{this.props.unit}</span>
                </div>
            )

        }
        
        //if something went wrong with external data
        if (this.state.externalData && !this.state.fetchSuccess) {
            return (
                <div>
                    <span style={spanStyleError}><b>Sorry!</b><br /> The entered URL or attribute was invalid.</span>
                </div>
             )
        }


        //if no external data, props for number and unit is rendered
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

const spanStyleError = {
    fontSize: "100%",
    color: "white"
}








export default ValueComponent;