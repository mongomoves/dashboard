import React, { Component } from 'react';
import './cell.css';



class Cell extends Component {
    constructor(props) {
        super(props);


        //this will be passed to the component as props 
        this.state = {
            title:null,
            dataURL: null,
            creator: null,
            date: new Date().toDateString()
        


        }
    }



    render() {
        return (

            <div className="cell">
                <div className="cellTitle">Title: {this.state.title}</div>
                <div className="cellData">Data: {this.state.data}</div>
                <div className="cellCreator">Created by: {this.state.creator}</div>
                <div className="cellCreator">Created at: {this.state.date}</div>
            </div>
        )

    }




}


export default Cell;