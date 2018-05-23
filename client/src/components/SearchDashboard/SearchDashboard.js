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
            query:'',
            result: true
        }
    }
    onSearchClicked = (query) => {
        this.handleLoadDashboard(query);
    };

    handleLoadDashboard = (query) => {
        fetch(DEFAULT_REQUEST_URL + '?search='+query)
            .then(result => {
                return result.json();
            })
            .then(data => {
                const dashboards = data.dashboards;
                this.setState({
                    dashboards: dashboards,
                    result: data.count
                });
            })
            .catch(err => {
                console.log(err);
            });

    };

    render() {
        let content = (
            <div style={listStyle}>
                <SearchDashboardList addDashboard={this.props.addDashboard} dashboards={this.state.dashboards} query={this.state.query}/>
            </div>
        );

        if (!this.state.result) {
            content = (
                <div style={{textAlign: 'center'}}>
                    <span style={{fontStyle: 'italic'}}>Inga dashboards funna</span>
                </div>
            );
        }
        return(
            <div>
                <div style={formStyle}>
                    <SearchDashboardForm onSearchClicked={this.onSearchClicked}/>
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