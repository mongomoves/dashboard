import React, { Component } from 'react';
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

  formatTimeStamp = (timestamp) => {
        let newTime = timestamp.replace(/([A-Z])/g, " ");
        return newTime.slice(0, (newTime.indexOf(".") - 3));
  };

  createLogItems() {
      const onLogItemClick = this.onLogItemClick;
      const formatTimeStamp = this.formatTimeStamp;

      return _.map(this.props.logg, function (loggs) {
          const formatCreated = formatTimeStamp(loggs.created);

          return (
            <div key={loggs.contentId} onClick={() => onLogItemClick(loggs.contentId, loggs.kind)}>
                  <strong>Titel:</strong> {loggs.title}<br/>
                  <strong>Skapad av:</strong> {loggs.creator}<br/>
                  <strong>Skapad:</strong> {formatCreated}<br/>
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
