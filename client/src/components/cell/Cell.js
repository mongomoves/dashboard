import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import ImageHolder from "./ImageHolder";
import './Cell.css';

/**
 * This component represents a cell
 */
class Cell extends Component {
    constructor(props) {
        super(props);

        this.state = {
            width: 0,
            height: 0
        };

        this.frameSize = React.createRef();
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
    remeasure = () => {
        this.setState({
            width: this.frameSize.current.offsetWidth,
            height: this.frameSize.current.offsetHeight
        });
    };

    render() {
        const {title, kind} = this.props.content;

        let content;

        //TODO: Value and Graph should be separate components, styles should not be inlined
        if (kind === 'Value') {
            const {unit, number} = this.props.content;

            content = (
                <p>
                    <span style={{fontSize: "xx-large"}}>{number}</span>
                    <span>{unit}</span>
                </p>
            );
        }
        else if (kind === 'Graph') {
            const { graphUrl } = this.props.content;
            content = (
                <img src={graphUrl} style={{width: '100%', height: '100%'}}/>
            )
        }

        return (
            <Panel style={{width: 'inherit', height: 'inherit'}}>
                <Panel.Body>
                    {title}
                    <div ref={this.frameSize} style={{display: 'flex', justifyContent: 'center'}}>
                         {content}
                    </div>
                </Panel.Body>
            </Panel>
        )
    }
}

export default Cell;