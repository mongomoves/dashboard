import React, { Component } from 'react';
import { MenuItem } from 'react-bootstrap';
import './Sidebar.css';

class Sidebar extends Component {
    constructor(props){
        super(props);
        this.state = {
            Sidebar: false
        }
    }

    render() {
        return (
            <div>
                <div className="vertical-list">
                    <MenuItem eventKey={4.1} className="button">Koncept</MenuItem>
                    <MenuItem eventKey={4.2} className="button">Widget</MenuItem>
                    <MenuItem eventKey={4.3} className="button">Steg för steg</MenuItem>
                    <MenuItem eventKey={4.4} className="button">Ordlista</MenuItem>

                </div>
            </div>
        );
    }
}

export default Sidebar;