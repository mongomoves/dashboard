import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import ImageHolder from "./ImageHolder";
import ReactResizeDetector from 'react-resize-detector';
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

    onResize = (width, height) => {
        console.log(`onResize:w=${width}:h=${height}`);
        this.setState({width: width, height: height});
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
                //<img src={graphUrl} style={{width: '100%', height: '100%'}}/>
                <ImageHolder
                             width={this.state.width - 10}
                             height={this.state.height - 40}
                             image={graphUrl}/>
            )
        }

        const renderTitle = kind !== 'Graph'; //use this to not render titles for graph?

        return (
            <div ref={this.frameSize} style={{width: '100%', height: '100%'}}>
                <Panel style={{width: 'inherit', height: 'inherit'}}>
                    <Panel.Body>

                        <span>{title}</span>

                        <div style={{display: 'flex', justifyContent: 'center'}}>
                             {content}
                        </div>

                    </Panel.Body>
                </Panel>
                <ReactResizeDetector handleWidth handleHeight refreshMode='throttle' refreshRate={1000} onResize={this.onResize} />
            </div>
        )
    }
}

export default Cell;