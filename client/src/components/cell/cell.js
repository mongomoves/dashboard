import React, { Component } from 'react';
import './cell.css';



class Cell extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            data: {},
            creator: "",
            date: new Date().now().toString()
        


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