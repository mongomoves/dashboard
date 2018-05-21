import React, { Component } from 'react';
import { MenuItem } from 'react-bootstrap';
import howToPage from '../HowToPage/howToPage';
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
                    <MenuItem eventKey={4.1} onClick={this.props.clickedKoncept} className="button">Koncept</MenuItem>
                    <MenuItem eventKey={4.2} onClick={this.props.clickedStepByStep} className="button">Steg för steg</MenuItem>
                    <MenuItem eventKey={4.3} onClick={this.props.clickedWidgetEx} className="button">Widget</MenuItem>
                </div>
            </div>
        );
    }
}

export default Sidebar;