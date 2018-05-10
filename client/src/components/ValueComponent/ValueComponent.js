import React, { Component } from 'react';
import './ValueComponent.css';

class ValueComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fetchResult: ''
        }

    }







    //fetch data from the API
    getData = () => {
        let dataURL = this.props.dataSource;
        let attribute = this.props.attribute;

        fetch(dataURL).then(res => res.json()).then((out) => {
            this.setState({ FetchResult: out[attribute] })

        }).catch(err => { throw err });

    }




    //render the component 
    render() {
        console.log("dataSource: " + this.props.dataSource + " attribute: " + this.props.attribute);
        

        //here we check if a datasource is stated, and if so fetch this data.
        if (this.props.dataSource && this.props.attribute) {
           
            console.log("Ready to fetch data")
            this.getData();



            return (
                <div>
                    <span style={spanStyleNumber}>{this.state.fetchResult}</span>
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