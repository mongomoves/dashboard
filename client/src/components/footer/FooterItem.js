import React, { Component } from 'react';
import _ from 'lodash';

class FooterItem extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.test, ' props i')
  }

  createFooterItems() {
    return _.map(this.props.test, function (loggs) {
      return (
        <div>
          Titel: {loggs.title} 
          Skapad: {loggs.created} 
          Skapad av: {loggs.creator} 

        </div>
      );
    });
  }

  render() {

    return (
      <div className="CreateLogItems" >
        {this.createFooterItems()}
      </div >
    );
  }
}

export default FooterItem;
