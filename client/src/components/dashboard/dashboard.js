import React, { Component } from 'react';
import {Responsive, WidthProvider} from 'react-grid-layout';
import _ from 'lodash';

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
            layout: this.props.data.layout,
            cells: this.props.data.cells
        };

       this.onLayoutChange = this.onLayoutChange.bind(this);
    }

    /**
     * Builds and returns elements based on whatever is found in state.layout.
     * TODO: Change to actual Cell components that is to be displayed
     */
    generateDOM() {
        return _.map(this.state.cells, function(i) {
            return(
                <div key={i.i}>
                    <p>{i.title}</p>
                    <p>{i.iframe}</p>
                    <p>{i.desc}</p>
                </div>
            )
        });
    }

    /**
     * Updates specific state with passed props, unless new props are same as old state.
     * TODO: Make it so it doesn't break it.
     * @param {*} nextProps 
     * @param {*} prevState 
     */
    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.layout !== prevState.layout) {
            return {
                layout: nextProps.layout,
                cells: nextProps.cells
            }
        }
        return null;
    }

    /**
     * Likely the function fired when layout should be saved to localStorage.
     */
    onLayoutChange(layout) {
        console.log('layout: ' + JSON.stringify(layout));
        if(layout) {
            this.setState(prevstate => ({
                layout: layout
            }));
            this.props.onLayoutChanged(this.state.layout);
        }
    }

    render() {
        return(
            <ResponsiveGRL
                className={this.state.className}
                layout={this.state.layout}
                breakpoints={{lg:1200}}
                onLayoutChange={this.onLayoutChange}
            >
                {this.generateDOM()}
            </ResponsiveGRL>
        );
    }
}

export default Dashboard;
