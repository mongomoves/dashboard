import React, { Component } from 'react';
import _ from 'lodash';


/*
* this class maps through the data from the api request to the footer and render it
*/
class FooterItem extends Component {

  createFooterItems() {
    return _.map(this.props.footerData, function (loggs) {
      return (
        <div key={loggs.contentId}>
            {loggs.text}
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        {this.createFooterItems()}
      </div>
    );
  }
}

export default FooterItem;
