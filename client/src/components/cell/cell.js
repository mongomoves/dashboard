import React, { Component } from 'react';
import './cell.css';



class Cell extends Component {
    constructor(props) {
        super(props);



        this.state = {
            date: new Date().toDateString()
        }

    }


    componentDidMount() {

    }





    render() {
        return (

            <div className="cell">
                <div className="cellTitle"><b>Title: </b> {this.props.title}</div>
                <div className="cellCreator"><b>Who made me: </b> {this.props.creator}</div>
                <iframe className="cellData" src={this.props.dataURL} frameBorder="0"></iframe>
                <div className="cellTimeOfCreation"><b>Created on:</b> {this.state.date}</div>
            </div>
        )

    }




}

//<iframe src={this.props.dataURL} width="650" height="300" frameBorder="0"></iframe>


export default Cell;