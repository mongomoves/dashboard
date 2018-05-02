import React, { Component } from 'react';
import {Responsive, WidthProvider} from 'react-grid-layout';
import _ from 'lodash';
import Cell from './cell/cell'
import {Jumbotron} from 'react-bootstrap';

const ResponsiveGRL = WidthProvider(Responsive);

/*
* Dashboard component, basically a react-grid-layout with TODO capabilites to
* add or remove cells.
*/

class Dashboard extends Component {
    static defaultProps = {
        className: 'layout',
        rowHeight: 30,
        cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }
    };

    constructor(props) {
        super(props);
        
        this.state = {
            layout: props.layout,
        };

        this.addCell = this.addCell.bind(this);
        // this.onLayoutChange = this.onLayoutChange.bind(this);
    }

    /**
     * Builds and returns elements based on whatever is found in state.layout.
     */
    generateDOM() {
        return _.map(this.state.layout, function(i) {
            return(
                <div key = {i.i}>
                     <Cell title = "A new fun widget" creator = "Sebastian" dataURL= "https://snapshot.raintank.io/dashboard-solo/snapshot/y7zwi2bZ7FcoTlB93WN7yWO4aMiz3pZb?from=1493369923321&to=1493377123321&panelId=4"></Cell>
                </div>
                   
                        
                    
                   
                
            )
        });
    }

    // onLayoutChange(layout) {
    //     this.setState(prevstate => ({
    //         layout: layout
    //     }));
    // }

    addCell(newCell) {
        this.setState(prevState => ({
            layout: [...prevState.layout, newCell]
        }));
    }

    render() {
        return(
            <ResponsiveGRL
                className={this.state.className}
                layout={this.state.layout}
                breakpoints={{lg:1200}}
                //onLayoutChange={this.onLayoutChange}
            >
                {this.generateDOM()}
            </ResponsiveGRL>
        );
    }
}

export default Dashboard;



