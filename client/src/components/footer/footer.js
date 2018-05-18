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

componentWillMount() {

  this.getData();

 }



getData = () =>{
  fetch('http://192.168.99.100:3001/api/log')
   .then(results => {
     return results.json();
   }).then(data => {
     let logg = data.log;
     console.log(logg);
     // this.setState(prevState => ({
     //   cells: [...prevState.cells, cells]
     // }))
 this.setState({ logg: logg });
   })



}

      render() {
        console.log("Detta är returnerad data: " + this.state.logg);

          return (


            <div className="footer">
              <BootstrapModal
                  title="Aktivitetslogg"
                  show={this.state.modals.showBootStrapModal}
                  close={this.handleCloseBootStrapModal}>
                  Datum: 180515<br />
                  Tid: 15.17<br />
                  {this.state.logg}
                  Sven har lagt till cellen "Projekt"
                  <div className="logg">

                  </div>
              </BootstrapModal>

                <div  className="footerText">
                <p><a onClick={this.handleShowBootStrapModal}>
                 footer
                </a></p></div>
              </div>
            )
          }

        }
        export default Footer;
