import React, { Component } from 'react';
import {Button, Grid, Row, Col, ButtonToolbar, ToggleButtonGroup, ToggleButton, Checkbox, ControlLabel, FormControl, FormGroup, Tooltip, OverlayTrigger} from "react-bootstrap";



class CreateCellForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            buttonText: 'Skapa widget',
            kind: 'Value',
            publish: false,
            buttonDisabled: false,
            title: '',
            creator: '',
            description: '',
            number: 0,
            graphUrl: '',
            dataSource: '',
            attribute: '',
            unit: '',
            displayType: 'Iframe',
            refreshRate: 0
        };
    }

    handleKindChange = (e) => {
        this.setState({kind: e.target.value});
        
    };

    handleTitleChange = (e) => {
        this.setState({title: e.target.value, titleError: true});
    };

    handleCreatorChange = (e) => {
        this.setState({creator: e.target.value});
    };

    handleDescriptionChange = (e) => {
        this.setState({description: e.target.value});
    };

    handleNumberChange = (e) => {
        this.setState({number: e.target.value});
    };

    handleGraphUrlChange = (e) => {
        this.setState({graphUrl: e.target.value});
    };

    handleDataSourceChange = (e) => {
        this.setState({dataSource: e.target.value});
    };

    handleAttributeChange = (e) => {
        this.setState({attribute: e.target.value});
    };

    handleUnitChange = (e) => {
        this.setState({unit: e.target.value});
    };

    handleTextInputChange = (e) => {
        this.setState({textInput: e.target.value});
    };

    handlePublishChange = (e) => {
        const checked = e.target.checked;
        this.setState({publish: checked});

        if (checked) {
            this.setState({buttonText: 'Skapa och publicera widget'});
        }
        else {
            this.setState({buttonText: 'Skapa widget'});
        }
    };

    handleDisplayTypeChange = (e) => {
        this.setState({displayType: e});
    }

    handleRefreshChange = (e) => {
        this.setState({refreshRate: e.target.value});
    }

    handleCreateWidget = () => {
        let widget;
        if (this.state.kind === 'Value') {
            widget = {
                kind: this.state.kind,
                title: this.state.title,
                number: this.state.number,
                dataSource: this.state.dataSource,
                attribute: this.state.attribute,
                refreshRate: this.state.refreshRate,
                unit: this.state.unit
            }   
        }
        else if (this.state.kind === 'Graph') {
            widget = {
                kind: this.state.kind,
                title: this.state.title,
                displayType: this.state.displayType,
                graphUrl: this.state.graphUrl,
                refreshRate: this.state.refreshRate
            }
        } 
        else if (this.state.kind === 'Text') {
            widget = {
                kind: this.state.kind,
                title: this.state.title,
                textInput: this.state.textInput,
                dataSource: this.state.dataSource,
                attribute: this.state.attribute,
                refreshRate: this.state.refreshRate
            }
        }
        //console.log(`handleCreateWidget:widget=${JSON.stringify(widget)}`);
        if(this.state.publish) {
            widget.creator=this.state.creator;
            widget.description=this.state.description;
            this.handlePost(widget);
        }

        this.props.addCell(widget);

        if (this.props.done) {
            this.props.done();
        }
    };

    /**
    * Publishes the created widget though Post request to backend. Sends response to addID in App to associate widget ID
    * from backend to the widget in frontend.
    * @param {*} widget the widget to post to backend.
    **/
    handlePost = (widget) => {
        fetch('http://192.168.99.100:3001/api/widgets', {
            method: 'POST',
            headers: {
                // 'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(widget),
        })
            .then(function(res) {
                return res.json()
            })
            .then(function(data) {
                this.props.addID(data.widget);
            }.bind(this))
            .catch(err => err);
    };

    render() {
        let formContent;
        let buttonKind;
        // Form fields depends on type of widget
        if (this.state.kind === 'Value') {
            formContent = (
                <div>
                    <FormGroup>
                    <ControlLabel>Värde</ControlLabel>
                    <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-number">Ange Antal som ska visas i widget t.ex. antal anställda.</Tooltip>}>
                    <FormControl
                        type='number'
                        onChange={this.handleNumberChange}/>
                    </OverlayTrigger>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Datakälla</ControlLabel>
                        <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-dataSource">Ange den datakälla som widgeten ska presentera data ifrån.</Tooltip>}>
                            <FormControl
                                type='text'
                                onChange={this.handleDataSourceChange}/>
                        </OverlayTrigger>
                    </FormGroup>
                    <Grid>
                        <Row className='show-grid'>
                            <Col xs={8}>
                                <FormGroup>
                                    <ControlLabel>Data-attribute</ControlLabel>
                                    <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-attribute">Ange specifikt attribut från API</Tooltip>}>
                                        <FormControl
                                            type='text'
                                            onChange={this.handleAttributeChange}/>
                                    </OverlayTrigger>
                                </FormGroup>
                            </Col>
                            <Col xs={4}>
                                <FormGroup>
                                    <ControlLabel>Uppdateringsfrekvens</ControlLabel>
                                    <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-refresh">I minuter hur ofta data ska uppdateras. 0 eller blankt för ingen uppdatering.</Tooltip>}>
                                        <FormControl
                                            type='number'
                                            onChange={this.handleRefreshChange}/>
                                    </OverlayTrigger>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Grid>
                    <FormGroup>
                        <ControlLabel>Enhet</ControlLabel>
                        <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-unit">Ange enhet som ska visas i widget.</Tooltip>}>
                        <FormControl
                            type='text'
                            onChange={this.handleUnitChange}/>
                        </OverlayTrigger>
                    </FormGroup>
                </div>
            );
            //Default button for widget kind value.
            buttonKind = (
                <Button
                        disabled={!this.state.title || !this.state.number || !this.state.dataSource || !this.state.attribute || !this.state.unit} 
                        bsStyle='primary' onClick={this.handleCreateWidget}>{this.state.buttonText}</Button>
            );
            //Button of the kind number.
            if (this.state.number) {
                buttonKind = (
                    <Button
                            disabled={!this.state.title || !this.state.number} 
                            bsStyle='primary' onClick={this.handleCreateWidget}>{this.state.buttonText}</Button>
                );
                //Button for publishing number widget.
                if (this.state.publish) {
                    buttonKind = (
                        <Button
                            disabled={!this.state.title || !this.state.number || (!this.state.creator || !this.state.description)} 
                            bsStyle='primary' onClick={this.handleCreateWidget}>{this.state.buttonText}</Button>
                    );
                }
            
            }
            //Button for data source widget, disabled if dataSource and data attribute is empty.
            if (this.state.dataSource || this.state.attribute) {
                buttonKind = (
                    <Button
                            disabled={!this.state.title || !this.state.dataSource || !this.state.attribute} 
                            bsStyle='primary' onClick={this.handleCreateWidget}>{this.state.buttonText}</Button>
                );
                //Button for data source widget when published, disabled if creator and description is empty.
                if (this.state.publish) {
                    buttonKind = (
                        <Button
                            disabled={!this.state.title || !this.state.dataSource || !this.state.attribute || (!this.state.creator || !this.state.description)} 
                            bsStyle='primary' onClick={this.handleCreateWidget}>{this.state.buttonText}</Button>
                    );
                }      
            }
        }
        else if (this.state.kind === 'Graph') {
            formContent = (
                <div>
                    <Grid>
                        <Row>
                            <Col xs={8}>
                                <FormGroup>
                                    <ControlLabel>Visningstyp</ControlLabel>
                                    <ButtonToolbar>
                                    <ToggleButtonGroup 
                                            type='radio'
                                            name='displayType' 
                                            defaultValue={'Iframe'}
                                            value={this.state.displayType}
                                            onChange={this.handleDisplayTypeChange}>
                                        <ToggleButton value={'Iframe'}>Iframe</ToggleButton> 
                                        <ToggleButton value={'Img'}>Img</ToggleButton>
                                        </ToggleButtonGroup>
                                    </ButtonToolbar>
                                </FormGroup>
                            </Col>
                            <Col xs={4}>
                                <FormGroup>
                                    <ControlLabel>Uppdateringsfrekvens</ControlLabel>
                                    <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-refresh">I minuter hur ofta data ska uppdateras. 0 eller blankt för ingen uppdatering.</Tooltip>}>
                                        <FormControl
                                            type='number'
                                            onChange={this.handleRefreshChange}/>
                                    </OverlayTrigger>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Grid>
                    <FormGroup>
                        <ControlLabel>Diagram-URL</ControlLabel>
                        <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-graphUrl">Ange URL för att visa önskat diagram.</Tooltip>}>
                        <FormControl
                            type='text'
                            onChange={this.handleGraphUrlChange}/>
                        </OverlayTrigger>
                    </FormGroup>
                </div>
            );
            
            //Button for graph widget, disabled when graphUrl and title is empty.
            buttonKind = (
                <Button
                        disabled={!this.state.graphUrl || !this.state.title} 
                        bsStyle='primary' onClick={this.handleCreateWidget}>{this.state.buttonText}</Button>
            );
            //Button for publishing graph widget, disabled when creator and description is empty.
            if (this.state.publish) {
                buttonKind = (
                    <Button
                            disabled={!this.state.graphUrl || !this.state.title || (!this.state.creator || !this.state.description)} 
                            bsStyle='primary' onClick={this.handleCreateWidget}>{this.state.buttonText}</Button>
                );
            }
        }
        else if(this.state.kind === 'Text') {
            formContent = (
                <div>
                    <FormGroup>
                        <ControlLabel>Fritext</ControlLabel>
                        <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-textinput">Ange den text som cellen ska visa.</Tooltip>}>
                            <FormControl 
                                componentClass="textarea"
                                placeholder="Ditt innehåll"
                                onChange={this.handleTextInputChange}/>
                        </OverlayTrigger>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Datakälla</ControlLabel>
                        <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-dataSource">Ange den datakälla som widgeten ska presentera data ifrån.</Tooltip>}>
                            <FormControl
                                type='text'
                                onChange={this.handleDataSourceChange}/>
                        </OverlayTrigger>
                    </FormGroup>
                    <Grid>
                        <Row className='show-grid'>
                            <Col xs={8}>
                                <FormGroup>
                                    <ControlLabel>Data-attribute</ControlLabel>
                                    <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-attribute">Ange specifikt attribut från API</Tooltip>}>
                                        <FormControl
                                            type='text'
                                            onChange={this.handleAttributeChange}/>
                                    </OverlayTrigger>
                                </FormGroup>
                            </Col>
                            <Col xs={4}>
                                <FormGroup>
                                    <ControlLabel>Uppdateringsfrekvens</ControlLabel>
                                    <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-refresh">I minuter hur ofta data ska uppdateras. 0 eller blankt för ingen uppdatering.</Tooltip>}>
                                        <FormControl
                                            type='number'
                                            onChange={this.handleRefreshChange}/>
                                    </OverlayTrigger>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            );
            //Default button for widget kind value.
            buttonKind = (
                <Button
                        disabled={!this.state.title || !this.state.textInput || !this.state.dataSource || !this.state.attribute} 
                        bsStyle='primary' onClick={this.handleCreateWidget}>{this.state.buttonText}</Button>
            );
            if(this.state.textInput) {
                buttonKind = (
                    <Button
                        disabled={!this.state.title || (this.state.dataSource || this.state.attribute)}
                        bsStyle='primary' onClick={this.handleCreateWidget}>{this.state.buttonText}</Button>
                );
                if (this.state.publish) {
                    buttonKind = (
                        <Button
                            disabled={!this.state.title || !this.state.textInput || (!this.state.creator || !this.state.description)} 
                            bsStyle='primary' onClick={this.handleCreateWidget}>{this.state.buttonText}</Button>
                    );
                }
            }
            //Button for data source widget, disabled if dataSource and data attribute is empty.
            if (this.state.dataSource || this.state.attribute) {
                buttonKind = (
                    <Button
                            disabled={!this.state.title || !this.state.dataSource || !this.state.attribute || this.state.textInput} 
                            bsStyle='primary' onClick={this.handleCreateWidget}>{this.state.buttonText}</Button>
                );
                //Button for data source widget when published, disabled if creator and description is empty.
                if (this.state.publish) {
                    buttonKind = (
                        <Button
                            disabled={!this.state.title || !this.state.dataSource || !this.state.attribute || (!this.state.creator || !this.state.description)} 
                            bsStyle='primary' onClick={this.handleCreateWidget}>{this.state.buttonText}</Button>
                    );
                }
            }
        }

        return (
            <form>
                <FormGroup controlId='kind'>
                    <ControlLabel>Widget-typ</ControlLabel>
                    <FormControl componentClass='select' value={this.state.kind} onChange={this.handleKindChange}>
                        <option value='Value'>Värde</option>
                        <option value='Graph'>Diagram</option>
                        <option value='Text'>Text</option>
                    </FormControl>
                </FormGroup>

                <FormGroup>
                    <ControlLabel>Titel</ControlLabel>
                    <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-title">Ange titel som widgeten ska ha.</Tooltip>}>
                    <FormControl
                        type='text'
                        onChange={this.handleTitleChange}/>
                    </OverlayTrigger>
                </FormGroup>

                {formContent}

                <FormGroup>
                    <Checkbox onChange={this.handlePublishChange}>
                        Publisera widget
                    </Checkbox>
                </FormGroup>

                {this.state.publish &&
                <div>
                    <FormGroup>
                        <ControlLabel>Skapare</ControlLabel>
                        <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-creator">Ange namn på den som skapat widgeten.</Tooltip>}>
                        <FormControl
                            type='text'
                            onChange={this.handleCreatorChange}/>
                        </OverlayTrigger>
                    </FormGroup>

                    <FormGroup>
                    <ControlLabel>Beskrivning</ControlLabel>
                        <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-desc">Ange en beskrivning om vad widgeten visualiserar.</Tooltip>}>
                        <FormControl
                        type='text'
                        onChange={this.handleDescriptionChange}/>
                        </OverlayTrigger>
                    </FormGroup>
                </div>
                }

                <ButtonToolbar>
                    {buttonKind}
                </ButtonToolbar>
            </form>
        )
    }
}

export default CreateCellForm;