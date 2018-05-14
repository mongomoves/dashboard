/**
 * Created by Butts on 2018-05-11.
 */
import React, { Component } from 'react';
import {Button, ButtonToolbar, Checkbox, ControlLabel, FormControl, FormGroup} from "react-bootstrap";
class SaveDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            buttonText: 'Save Dashboard',
            publish: false,
            buttonDisabled: false,
            title: '',
            description: '',
            user: '',

        };
    }

    handleTitleChange = (e) => {
        this.setState({title: e.target.value});
    };
    handleDescriptionChange = (e) => {
        this.setState({description: e.target.value});
    };
    handleUserChange = (e) => {
        this.setState({User: e.target.value});
    };
    render() {
        return (
            <div>
                <FormGroup>
                    <ControlLabel>Title</ControlLabel>
                    <FormControl
                        type='text'
                        defaultValue=''
                         onChange={this.handleTitleChange}/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Description</ControlLabel>
                    <FormControl
                        type='text'
                        defaultValue=''
                        onChange={this.handleDescriptionChange}/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>User</ControlLabel>
                    <FormControl
                        type='text'
                        defaultValue=''
                        onChange={this.handleUserChange}/>
                </FormGroup>
                <ButtonToolbar>
                    <Button bsStyle='primary' onClick={this.handleCreateWidget}>{this.state.buttonText}</Button>
                </ButtonToolbar>
            </div>
        )
    }
}

export default SaveDashboard;