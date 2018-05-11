import React, { Component } from 'react';
import {Button, ButtonToolbar, Checkbox, ControlLabel, FormControl, FormGroup} from "react-bootstrap";


class EditCellForm extends Component {
    constructor(props) {
        super(props);
        const {creator, kind, title, number, graphUrl, dataSource, attribute, unit} = this.props.values;

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
            unit: unit
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
        // Form fields depends on type of widget
        if (this.state.kind === 'Value') {
            formContent = (
                <div>
                    <FormGroup>
                        <ControlLabel>Number</ControlLabel>
                        <FormControl
                            type='number'
                            defaultValue={this.props.values.number}
                            onChange={this.handleNumberChange}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Data source</ControlLabel>
                        <FormControl
                            type='text'
                            defaultValue={this.props.values.dataSource}
                            onChange={this.handleDataSourceChange}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Data source attribute</ControlLabel>
                        <FormControl
                            type='text'
                            defaultValue={this.props.values.attribute}
                            onChange={this.handleAttributeChange}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Unit</ControlLabel>
                        <FormControl
                            type='text'
                            defaultValue={this.props.values.unit}
                            onChange={this.handleUnitChange}/>
                    </FormGroup>
                </div>
            );
        }
        else if (this.state.kind === 'Graph') {
            formContent = (
                <FormGroup>
                    <ControlLabel>Graph URL</ControlLabel>
                    <FormControl
                        type='text'
                        defaultValue={this.props.values.graphUrl}
                        onChange={this.handleGraphUrlChange}/>
                </FormGroup>
            );
        }

        return (
            <form>
                <FormGroup>
                    <ControlLabel>Title</ControlLabel>
                    <FormControl
                        type='text'
                        defaultValue={this.props.values.title}
                        onChange={this.handleTitleChange}/>
                </FormGroup>

                {formContent}
                {!this.state.creator &&
                <FormGroup>
                    <Checkbox onChange={this.handlePublishChange}>
                        Publicera widget
                    </Checkbox>
                </FormGroup>}

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
                    <Button bsStyle='primary' onClick={this.handleCreateWidget}>{this.state.buttonText}</Button>
                </ButtonToolbar>
            </form>
        )
    }
}

export default EditCellForm;