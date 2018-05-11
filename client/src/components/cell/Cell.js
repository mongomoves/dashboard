import React, { Component } from 'react';
import { Panel, Row, Col, MenuItem, DropdownButton, Glyphicon } from 'react-bootstrap';
import ImageHolder from "./ImageHolder";
import ReactResizeDetector from 'react-resize-detector';
import './Cell.css';
import ValueComponent from '../ValueComponent/ValueComponent';
import IframeHolder from './IframeHolder';

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

    /**
     * Callback to App.js when Remove button is clicked in cell menu.
     * Id (or i in original data) must be passed along.
     */
    onRemove = () => {
        this.props.removeCell(this.props.id);
    }

    /**
     * Callback to App.js when Show info button is clicked.
     * Id (or i in original data) must be passed along.
     */
    onShowInfo = () => {
        this.props.showInfo(this.props.id);
    }

    /**
     * Callback to App.js when Edit button is clicked.
     * Id (or i in original data) must be passed along.
     */
    onEdit = () => {
        this.props.editCell(this.props.id);
    }

    render() {
        const {title, kind} = this.props.content;

        let content;

        //TODO: Value and Graph should be separate components, styles should not be inlined
        if (kind === 'Value') {
            const {unit, number} = this.props.content;

            content = (
                <ValueComponent number={number} unit={unit} />
            );
        }
        else if (kind === 'Graph') {
            const { graphUrl } = this.props.content;
            const urll = "https://play.grafana.org/d-solo/000000012/grafana-play-home?orgId=1&panelId=2&from=1526023352580&to=1526030552580";
            content = (
                <IframeHolder
                    width={this.state.width- 20}
                    height={this.state.height - 50}
                    url={urll}/>
                /* <ImageHolder
                  width={this.state.width - 10}
                  height={this.state.height - 40}
                  image={graphUrl}/> */
            )
        }

        return (
            <div ref={this.frameSize} style={{width: '100%', height: '100%'}}>
                <Panel style={{width: 'inherit', height: 'inherit'}}>
                    <Panel.Heading>
                        <Row>
                            <Col lg={10}>
                                <span>{title}</span>
                            </Col>
                            <Col lg={2} style={{padding: 0}}>
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
                    </Panel.Heading>
                    <Panel.Body>
                            
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