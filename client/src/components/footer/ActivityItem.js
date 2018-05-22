import React, { Component } from 'react';
import _ from 'lodash';

class ActivityItem extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.logg, ' props i')
  }

  createLogItems() {

    return _.map(this.props.logg, function (loggs) {
      return (
        <div>
          Skapad: {loggs.created}<br></br>
          Titel: {loggs.title}<br></br>
          Beskrivning: {loggs.text}<br></br>
          Skapad av: {loggs.creator}<br></br>

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
