import React, { Component } from 'react';
import './ValueComponent.css';

class ValueComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fetchResult: null,
            externalData: false,
            fetchSuccess: true



        }

    }

    //checking if external data is specified, and if true fetches it 
    componentDidMount() {
        if (this.props.dataSource && this.props.attribute) {
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
                this.setState({ fetchResult: out[attribute], externalData: true });


            })
            .catch(err => {
                this.setState({ fetchSuccess: false })

            });


    }





    render() {

        //if external data is used, it is rendered 
        if (this.state.externalData) {
            return (
                <div>
                    <span style={spanStyleNumber}>{this.state.fetchResult}</span>
                    <span style={spanStyleNumber}>{this.props.unit}</span>
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








export default ValueComponent;