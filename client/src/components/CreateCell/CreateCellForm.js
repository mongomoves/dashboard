import React, { Component } from 'react';
import {Button, ButtonToolbar, Checkbox, ControlLabel, FormControl, FormGroup, Tooltip, OverlayTrigger} from "react-bootstrap";

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
            number: '',
            graphUrl: '',
            dataSource: '',
            attribute: '',
            unit: '',
           
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
        //TODO: Handle validation and add help text to fields
        let formContent;
        let buttonKind;
        // Form fields depends on type of widget
        if (this.state.kind === 'Value') {
            formContent = (
                <div>
                    <FormGroup>
                    <ControlLabel>Number</ControlLabel>
                    <FormControl
                        type='number'
                        onChange={this.handleNumberChange}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Data source</ControlLabel>
                        <FormControl
                            type='text'
                            onChange={this.handleDataSourceChange}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Data source attribute</ControlLabel>
                        <FormControl
                            type='text'
                            onChange={this.handleAttributeChange}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Unit</ControlLabel>
                        <OverlayTrigger placement="top" overlay={<Tooltip>Ange enhet som ska visas i widget</Tooltip>}>
                        <FormControl
                            type='text'
                            onChange={this.handleUnitChange}/>
                        </OverlayTrigger>
                    </FormGroup>
                </div>
            );
            buttonKind = (
                <Button
                        disabled={!this.state.title || !this.state.number || !this.state.dataSource || !this.state.attribute || !this.state.unit} 
                        bsStyle='primary' onClick={this.handleCreateWidget}>{this.state.buttonText}</Button>
            );
        }
        else if (this.state.kind === 'Graph') {
            formContent = (
                <FormGroup>
                    <ControlLabel>Graph URL</ControlLabel>
                    <FormControl
                        type='text'
                        onChange={this.handleGraphUrlChange}/>
                </FormGroup>
            );
            
            
            buttonKind = (
                <Button
                        disabled={!this.state.graphUrl || !this.state.title} 
                        bsStyle='primary' onClick={this.handleCreateWidget}>{this.state.buttonText}</Button>
            );
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
                    <FormControl
                        type='text'
                        onChange={this.handleTitleChange}/>
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
                        <FormControl
                            type='text'
                            onChange={this.handleCreatorChange}/>
                    </FormGroup>

                    <FormGroup>
                    <ControlLabel>Description</ControlLabel>
                        <FormControl
                        type='text'
                        onChange={this.handleDescriptionChange}/>
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