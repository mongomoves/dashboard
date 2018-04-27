import React, { Component } from 'react';
import './cell.css';



class Cell extends Component {
    constructor(props) {
        super(props);


         
        this.state = {
            dataURL: "Fetching data...",
            date: new Date().toDateString()

        }

    }


    componentDidMount() {

        //here we should get data from URL

    }



    render() {
        return (

            <div className="cell">
                <div className="cellTitle">Title: {this.props.title}</div>
                <div className="cellCreator">Created by: {this.props.creator}</div>
                <div className="cellData">{this.state.dataURL}</div>
                <div className="cellTimeOfCreation">Created on: {this.state.date}</div>
            </div>
        )

    }




}


export default Cell;