import React, { Component } from 'react';
import './cell.css';
import GridLayout from 'react-grid-layout';


class Cell extends Component {
    constructor(props){
        super(props);

        this.state = {
            title : "",
            data : "",
            creator : ""
            
            

        }
    }





// i think we will have the data as its own component 

    render() {
        return (

            <div className="cell">
                <div className="cellTitle">Title: {this.state.title}</div>
                <div className="cellData">Data: {this.state.data}</div>
                <div className="cellCreator">Created by: {this.state.creator}</div>
            </div>
        )

    }




}


export default Cell;


