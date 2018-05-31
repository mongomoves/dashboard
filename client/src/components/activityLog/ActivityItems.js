import React, { Component } from 'react';
import { formatTimeStamp } from "../../utils/DateFormat";
import _ from 'lodash';
import { SERVER_URL } from '../../Constants'

/**
 * Component holding the list of 50 recent activities (things saved to the database).
 * Each entry is clickable so the user can search and add that specific entry.
 */
class ActivityItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logg: []
        }
    }

    onLogItemClick = (contentId, kind) => {
        if (kind === "Widget") {
            this.props.onLogWidgetClick('id:' + contentId);
        }
        else {
            this.props.onLogDashboardClick('id:' + contentId);
        }
    };

    componentDidMount() {
        this.getActivityData();
    }

    getActivityData = () => {
        fetch(SERVER_URL + '/api/log?limit=50')
            .then(results => {
                return results.json();
            }).then(data => {
                let logg = data.logEntries
                this.setState({ logg: logg });
            }
            )
    };

    createLogItems() {
        const onLogItemClick = this.onLogItemClick;

        return _.map(this.state.logg, function (loggs) {
            return (
                <div key={loggs.contentId} onClick={() => onLogItemClick(loggs.contentId, loggs.kind)}>
                    <strong>Titel:</strong> {loggs.title} ({loggs.kind})<br />
                    <strong>Skapad av:</strong> {loggs.creator}<br />
                    <strong>Skapad:</strong> {formatTimeStamp(loggs.created)}<br />
                    <br/>
                </div>
            );
        });
    }

    render() {
        return (
            <div className="CreateLogItems" style={listStyle} >
                <br />
                {this.createLogItems()}
                <br />
            </div>
        );
    }
}

const listStyle = {
    maxHeight: "60vh",
    overflowY: 'auto'
};

export default ActivityItems;
