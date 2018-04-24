import React, { Component } from 'react';
import './cell.css';


class Cell extends Component {
    constructor(props){
        super(props);

        this.state = {
            title : "change me" 
        }
    }







    render() {
        return (

            <div className="cell">
                <div className="title">{this.state.title}</div>
            </div>
        )

    }




}


export default Cell;

