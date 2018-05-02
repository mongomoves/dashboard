import React, { Component } from 'react';
import './cell.css';

/** This component represent a cell, returns a div with title, creator, timeOfCreation and an iframe */

class Cell extends Component {
    constructor(props) {
        super(props);


        //sets the state to time of instantiation 
        this.state = {
            date: new Date().toDateString()
        }

    }


    //renders the cell 
    render() {
        return (
            <div className="cellBody">
                <div className="cellTitle"><b>Title: </b> {this.props.title}</div>
                <div className="cellCreator"><b>Who made me: </b> {this.props.creator}</div>
                <iframe className="cellData" src={this.props.dataURL} frameBorder="0"></iframe>
                <div className="cellTimeOfCreation"><b>Created on:</b> {this.state.date}</div>
            </div>
        )

    }




}



export default Cell;