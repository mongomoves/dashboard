import './footer.css';
import './footerText.css'
import React, { Component } from 'react';


class Footer extends Component {

  constructor(props){
      super(props);

    }

      render() {
          return (

              <div className="footer">
                <div  className="footerText"> <p>footer</p> </div>
              </div>
            )
          }




        }
        export default Footer;
