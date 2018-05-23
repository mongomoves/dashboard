import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MenuItem, Glyphicon } from 'react-bootstrap';
import './Sidebar.css';

//Component that displays the sidebar on the how to page. Handels onClick events by calling methods from Article component.
class Sidebar extends Component {
    constructor(props){
        super(props);
        this.state = {
            Sidebar: false,
            CollapseKoncept: false,
            CollapseWidget: false,
            CollapseStep: false,
            cog: <Glyphicon glyph="menu-down" />
        }

    }

    render() {
        return (
            <div>
                <div className="vertical-list">
                    <MenuItem eventKey={4.1} onClick={() => {
                            this.setState({CollapseKoncept: !this.state.CollapseKoncept}); 
                            this.props.clickedKoncept()}} className="button">Koncept
                        <Glyphicon glyph={this.state.CollapseKoncept ? "chevron-left" : "chevron-right"}/>
                    </MenuItem>

                    <MenuItem eventKey={4.2} onClick={() => {
                            this.setState({CollapseWidget: !this.state.CollapseWidget}); 
                            this.props.clickedWidgetEx()}} className="button">Widget
                        <Glyphicon glyph={this.state.CollapseWidget ? "chevron-right" : "chevron-left"}/>
                    </MenuItem>

                    <MenuItem eventKey={4.3} onClick={() => {
                            this.setState({CollapseStep: !this.state.CollapseStep}); 
                            this.props.clickedStepByStep()}} className="button">Steg för steg
                        <Glyphicon glyph={this.state.CollapseStep ? "chevron-right" : "chevron-left"}/>
                    </MenuItem>
                </div>
            </div>
        );
    }
}

Sidebar.propTypes = {
    clickedKoncept: PropTypes.func,
    clickedWidgetEx: PropTypes.func,
    clickedStepByStep: PropTypes.func
};

export default Sidebar;