import React, { Component } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import _ from 'lodash';
import { Jumbotron, Button } from 'react-bootstrap';
import Cell from '../cell/cell'



const ResponsiveGRL = WidthProvider(Responsive);

/*
* Dashboard component, basically a react-grid-layout with dynamic ability to add
* and remove cells.
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
            layouts: {
                lg: this.props.data.layout
            },
            cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }
        }
        this.onLayoutChange = this.onLayoutChange.bind(this);
    }



    /**
     * Builds and returns elements based on whatever is found in state.layout.
     * 
     */
    generateDOM() {
        return _.map(this.props.data.cells, function (i) {
            return (
                <div key={i.i}>
                    <Cell title={i.title} creator={i.author} dataURL={i.dataSource} dateTime={i.dateTime} descr={i.descr}></Cell>
                </div>
            )
        });
    }

    /**
     * Likely the function fired when layout should be saved to localStorage.
     */
    onLayoutChange(layout) {
        this.props.onLayoutChanged(layout);
    }

    render() {
        return (

            <ResponsiveGRL
                className='layout'
                layouts={this.state.layouts}
                breakpoints={{ lg: 1200 }}
                onLayoutChange={this.onLayoutChange}
                cols={this.state.cols}
                rowHeight={30}
            >
                {this.generateDOM()}

            </ResponsiveGRL>

        );
    }
}

export default Dashboard;



