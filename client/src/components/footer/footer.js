import './Footer.css';
import BootstrapModal from '../Modal/BootstrapModal';
import React, { Component } from 'react';
import SERVER_URL from '../../constants'
import FooterItem from './FooterItem'
import ActivityItem from './ActivityItem'
import {Glyphicon} from 'react-bootstrap';

class Footer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      logg: [],
      footerData: [],
      modals: {
        showBootStrapModal: false
      }
    }
  }

  handleShowBootStrapModal = () => {
    this.setState({ modals: { showBootStrapModal: true } })
  };

  handleCloseBootStrapModal = () => {
    this.setState({ modals: { showBootStrapModal: false } })
  };

  componentDidMount() {
    this.getActivityData();
    this.getFooterData();
    let intervalIdFooter = setInterval(this.getFooterData, 1000 * 60);
    this.setState({ intervalFooter: intervalIdFooter });
    let intervalIdActivityLogg = setInterval(this.getActivityData, 1000 * 60);
    this.setState({ intervalActivityLogg: intervalIdActivityLogg });
  }

  componentWillUnmount() {
    if (this.state.intervalFooter || this.state.intervalActivityLogg) {
      clearInterval(this.state.intervalFooter);
      clearInterval( this.state.intervalActivityLogg);
    }
  }

  getActivityData = () => {
    fetch('http://192.168.99.100:3001/api/log')
      .then(results => {
        return results.json();
      }).then(data => {
        let logg = data.logEntries
        this.setState({ logg: logg });
       }
     )
  }

  getFooterData = () => {
    fetch('http://192.168.99.100:3001/api/log?limit=1')
      .then(results => {
        return results.json();
      }).then(data => {
        let footerData = data.logEntries
        this.setState({ footerData: footerData });
      }
    )
}

render() {
  return (
    <div className="footer">
      <BootstrapModal
        title="Aktivitetslogg"
        show={this.state.modals.showBootStrapModal}
        close={this.handleCloseBootStrapModal}>
        <ActivityItem logg={this.state.logg} />
        <div className="logg">
        </div>
      </BootstrapModal>
      <div className="footerText">
        <p><a onClick={this.handleShowBootStrapModal}>
          <FooterItem test={this.state.footerData} />
        </a></p></div>
        <div className="iconFooter">
         <p><a onClick={this.handleShowBootStrapModal}>
        <Glyphicon glyph="glyphicon glyphicon-list-alt" />
        </a></p></div>
    </div>
    )
  }
}

export default Footer;
