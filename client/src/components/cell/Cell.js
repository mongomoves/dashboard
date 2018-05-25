import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel, Grid, Row, Col, MenuItem, DropdownButton, Glyphicon } from 'react-bootstrap';
import ReactResizeDetector from 'react-resize-detector';
import ImageHolder from "./Holders/ImageHolder";
import ValueHolder from './Holders/ValueHolder';
import IframeHolder from './Holders/IframeHolder';
import TextHolder from './Holders/TextHolder';
import './cell.css';

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

    /**
     * Click method for the Iframe update button in the widget menu.
     * This updates the key in the iframe tag, in a child IframeHolder component.
     * Likely an antipattern, but provides important functionality.
     */
    onUpdate = () => {
        this.iframeHolder.keyUpdate();
    }

    render() {
        const {title, kind} = this.props.content;
        let content;
        let iframeRefreshBtn = null;
        if (kind === 'Value') {
            content = (
                <ValueHolder
                    width={this.state.width}
                    values={this.props.content}/>
            );
        }
        else if (kind === 'Graph') {
            const {displayType} = this.props.content;
            if(displayType === 'Iframe') {
                iframeRefreshBtn = (<MenuItem eventKey={4} onClick={this.onUpdate}>Uppdatera</MenuItem>);
                content = (
                    <IframeHolder
                        onRef={ref => (this.iframeHolder = ref)}
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
                iframeRefreshBtn = null;
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
                                <Col className='cell-title' xs={10}>
                                    <span>{title}</span>
                                </Col>
                                <Col xs={2} style={{padding: 0}}>
                                    <div style={{float: 'right'}}>
                                        <DropdownButton
                                            id="dropdown-no-caret"
                                            noCaret
                                            pullRight
                                            bsSize="xsmall"
                                            className="config-btn"
                                            title={<Glyphicon glyph="cog" />}>
                                                <MenuItem eventKey={1} onClick={this.onShowInfo}>Info</MenuItem>
                                                <MenuItem eventKey={2} onClick={this.onEdit}>Redigera</MenuItem>
                                                <MenuItem eventKey={3} onClick={this.onRemove}>Ta bort</MenuItem>
                                                {iframeRefreshBtn}
                                        </DropdownButton>
                                    </div>
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

Cell.propTypes = {
    removeCell: PropTypes.func.isRequired,
    showInfo: PropTypes.func.isRequired,
    editCell: PropTypes.func.isRequired,
    content: PropTypes.object.isRequired,
    id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
};

export default Cell;