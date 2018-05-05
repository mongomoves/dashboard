import React, { Component } from 'react';
import ImageHolder from './ImageHolder';
import './cell.css';

/**
 * This component represent a cell, returns a div with title, creator, 
 * timeOfCreation and an iframe 
 * */
 
 class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            i: this.props.content.i
        }

        this.frameSize = React.createRef();    
    }
    


    componentDidMount() {
        this.setState({
            width: this.frameSize.current.offsetWidth,
            height: this.frameSize.current.offsetHeight
        });
    }

    render() {
        console.log("width: " + this.state.width);
        console.log("height: " + this.state.height);
        return (
            <div 
                ref={this.frameSize} 
                className="cellBody"
                >
                <div className="cellTitle">
                    {this.props.content.title}
                </div>
                <div>
                    <ImageHolder 
                        width={this.state.width}
                        height={(this.state.height - 40)}
                        image={this.props.content.img}/>
                </div>
            </div>
        )
    }
}

export default Cell;