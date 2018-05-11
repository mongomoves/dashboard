import React, { Component } from "react";
import "./ValueComponent.css";

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




    //fetching external data 
    getData = () => {
        let dataURL = this.props.dataSource;
        let attribute = this.props.attribute;

        fetch(dataURL)
            .then(res => res.json())
            .then((out) => {
              let value =  this.getValueByKey(out, attribute);
                
                    if(value) {
                    this.setState({ fetchContainer: value, fetchSuccess: true });
                }

            })

    }

    //function finds attribute in json object 
     getValueByKey = (object, key) => {

        // simulate recursion by stacking
        var stack = [object];
        var current, index, value;
      
        // keep iterating until the stack is empty
        while (stack.length) {
          // take the head of the stack
          current = stack.pop();
          // iterate over the current object
          for (index in current) {
            // get value of the iterated object
            value = current[index];
            // is it a match?
            if (key === index) {
              return value; // return the matched value
            } 
            // value must be an object and not a null value
            // to be subject for the next stack iteration
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
                    <span style={spanStyleNumber}>{this.state.fetchContainer}</span>
                    <span style={spanStyleNumber}>{this.props.unit}</span>
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