import React, { Component } from 'react';
import {formatTimeStamp} from "../../utils/DateFormat";
import _ from 'lodash';

class ActivityItem extends Component {

  onLogItemClick = (contentId, kind) => {
      if (kind === "Widget") {
          this.props.onLogWidgetClick('id:' + contentId);
      }
      else {
          this.props.onLogDashboardClick('id:' + contentId);
      }

      this.props.done();
  };

  createLogItems() {
      const onLogItemClick = this.onLogItemClick;

      return _.map(this.props.logg, function (loggs) {
          return (
            <div key={loggs.contentId} onClick={() => onLogItemClick(loggs.contentId, loggs.kind)}>
                  <strong>Titel:</strong> {loggs.title}<br/>
                  <strong>Skapad av:</strong> {loggs.creator}<br/>
                  <strong>Skapad:</strong> {formatTimeStamp(loggs.created)}<br/>
                  <br/>
            </div>
          );
    });
  }

  render() {
    return (
      <div className="CreateLogItems" style={listStyle} >
        <br/>
            {this.createLogItems()}
        <br/>
      </div>
    );
  }
}

const listStyle = {
    maxHeight: "60vh",
    overflowY: 'auto'
};

export default ActivityItem;
