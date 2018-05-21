import './footer.css';
import BootstrapModal from '../Modal/BootstrapModal';
import React, { Component } from 'react';
import SERVER_URL from '../../constants'


class Footer extends Component {

  constructor(props){
      super(props);
          this.state = {
        //    logg: [],
            modals: {
                showBootStrapModal: false
            }

          }


    }

    handleShowBootStrapModal = () => {
        this.setState({modals: {showBootStrapModal: true}})
    };

    handleCloseBootStrapModal = () => {
        this.setState({modals: {showBootStrapModal: false}})
    };





componentWillMount() {
  console.log("componentWillMount");
  this.getData();
  this.getLimit();

 }

getData = () =>{
<<<<<<< HEAD

  fetch('http://192.168.99.100:3001/api/log')
=======
  fetch(SERVER_URL + '/api/log')
>>>>>>> master
   .then(results => {
     return results.json();
   }).then(function(data){
   console.log(data);

  //let logg = data.logEntries;

  // this.setState({ logg: data.results });
   }.bind(this))
   .catch(err => {
      console.log("ERROR: " + err);
    })

}


getLimit = () =>{

  fetch('http://192.168.99.100:3001/api/log?limit=1')
   .then(results => {
     return results.json();
   }).then(function(data){
   console.log(data);

  //let logg = data.logEntries;

  // this.setState({ logg: data.results });
   }.bind(this))
   .catch(err => {
      console.log("ERROR: " + err);
    })
}




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

                  <div className="logg">

                  </div>
              </BootstrapModal>

                <div  className="footerText">
                <p><a onClick={this.handleShowBootStrapModal}>
                 footer
                 {this.state.logg}
                </a></p></div>
              </div>
            )
          }

        }
        export default Footer;
