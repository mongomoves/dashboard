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
        this.remeasure = this.remeasure.bind(this);  
    }

    /**
     * Lifecycle function. Must set the height and width so it is
     * not 0.
     */
    componentDidMount() {
        this.setState({
            width: this.frameSize.current.offsetWidth,
            height: this.frameSize.current.offsetHeight
        });
    }

    /**
     * Updates the state with the current size.
     * Useful for updating a child ImageHolder onClick after Cell resize.
     */
    remeasure() {
        this.setState({
            width: this.frameSize.current.offsetWidth,
            height: this.frameSize.current.offsetHeight
        });
    }

    /**
     * Generates the DOM with the correct components depending
     * on the content of the prop.
     */
    generateDOM() {
        let dom = [];
        if(this.props.content.kind === 'Graph') {
            dom.push(<div><ImageHolder refit={this.remeasure} width={this.state.width - 10}
                height={this.state.height - 40} image={this.props.content.graphUrl}/></div>)
        } else if(this.props.content.kind === 'Value') {

        }
        return dom;
    }

    render() {
        return (
            <div 
                ref={this.frameSize} 
                className="cellBody"
                >
                <div className="cellTitle">
                    {this.props.content.title}
                </div>
                {this.generateDOM()}
            </div>
        )
    }
}

export default Cell;