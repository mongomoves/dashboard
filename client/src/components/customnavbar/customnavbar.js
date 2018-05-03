import React, { Component } from 'react';
import './customnavbar.css';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap';
import Modal from '../Modal/Modal';



class CustomNavbar extends Component {

    state = {
        cog: <Glyphicon glyph="cog" />
    }
    render() { 
        return (
            <Navbar inverse collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="#brand">Axis Dasboard</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <NavItem eventKey={1} href="#">
                  How to
                </NavItem>
                <NavItem eventKey={2} href="#">
                  Something
                </NavItem>
              </Nav>
              <Nav pullRight>
              <NavDropdown eventKey={3} title={this.state.cog} id="basic-nav-dropdown">
                  <MenuItem eventKey={3.1} onClick={this.props.show}>Save Dashboard</MenuItem>
                  <MenuItem eventKey={3.2}>Load Dashboards</MenuItem>
                  <MenuItem eventKey={3.3}>Edit Dashboard</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey={3.3}>Delete Dashboard</MenuItem>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

        );
        
    }
}

export default CustomNavbar;
