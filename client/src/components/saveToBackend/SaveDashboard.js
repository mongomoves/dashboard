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
        this.setState({user: e.target.value});

    };

    handlePublishDashboard = (e) => {
            const allWidgets = this.props.getAllCells();
            let allDBFormatWidgets=[];
            let widget;
                for (let i = 0; i < allWidgets.length; i++) {
                        widget = {
                                id: allWidgets[i].id,
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
        fetch('http://192.168.99.100:3001/api/dashboards', {
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
                window.alert("No cigar, propably one or more widgets not saved.")
            }

        }.bind(this))
            .catch(err => err);

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
                    <Button bsStyle='primary' onClick={this.handlePublishDashboard}>{this.state.buttonText}</Button>
                </ButtonToolbar>
            </div>
        )
    }
}

export default SaveDashboard;