import React, { Component } from 'react';
import _ from 'lodash';

class ActivityItem extends Component {
  constructor(props) {
    super(props);
  }

  createLogItems() {
    return _.map(this.props.logg, function (loggs) {
      return (
        <div>
          <strong>Titel:</strong> {loggs.title}<br></br>
          <strong>Skapad av:</strong> {loggs.creator}<br></br>
          <strong>Skapad:</strong> {loggs.created}<br></br>
          <br></br>
          <br></br>
        </div>
      );
    });
  }

  render() {
    return (
      <div className="CreateLogItems" >
        <br></br>
        {this.createLogItems()}
        <br></br >
      </div >
    );
  }
}

export default ActivityItem;
