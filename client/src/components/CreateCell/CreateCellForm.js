import React, { Component } from 'react';
import {Button, ButtonToolbar, ToggleButtonGroup, ToggleButton, Checkbox, ControlLabel, FormControl, FormGroup, Tooltip, OverlayTrigger} from "react-bootstrap";

class CreateCellForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            buttonText: 'Create widget',
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
            displayType: 'Iframe'
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

    handlePublishChange = (e) => {
        const checked = e.target.checked;
        this.setState({publish: checked});

        if (checked) {
            this.setState({buttonText: 'Create and publish widget'});
        }
        else {
            this.setState({buttonText: 'Create widget'});
        }
    };

    handleDisplayTypeChange = (e) => {
        this.setState({displayType: e})
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
                unit: this.state.unit
            }
           
           
            
        }
        else if (this.state.kind === 'Graph') {
            widget = {
                kind: this.state.kind,
                type: this.state.displayType,
                title: this.state.title,
                graphUrl: this.state.graphUrl
            }
        }

        console.log(`handleCreateWidget:widget=${JSON.stringify(widget)}`);

        this.props.addCell(widget);

        if (this.props.done) {
            this.props.done();
        }

        //TODO: If publish is true, send to database
    };

    render() {
        
        let formContent;
        let buttonKind;
        // Form fields depends on type of widget
        if (this.state.kind === 'Value') {
            formContent = (
                <div>
                    <FormGroup>
                    <ControlLabel>Number</ControlLabel>
                    <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-number">Ange Antal som ska visas i widget t.ex. antal anställda.</Tooltip>}>
                    <FormControl
                        type='number'
                        onChange={this.handleNumberChange}/>
                    </OverlayTrigger>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Data source</ControlLabel>
                        <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-dataSource">Ange den datakälla som widgeten ska presentera data ifrån.</Tooltip>}>
                        <FormControl
                            type='text'
                            onChange={this.handleDataSourceChange}/>
                        </OverlayTrigger>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Data source attribute</ControlLabel>
                        <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-attribute">Ange specifikt attribut från API</Tooltip>}>
                        <FormControl
                            type='text'
                            onChange={this.handleAttributeChange}/>
                        </OverlayTrigger>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Unit</ControlLabel>
                        <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-unit">Ange enhet som ska visas i widget</Tooltip>}>
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
                            disabled={!this.state.title || !this.state.number || !this.state.creator || !this.state.description} 
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
                            disabled={!this.state.title || !this.state.dataSource || !this.state.attribute || !this.state.creator || !this.state.description} 
                            bsStyle='primary' onClick={this.handleCreateWidget}>{this.state.buttonText}</Button>
                    );
                }
                 
            }
           
        }
        
        else if (this.state.kind === 'Graph') {
            formContent = (
                <div>
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
                    <FormGroup>
                        <ControlLabel>Graph URL</ControlLabel>
                        <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-graphUrl">Ange URL för att visa den önskade grafen</Tooltip>}>
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
                            disabled={!this.state.graphUrl || !this.state.title || !this.state.creator || !this.state.description} 
                            bsStyle='primary' onClick={this.handleCreateWidget}>{this.state.buttonText}</Button>
                );
            }
        }

        return (
            <form>
                <FormGroup controlId='kind'>
                    <ControlLabel>Type of widget</ControlLabel>
                    <FormControl componentClass='select' value={this.state.kind} onChange={this.handleKindChange}>
                        <option value='Value'>Value</option>
                        <option value='Graph'>Graph</option>
                    </FormControl>
                </FormGroup>

                <FormGroup>
                    <ControlLabel>Title</ControlLabel>
                    <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-title">Ange titel som widgeten ska ha.</Tooltip>}>
                    <FormControl
                        type='text'
                        onChange={this.handleTitleChange}/>
                    </OverlayTrigger>
                </FormGroup>

                {formContent}

                <FormGroup>
                    <Checkbox onChange={this.handlePublishChange}>
                        Publish widget
                    </Checkbox>
                </FormGroup>

                {this.state.publish &&
                <div>
                    <FormGroup>
                        <ControlLabel>Creator</ControlLabel>
                        <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-creator">Ange namn på den som skapat widgeten.</Tooltip>}>
                        <FormControl
                            type='text'
                            onChange={this.handleCreatorChange}/>
                        </OverlayTrigger>
                    </FormGroup>

                    <FormGroup>
                    <ControlLabel>Description</ControlLabel>
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