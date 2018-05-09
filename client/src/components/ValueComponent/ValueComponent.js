import React, { Component } from 'react';
import './ValueComponent.css';

class ValueComponent extends Component {






    //fetch data from the API
    getData = () => {

        let dataURL = "" + this.props.attribute;
        fetch(dataURL).then(res => res.json()).then((out) => {
            console.log("fetched data");
        })

    }




    //render the component 
    render() {

        //here we check if a datasource is stated, and if so fetch this data.
        if (this.props.dataSource && this.props.dataAttribute) {

            this.getData();



            return (
                <div>
                    <span style={spanStyleNumber}>data from API</span>
                </div>


            )

        }
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