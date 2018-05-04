import React, { Component } from 'react';
import './cell.css';

/** This component represent a cell, returns a div with title, creator, timeOfCreation and an iframe */

class Cell extends Component {
    constructor(props) {
        super(props);


        //sets the state to time of instantiation 
        this.state = {
            date: new Date().toDateString(),
            cellSizeCounter: 0
        }

    }

    //method for refitting the iframe content 
    refitContent() {
        this.setState({ cellSizeCounter: this.state.cellSizeCounter + 1 });
    }


    //renders the cell 
    render() {

        return (
            <div className="cellBody">
                <div className="cellTitle"><b>Title: </b> {this.props.title}</div>
                <div className="cellDescr"><b>Description: </b>{this.props.descr}</div>
                <div className ="cellCreator"> <b>Creator:</b> {this.props.creator}</div>
                <button className="refitContent" onClick={() => { this.refitContent(); }}>Refit content</button>
                <div className ="iframeContainer">
                    <iframe key={this.state.cellSizeCounter} className="cellData" frameBorder="0" src={this.props.dataURL}></iframe>
                </div> 
                <div className = "cellDate"><b>Created on:</b> {this.props.dateTime}</div>
            </div>
        )

    }














}



export default Cell;