import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CustomNavbar.css';
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap';

class CustomNavbar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cog: <Glyphicon glyph="cog" />,
            log: <Glyphicon glyph="glyphicon glyphicon-list-alt" />
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
                        <NavItem onClick={this.props.showActivityLog} id='basic-nav-dropdown'>
                            <div>{this.state.log}</div>
                        </NavItem>
                        <NavDropdown eventKey={3} title={this.state.cog} id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1} onClick={this.props.showCreateCell}>Skapa Widget</MenuItem>
                            <MenuItem eventKey={3.2} onClick={this.props.showExistingCell}>Sök Widgets</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={3.3} onClick={this.props.showSaveDashboard}>Spara Dashboard</MenuItem>
                            <MenuItem eventKey={3.4} onClick={this.props.showLoadDashboard}>Sök Dashboards</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={3.5} onClick={this.props.clearDashboard}>Rensa din Dashboard</MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

CustomNavbar.propTypes = {
    showCreateCell: PropTypes.func,
    showExistingCell: PropTypes.func,
    clearDashboard: PropTypes.func,
    showSaveDashboard: PropTypes.func,
    showLoadDashboard: PropTypes.func
};

export default CustomNavbar;
