import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Button, ButtonToolbar, ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import {SERVER_URL} from '../../Constants'

/**
 * Component to for handling saving the dashboard to backend. Contains model window with input form and method for publishing
 * dashboard to backend.
 */
class SaveDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            buttonText: 'Spara Dashboard',
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
        this.setState({user: e.target.value});

    };
    /**
     * Method for publishing dashboard to backend by post request to backend api. Opens alert box with failure message
     * if post is unsuccesfull. Calls method in app to open alert box with success message and close modal window if
     * post is successfull.
     */
    handlePublishDashboard = () => {
            const allWidgets = this.props.getAllCells();
            let allDBFormatWidgets=[];
            let widget;
                for (let i = 0; i < allWidgets.length; i++) {
                        widget = {
                                id: allWidgets[i].content._id,
                                i: allWidgets[i].layout.i,
                                x: allWidgets[i].layout.x,
                                y: allWidgets[i].layout.y,
                                w: allWidgets[i].layout.w,
                                h: allWidgets[i].layout.h,
                                minW: allWidgets[i].layout.minW,
                                minH: allWidgets[i].layout.minH
                            };
                        allDBFormatWidgets.push(widget);
                    }



            const dashboard = {
                title: this.state.title,
                creator: this.state.user,
                description:this.state.description,
                widgets: allDBFormatWidgets
            };
        fetch(SERVER_URL + '/api/dashboards', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dashboard),
        })
            .then(function(res) {

            if(res.ok){
                this.props.handleCloseSaveDashboardSuccess();
            }else{
                window.alert("Alla widgets måste sparas innan dashboarden kan sparas.")
            }

        }.bind(this))
            .catch(err => err);

    };

    render() {
        return (
            <div>
                <FormGroup>
                    <ControlLabel>Titel</ControlLabel>
                    <FormControl
                        type='text'
                        defaultValue=''
                        onChange={this.handleTitleChange}/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Beskrivning</ControlLabel>
                    <FormControl
                        type='text'
                        defaultValue=''
                        onChange={this.handleDescriptionChange}/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Skapare</ControlLabel>
                    <FormControl
                        type='text'
                        defaultValue=''
                        onChange={this.handleUserChange}/>
                </FormGroup>
                <ButtonToolbar>
                    <Button bsStyle='primary' onClick={this.handlePublishDashboard}>{this.state.buttonText}</Button>
                </ButtonToolbar>
            </div>
        )
    }
}

SaveDashboard.propTypes = {
    getAllCells: PropTypes.func.isRequired,
    handleCloseSaveDashboardSuccess: PropTypes.func.isRequired
};

export default SaveDashboard;