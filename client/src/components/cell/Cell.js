import React, { Component } from 'react';
import { Panel, Grid, Row, Col, MenuItem, DropdownButton, Glyphicon } from 'react-bootstrap';
import ImageHolder from "./ImageHolder";
import ReactResizeDetector from 'react-resize-detector';
import './Cell.css';
import ValueComponent from '../ValueComponent/ValueComponent';
import IframeHolder from './IframeHolder';
import TextHolder from './TextHolder';

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
        this.setState({width: width, height: height});
    };

    /**
     * Callback to App.js when Remove button is clicked in cell menu.
     * Id (or i in original data) must be passed along.
     */
    onRemove = () => {
        this.props.removeCell(this.props.id);
    };

    /**
     * Callback to App.js when Show info button is clicked.
     * Id (or i in original data) must be passed along.
     */
    onShowInfo = () => {
        this.props.showInfo(this.props.id);
    };

    /**
     * Callback to App.js when Edit button is clicked.
     * Id (or i in original data) must be passed along.
     */
    onEdit = () => {
        this.props.editCell(this.props.id);
    };

    render() {
        const {title, kind} = this.props.content;
        let content;
        if (kind === 'Value') {
            content = (
                <ValueComponent width={this.state.width} values={this.props.content} />
            );
        }
        else if (kind === 'Graph') {
            const {displayType} = this.props.content;
            if(displayType === 'Iframe') {
                content = (
                    <IframeHolder
                        values={this.props.content}
                        width={this.state.width}
                        height={this.state.height}/>
                )
            } else if (displayType === 'Img') {
                content = (
                    <ImageHolder
                        width={this.state.width}
                        height={this.state.height}
                        values={this.props.content}/>
                )
            }
        }
        else if (kind === 'Text') {
            content = (
                <TextHolder 
                    values={this.props.content}
                    width={this.state.width}
                    height={this.state.height}/>
            )
        }

        return (
            <div ref={this.frameSize} style={{width: 'inherit', height: 'inherit'}}>
                <Panel className='cell'>
                    <Panel.Heading className='cell-heading'>
                        <Grid>
                            <Row className='show-grid'>
                                <Col style={{textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}} xs={10}>
                                    <span>{title}</span>
                                </Col>
                                <Col xs={2} style={{padding: 0}}>
                                    <DropdownButton
                                        id="dropdown-no-caret"
                                        noCaret
                                        pullRight 
                                        bsSize="xsmall"
                                        title={<Glyphicon glyph="cog" />}>
                                            <MenuItem eventKey={1} onClick={this.onShowInfo}>Info</MenuItem>
                                            <MenuItem eventKey={2} onClick={this.onEdit}>Redigera</MenuItem>
                                            <MenuItem eventKey={3} onClick={this.onRemove}>Ta bort</MenuItem>
                                    </DropdownButton>
                                </Col>
                            </Row>
                        </Grid>
                    </Panel.Heading>
                    <Panel.Body className='cell-body' style={{height: this.state.height - 33}}>
                             {content}
                    </Panel.Body>
                </Panel>
                <ReactResizeDetector handleWidth handleHeight refreshMode='throttle' refreshRate={1000} onResize={this.onResize} />
            </div>
        )
    }
}

export default Cell;