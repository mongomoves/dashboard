import React, { Component } from 'react';
import IFrameHolder from './IFrameHolder';
import './cell.css';

/**
 * This component represent a cell, returns a div with title, creator, 
 * timeOfCreation and an iframe 
 * */

class Cell extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         date: new Date().toDateString()
    //     }
    // }

    render() {
        return (
            <div className="cellBody">
                <div className="cellTitle">
                    {this.props.content.title}
                </div>
                <IFrameHolder iframe={this.props.content.iframe}/>
            </div>
        )
    }
}

export default Cell;