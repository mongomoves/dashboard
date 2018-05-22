import './Footer.css';
import BootstrapModal from '../Modal/BootstrapModal';
import React, { Component } from 'react';
import SERVER_URL from '../../constants'
import FooterItem from './FooterItem'
import ActivityItem from './ActivityItem'

class Footer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      logg: [],
      footerData: [],

      test: 'hej',
      modals: {
        showBootStrapModal: false
      }

    }
    console.log(this.state.logg, ' detta är states i construk')


  }

  handleShowBootStrapModal = () => {
    this.setState({ modals: { showBootStrapModal: true } })
  };

  handleCloseBootStrapModal = () => {
    this.setState({ modals: { showBootStrapModal: false } })
  };





  componentDidMount() {
    console.log("componentWillMount");
    this.getActivityData();
    this.getFooterData();
    let intervalID = setInterval(this.getFooterData, 1000 * 60);
    this.setState({ interval: intervalID });

  }

  componentWillUnmount() {
    if (this.state.interval) {
      clearInterval(this.state.interval);
    }
  }

  getActivityData = () => {
    fetch('http://192.168.99.100:3001/api/log')
      .then(results => {
        return results.json();
      }).then(data => {
        console.log(data, ' detta är data från fetch');
        let logg = data.logEntries

        this.setState({ logg: logg });
        console.log(this.state.logg, ' loggs');
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
    </div>
  )
}

}
export default Footer;
