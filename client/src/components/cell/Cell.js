import React, { Component } from 'react';
import { Panel, Row, Col, MenuItem, DropdownButton, Glyphicon } from 'react-bootstrap';
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
        this.onRemove = this.onRemove.bind(this);
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

    onRemove() {
        console.log("Remove in Cell");
        this.props.removeCell(this.props.id);
    }

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
                <ImageHolder refit={this.remeasure}
                             width={this.state.width - 10}
                             height={this.state.height - 40}
                             image={graphUrl}/>
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
                                        <MenuItem eventKey={1}>Redigera</MenuItem>
                                        <MenuItem divider/>
                                        <MenuItem eventKey={2} onClick={this.onRemove}>Ta bort</MenuItem>
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
            </div>
        )
    }
}

export default Cell;