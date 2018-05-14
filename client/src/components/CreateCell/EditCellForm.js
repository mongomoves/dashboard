import React, { Component } from 'react';
import {Button, ButtonToolbar, ToggleButtonGroup, ToggleButton, Checkbox, ControlLabel, FormControl, FormGroup, Tooltip, OverlayTrigger} from "react-bootstrap";


class EditCellForm extends Component {
    constructor(props) {
        super(props);
        const {creator, kind, displayType, title, number, graphUrl, dataSource, attribute, unit} = this.props.values;

        this.state = {
            buttonText: 'Edit widget',
            creator: creator,
            kind: kind,
            publish: false,
            title: title,
            number: number,
            graphUrl: graphUrl,
            dataSource: dataSource,
            attribute: attribute,
            unit: unit,
            displayType: displayType
        };
    }

    handleTitleChange = (e) => {
        this.setState({title: e.target.value});
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
            this.setState({buttonText: 'Edit and publish widget'});
        }
        else {
            this.setState({buttonText: 'Edit widget'});
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
                title: this.state.title,
                displayType: this.state.displayType,
                graphUrl: this.state.graphUrl
            }
        }

        console.log(`handleCreateWidget:widget=${JSON.stringify(widget)}`);
        if(this.state.creator) {
            this.props.addCell(widget);
        } else {
            this.props.editCell(widget, this.props.values.index);
        }

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
                        <OverlayTrigger placement="top" overlay={<Tooltip id="edit-number">Ange det värde som ska visas i widgeten.</Tooltip>}>
                        <FormControl
                            type='number'
                            defaultValue={this.props.values.number}
                            onChange={this.handleNumberChange}/>
                        </OverlayTrigger>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Data source</ControlLabel>
                        <OverlayTrigger placement="top" overlay={<Tooltip id="edit-dataSource">Ange den datakälla som ska användas i widgeten.</Tooltip>}>
                        <FormControl
                            type='text'
                            defaultValue={this.props.values.dataSource}
                            onChange={this.handleDataSourceChange}/>
                        </OverlayTrigger>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Data source attribute</ControlLabel>
                        <OverlayTrigger placement="top" overlay={<Tooltip id="edit-attribute">Ange de API attribut som ska användas.</Tooltip>}>
                        <FormControl
                            type='text'
                            defaultValue={this.props.values.attribute}
                            onChange={this.handleAttributeChange}/>
                        </OverlayTrigger>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Unit</ControlLabel>
                        <OverlayTrigger placement="top" overlay={<Tooltip id="edit-unit">Ange enhet som ska visas i widgeten.</Tooltip>}>
                        <FormControl
                            type='text'
                            defaultValue={this.props.values.unit}
                            onChange={this.handleUnitChange}/>
                        </OverlayTrigger>
                    </FormGroup>
                </div>
            );

            buttonKind = (
                <Button 
                    disabled={!this.state.title || !this.state.numer || !this.state.dataSource || !this.state.attribute || !this.state.unit}
                    bsStyle='primary' onClick={this.handleCreateWidget}>{this.state.buttonText}</Button>
            );
            
            if (this.state.number) {
                buttonKind = (
                    <Button 
                    disabled={!this.state.title || !this.state.number}
                    bsStyle='primary' onClick={this.handleCreateWidget}>{this.state.buttonText}</Button>
                );
                if (this.state.publish) {
                    buttonKind = (
                        <Button 
                        disabled={!this.state.title || !this.state.number || !this.state.creator}
                        bsStyle='primary' onClick={this.handleCreateWidget}>{this.state.buttonText}</Button>
                    );
                }
            }
            if (this.state.dataSource || this.state.attribute) {
                buttonKind = (
                    <Button 
                    disabled={!this.state.title || !this.state.dataSource || !this.state.attribute}
                    bsStyle='primary' onClick={this.handleCreateWidget}>{this.state.buttonText}</Button>
                );
                if (this.state.publish) {
                    buttonKind = (
                        <Button 
                        disabled={!this.state.title || !this.state.dataSource || !this.state.attribute || !this.state.creator}
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
                        <OverlayTrigger placement="top" overlay={<Tooltip id="edit-graph">Ange den URL till den graf som ska visas.</Tooltip>}>
                        <FormControl
                            type='text'
                            defaultValue={this.props.values.graphUrl}
                            onChange={this.handleGraphUrlChange}/>
                        </OverlayTrigger>
                    </FormGroup>
                </div>
            );
            buttonKind = (
                <Button 
                    disabled={!this.state.title || !this.state.graphUrl}
                    bsStyle='primary' onClick={this.handleCreateWidget}>{this.state.buttonText}</Button>
            );
            if (this.state.publish) {
                buttonKind = (
                    <Button 
                    disabled={!this.state.title || !this.state.graphUrl || !this.state.creator}
                    bsStyle='primary' onClick={this.handleCreateWidget}>{this.state.buttonText}</Button>
                );
            }

        }

        return (
            <form>
                <FormGroup>
                    <ControlLabel>Title</ControlLabel>
                    <OverlayTrigger placement="top" overlay={<Tooltip id="edit-title">Ange den title som widgeten ska ha.</Tooltip>}>
                    <FormControl
                        type='text'
                        defaultValue={this.props.values.title}
                        onChange={this.handleTitleChange}/>
                    </OverlayTrigger>
                </FormGroup>

                {formContent}
                
                {this.state.creator && 
                <FormGroup>
                    <Checkbox onChange={this.handlePublishChange}>
                        Publicera widget
                    </Checkbox>
                </FormGroup>}

                {this.state.publish &&
                <div>
                    <FormGroup>
                        <ControlLabel>Creator</ControlLabel>
                        <OverlayTrigger placement="top" overlay={<Tooltip id="edit-creator">Ange skapare av widget.</Tooltip>}>
                        <FormControl
                            type='text'
                            onChange={this.handleCreatorChange}/>
                        </OverlayTrigger>
                    </FormGroup>

                    <FormGroup>
                    <ControlLabel>Description</ControlLabel>
                        <OverlayTrigger placement="top" overlay={<Tooltip id="edit-desc">Ange beskrivning av widget.</Tooltip>}>
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

export default EditCellForm;