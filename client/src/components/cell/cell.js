import React, { Component } from 'react';
import './cell.css';



class Cell extends Component {
    constructor(props) {
        super(props);



        this.state = {
            date: new Date().toDateString()
        }

    }


    componentDidMount() {}



    render() {
        return (

            <div className="cell">
                <div className="cellTitle">Title: {this.props.title}</div>
                <div className="cellCreator">Created by: {this.props.creator}</div>
                <iframe src={this.props.dataURL} width="650" height="300" frameborder="0"></iframe>
                <div className="cellTimeOfCreation">Created on: {this.state.date}</div>
            </div>
        )

    }




}


export default Cell;