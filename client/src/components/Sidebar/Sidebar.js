import React, { Component } from 'react';
import { MenuItem, Glyphicon } from 'react-bootstrap';
import './Sidebar.css';

//Component that displays the sidebar on the how to page. Handels onClick events by calling methods from Article component.

class Sidebar extends Component {
    constructor(props){
        super(props);
        this.state = {
            Sidebar: false,
            cog: <Glyphicon glyph="menu-down" />
        }
    }

    render() {
        return (
            <div>
                <div className="vertical-list">
                    <MenuItem eventKey={4.1} onClick={this.props.clickedKoncept} className="button">Koncept<Glyphicon glyph={this.state.collapse ? "chevron-left" : "chevron-right"}/></MenuItem>
                    <MenuItem eventKey={4.2} onClick={this.props.clickedWidgetEx} className="button">Widget</MenuItem>
                    <MenuItem eventKey={4.3} onClick={this.props.clickedStepByStep} className="button">Steg för steg</MenuItem>
                </div>
            </div>
        );
    }
}

export default Sidebar;