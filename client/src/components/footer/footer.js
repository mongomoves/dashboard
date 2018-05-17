import './footer.css';
import BootstrapModal from '../Modal/BootstrapModal';
import React, { Component } from 'react';


class Footer extends Component {

  constructor(props){
      super(props);
          this.state = {
            modals: {
                showBootStrapModal: false
            },
          }
    }

    handleShowBootStrapModal = () => {
        this.setState({modals: {showBootStrapModal: true}})
    };

    handleCloseBootStrapModal = () => {
        this.setState({modals: {showBootStrapModal: false}})
    };



      render() {
          return (

              <div className="footer">
              <BootstrapModal
                  title="Aktivitetslogg"
                  show={this.state.modals.showBootStrapModal}
                  close={this.handleCloseBootStrapModal}>
                  Datum: 180515<br />
                  Tid: 15.17<br />
                  Sven har lagt till cellen "Projekt"
              </BootstrapModal>
                <div  className="footerText">
                <p><a onClick={this.handleShowBootStrapModal}>
                 footer
                </a>
                </p>
                </div>
              </div>
            )
          }

        }
        export default Footer;
