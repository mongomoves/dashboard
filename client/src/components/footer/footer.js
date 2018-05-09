import './footer.css';
import React, { Component } from 'react';


class Footer extends Component {

  constructor(props){
      super(props);
      this.state = {toggle: true};
      this.eventHandler = this.eventHandler.bind(this);
    }
    eventHandler(event) {
  this.setState((prevState) => ({
      toggle: !prevState.toggle
    })
  );
}

      render() {
          return (

              <div className="footer">
                <div  className="footerText">
                <p><a onClick={this.eventHandler}>
                {this.state.toggle ? 'footer' : 'reset'}
                </a>
                </p>
                </div>
              </div>
            )
          }




        }
        export default Footer;
