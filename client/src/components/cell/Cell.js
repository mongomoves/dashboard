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
            height: 0,
            frameURL: null
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
        if(this.props.content.graphUrl && this.props.content.displayType === 'Iframe') {
            this.setState({frameURL: this.props.content.graphUrl});
        }
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
     * Refreshes the Iframe by nulling the state, so that a refresh can occur without
     * new properties being passed.
     */
    updateContent = () => {
        console.log("updateContent");
        this.setState({frameURL: null});
        // this.setState({frameURL: this.checkForHTTP(this.props.content.graphUrl)});
    }

    /**
     * Checks if URL for Iframe contains http or https. If either is missing
     * the Iframe will display the entire Dashboard page as an embed. This avoids that
     * but it will not stop the user from entering an invalid URL.
     */
    checkForHTTP = (url) => {
        if(url.includes('http://', 0) || url.includes('https://', 0)) {
            // this.setState({proper: true});
            return url;
        } else {
            // this.setState({proper: false});
            return 'about:blank';
        }
    }

    render() {
        const {title, kind} = this.props.content;
        let content;
        let iframeRefreshButton = null;
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
                        refreshFunc={this.updateContent}
                        frameURL={this.state.frameURL}
                        values={this.props.content}
                        width={this.state.width}
                        height={this.state.height}/>
                )
                iframeRefreshButton = (<MenuItem eventKey={4} onClick={this.updateContent}>Uppdatera</MenuItem>);
            } else if (displayType === 'Img') {
                content = (
                    <ImageHolder
                        width={this.state.width}
                        height={this.state.height}
                        values={this.props.content}/>
                )
                iframeRefreshButton = null;
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
                                            {iframeRefreshButton}
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