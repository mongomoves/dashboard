import React, { Component } from 'react';
import './CustomNavbar.css';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap';

class CustomNavbar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cog: <Glyphicon glyph="cog" />
        };
    }

    render() {
        return (
            <Navbar inverse collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="#brand">Axis Dashboard</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <NavItem eventKey={1} href="#">
                  How to
                </NavItem>
              </Nav>
              <Nav pullRight>
              <NavDropdown eventKey={3} title={this.state.cog} id="basic-nav-dropdown">
                  <MenuItem eventKey={3.1} onClick={this.props.showCreateCell}>Create widget</MenuItem>
                  <MenuItem eventKey={3.2} onClick={this.props.showExistingCell}>Load widgets</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey={3.3} onClick={this.props.showSaveDashboard}>Save your Dashboard</MenuItem>
                  <MenuItem eventKey={3.4}>Edit your Dashboard</MenuItem>
                  <MenuItem eventKey={3.5}>Load Dashboards</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey={3.6} onClick={this.props.clearAllWidgets}>Clear your Dashboard </MenuItem>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        );
    }
}

export default CustomNavbar;
