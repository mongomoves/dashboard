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
                    <MenuItem eventKey={4.1} className="button">Steg för steg</MenuItem>
                    <MenuItem eventKey={4.1} className="button">Celler</MenuItem>
                    <MenuItem eventKey={4.1} className="button">Drag and drop</MenuItem>
                    <MenuItem eventKey={4.1} className="button">Datakällor</MenuItem>
                </div>
            </div>
        );
    }
}

export default Sidebar;