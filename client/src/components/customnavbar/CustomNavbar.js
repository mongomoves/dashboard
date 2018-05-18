import React, { Component } from 'react';
import './CustomNavbar.css';
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon, Text } from 'react-bootstrap';

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
                <Link to='/'>Dashboard</Link>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Navbar.Text>
                <Link to='/howtopage'>
                  Hjälp
                </Link>
              </Navbar.Text>
              <Nav pullRight>
              <NavDropdown eventKey={3} title={this.state.cog} id="basic-nav-dropdown">
                  <MenuItem eventKey={3.1} onClick={this.props.showCreateCell}>Skapa widget</MenuItem>
                  <MenuItem eventKey={3.2} onClick={this.props.showExistingCell}>Ladda widgets</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey={3.3}>Spara din Dashboard</MenuItem>
                  <MenuItem eventKey={3.4}>Ladda Dashboards</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey={3.5} onClick={this.props.clearDashboard}>Rensa din Dashboard</MenuItem>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        );
    }
}

export default CustomNavbar;
