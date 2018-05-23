/**
 * Created by Butts on 2018-05-21.
 */
import React, { Component } from 'react';
import {Button, ButtonToolbar, ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import SearchDashboardForm from './SearchDashboardForm';
import SearchDashboardList from './SearchDashboardList';
import SERVER_URL from '../../constants'
const DEFAULT_REQUEST_URL = SERVER_URL + "/api/dashboards";

class SearchDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dashboards: [],
            query:''
        }
    }
    onSearchClicked = (query) => {
        this.handleLoadDashboard(query);
    };
    /**
     * Method for publishing dashboard to backend by post request to backend api. Opens alert box with failure message
     * if post is unsuccesfull. Calls method in app to open alert box with success message and close modal window if
     * post is successfull.
     */
    handleLoadDashboard = (query) => {
        fetch(SERVER_URL + '/api/dashboards?search='+query)
            .then(result => {
                return result.json();
            })
            .then(data => {
                const dashboards = data.dashboards;
                this.setState({dashboards: dashboards});
            })
            .catch(err => {
                console.log(err);
            });

    };

    render() {
        return(
            <div>
                <div style={formStyle}>
                    <SearchDashboardForm onSearchClicked={this.onSearchClicked}/>
                </div>
                <div style={listStyle}>
                    <SearchDashboardList addDashboard={this.props.addDashboard} dashboards={this.state.dashboards} query={this.state.query}/>
                </div>
            </div>
        );
    }
}

const listStyle = {
    maxHeight: "60vh",
    overflowY: 'auto'
};

const formStyle = {
    paddingBottom: '1em'
};

export default SearchDashboard;