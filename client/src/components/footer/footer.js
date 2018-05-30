import './footer.css';
import BootstrapModal from '../Modal/BootstrapModal';
import React, { Component } from 'react';
import FooterItem from './FooterItem'
import ActivityItem from './ActivityItem'
import {Glyphicon} from 'react-bootstrap';
import {SERVER_URL} from '../../Constants'


/*
* Handles the footer and activitylog
*/
class Footer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      logg: [],
      footerData: [],
      modals: {
        showActivityLog: false
      }
    }
  }

  /*
  * Method to show BootstrapModal
  */
  handleShowActivityLog = () => {
    this.setState({ modals: { showActivityLog: true } })
  };

  /*
  * Method to close BootstrapModal
  */
  handleCloseActivityLog = () => {
    this.setState({ modals: { showActivityLog: false } })
  };

  /*
  * Calls the two different methods and sets a interval for them each
  */
  componentDidMount() {
    this.getActivityData();
    this.getFooterData();
    let intervalIdFooter = setInterval(this.getFooterData, 1000 * 5);
    this.setState({ intervalFooter: intervalIdFooter });
    let intervalIdActivityLogg = setInterval(this.getActivityData, 1000 * 60);
    this.setState({ intervalActivityLogg: intervalIdActivityLogg });
  }

  /*
  * stops the timer for the two different methods
  */
  componentWillUnmount() {
    if (this.state.intervalFooter || this.state.intervalActivityLogg) {
      clearInterval(this.state.intervalFooter);
      clearInterval( this.state.intervalActivityLogg);
    }
  }

  /*
  * fetches the data to get all log entries
  */
  getActivityData = () => {
    fetch(SERVER_URL + '/api/log')
      .then(results => {
        return results.json();
      }).then(data => {
        let logg = data.logEntries
        this.setState({ logg: logg });
       }
     )
  };

 /*
  * fetches the data to get the latest log entrie
  */
  getFooterData = () => {
    fetch(SERVER_URL + '/api/log?limit=1')
      .then(results => {
        return results.json();
      }).then(data => {
        let footerData = data.logEntries;
        this.setState({ footerData: footerData });
      }
    )
};

render() {
  return (
    <div className="footer">
      <BootstrapModal
        title="Aktivitetslogg"
        show={this.state.modals.showActivityLog}
        close={this.handleCloseActivityLog}>
        <ActivityItem
            logg={this.state.logg}
            onLogWidgetClick={this.props.onLogWidgetClick}
            onLogDashboardClick={this.props.onLogDashboardClick}
            done={this.handleCloseActivityLog}/>  
      </BootstrapModal>
      
      <div className="footerText">
            <a onClick={this.handleShowActivityLog}>
                <FooterItem footerData={this.state.footerData} />
            </a>
      </div>
        <div className="iconFooter">
            <a onClick={this.handleShowActivityLog}>
                <Glyphicon glyph="glyphicon glyphicon-list-alt" />
            </a>
        </div>
    </div>
    )
  }
}

export default Footer;
