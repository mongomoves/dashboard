import React, { Component } from 'react';

class Dashboard extends Component {
    render() {
        const {children} = this.props;

        return(
          <div>
              {children}
          </div>
        );
    }
}

export default Dashboard;
