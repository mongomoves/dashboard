import React, { Component } from 'react';
import _ from 'lodash';

class FooterItem extends Component {
  constructor(props) {
    super(props);
  }

  createFooterItems() {
    return _.map(this.props.footerData, function (loggs) {
      return (
        <div>
         Ny widget  "{loggs.title}"  skapad av  {loggs.creator}
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
