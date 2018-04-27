import React, { Component } from 'react';
import {Responsive, WidthProvider} from 'react-grid-layout';

const ResponsiveGRL = WidthProvider(Responsive);

/*
* Dashboard component, basically a react-grid-layout with TODO capabilites to
* add or remove cells.
*/

class Dashboard extends Component {
    static defaultProps = {
        className: 'layout',
        rowHeight: 30,
        cols: 12,
    };

    constructor(props) {
        super(props);
        
        this.state = {
            layout: props.layout
        };
    }
    render() {
        const {children} = this.props;
        const layout = this.state.layout;
        return(
            <ResponsiveGRL className="layout" layout={layout} breakpoints={{lg:1200}}>
                
            </ResponsiveGRL>
        );
    }
}

export default Dashboard;
