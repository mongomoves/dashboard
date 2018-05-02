import React, { Component } from 'react';
import './customnavbar.css';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap';


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
                  <MenuItem eventKey={3.1}>Create widget</MenuItem>
                  <MenuItem eventKey={3.2}>Load widgets</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey={3.3}>Save your Dashboard</MenuItem>
                  <MenuItem eventKey={3.4}>Edit your Dashboard</MenuItem>
                  <MenuItem eventKey={3.5}>Load Dashboards</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey={3.6}>Clear your Dashboard</MenuItem>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>

        );
        
    }
}

export default CustomNavbar;
