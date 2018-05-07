import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import './Cell.css';

/**
 * This component represents a cell
 */
class Cell extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: new Date().toDateString(),
            cellSizeCounter: 0
        }
    }

    //method for refitting the iframe content 
    refitContent() {
        this.setState({ cellSizeCounter: this.state.cellSizeCounter + 1 });
    }

    render() {
        const {title, kind, unit, number} = this.props;

        const content = (
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <p><span style={{fontSize: "xx-large"}}>{number}</span> <span>{unit}</span></p>
            </div>
        );

        return (
            <Panel style={{width: 'inherit', height: 'inherit'}}>
                <Panel.Body>
                    {title}
                    {content}
                </Panel.Body>
            </Panel>
        )
    }
}

export default Cell;