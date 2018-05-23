/**
 * Created by Butts on 2018-05-21.
 */
import React from 'react';
import {ListGroup} from "react-bootstrap";
import SearchDashboardListItem from "./SearchDashboardListItem";
import _ from 'lodash';

class SearchDashboardList extends React.Component {

    createListItems = () => {
        const addDashboard = this.props.addDashboard;
        return _.map(this.props.dashboards, function (dashboard) {
                return (
                    <SearchDashboardListItem key={dashboard._id} addDashboard={addDashboard} content={dashboard}/>
                );
        });
    };

    render() {
        return (
            <ListGroup>
                {this.createListItems()}
            </ListGroup>
        );
    }
}

export default SearchDashboardList;