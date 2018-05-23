import React, { Component } from 'react';
import _ from 'lodash';

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
