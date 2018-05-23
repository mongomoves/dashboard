import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SearchDashboardForm from './SearchDashboardForm';
import SearchDashboardList from './SearchDashboardList';
import SERVER_URL from '../../constants'

const DEFAULT_REQUEST_URL = SERVER_URL + "/api/dashboards";

class SearchDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dashboards: [],
            searchById: false,
            noResult: false
        }
    }

    onSearchClicked = (search) => {
        const requestUrl = this.generateRequestUrl(search);
        this.handleLoadDashboard(requestUrl);
    };

    generateRequestUrl(search) {
        const command = search.substring(0, search.indexOf(':'));

        let requestUrl = DEFAULT_REQUEST_URL;

        if (command === 'id') {
            const id = search.substring(search.indexOf(':') + 1);

            if (id.trim() !== '') {
                requestUrl += '/' + id;

                this.setState({
                    searchById: true
                });

                return requestUrl;
            }
        }

        if (search && search.trim() !== '' && search.trim() !== 'id:') {
            requestUrl += "?search=" + search;
        }

        return requestUrl;
    }

    handleLoadDashboard = (requestUrl) => {
        fetch(requestUrl)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(data => {
                let dashboards = [];
                let noResult = true;

                if (this.state.searchById) {
                    if (data) {
                        dashboards.push(data.dashboard);
                        noResult = false;
                    }
                }
                else {
                    if (data && data.count > 0) {
                        dashboards = data.dashboards;
                        noResult = false;
                    }
                }

                this.setState({
                    dashboards: dashboards,
                    searchById: false,
                    noResult: noResult
                });
            })
            .catch(err => {
                console.log(err);
            });

    };

    render() {
        let content = (
            <div style={listStyle}>
                <SearchDashboardList
                    addDashboard={this.props.addDashboard}
                    dashboards={this.state.dashboards}/>
            </div>
        );

        if (this.state.noResult) {
            content = (
                <div style={{textAlign: 'center'}}>
                    <span style={{fontStyle: 'italic'}}>Inga dashboards funna</span>
                </div>
            );
        }
        return(
            <div>
                <div style={formStyle}>
                    <SearchDashboardForm
                        onSearchClicked={this.onSearchClicked}
                        defaultSearch={this.props.defaultSearch}/>
                </div>
                {content}
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

SearchDashboard.propTypes = {
    addDashboard: PropTypes.func.isRequired
};

export default SearchDashboard;