import React, { Component } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import Cell from '../cell/Cell'
import _ from 'lodash';

const ResponsiveGRL = WidthProvider(Responsive);
const originalLayouts = loadFromLocalStorage("layouts") || {};

/*
* Dashboard component, basically a react-grid-layout with dynamic ability to add
* and remove cells.
*/
class Dashboard extends Component {
    static defaultProps = {
        className: 'layout',
        cols: { lg: 12, md: 10, sm: 8, xs: 2, xxs: 1 },
        rowHeight: 50
    };

    constructor(props) {
        super(props);

        this.state = {
            layouts: JSON.parse(JSON.stringify(originalLayouts)),
        };

        this.onLayoutChange = this.onLayoutChange.bind(this);
        this.onBreakpointChange = this.onBreakpointChange.bind(this);
        this.clearDashboardLayout = this.clearDashboardLayout.bind(this);
    }

    onLayoutChange(layout, layouts) {
        saveToLocalStorage("layouts", layouts);
        this.setState({layouts: layouts});
    }

    // We're using the cols coming back from this to calculate where to add new items.
    onBreakpointChange(breakpoint, cols) {
        this.setState({
            breakpoint: breakpoint,
            cols: cols
        });
    }

    onRemoveCell(i) {
        this.setState({cells: _.reject(this.props.cells, {i: i})})
    }

    clearDashboardLayout() {
        this.setState({layouts: {} });
    }

    /**
     * Builds and returns elements based on whatever is found in state.cells.
     */
    generateElement() {
        return _.map(this.props.cells, function (cell) {
            const {i, x, y, w, h, minW, minH} = cell.layout;

            return (
                <div key={i} data-grid={{x, y, w, h, minW, minH}}>
                    <Cell
                        title={cell.data.title}
                        creator={cell.data.author}
                        dataURL={cell.data.dataSource}
                        dateTime={cell.data.dateTime}
                        descr={cell.data.descr}
                        unit={cell.data.unit}
                        value={cell.data.value}/>
                </div>
            );
        });
    }

    render() {
        return (
            <ResponsiveGRL
                onLayoutChange={this.onLayoutChange}
                onBreakPointChange={this.onBreakpointChange}
                {...this.props}>

                {this.generateElement()}

            </ResponsiveGRL>
        );
    }
}

function saveToLocalStorage(key, value) {
    if (global.localStorage) {
        console.log(`toLS:key=${JSON.stringify(key)}:val=${JSON.stringify(value)}`);

        global.localStorage.setItem(
            "dashboard",
            JSON.stringify({
                [key]: value
            })
        );
    }
}

function loadFromLocalStorage(key) {
    let localStorageItem = {};
    if (global.localStorage) {
        try {
            localStorageItem = JSON.parse(global.localStorage.getItem("dashboard")) || {};
        } catch (e) {
            console.log(e);
        }
    }

    console.log(`fromLS:key=${JSON.stringify(key)}:val=${JSON.stringify(localStorageItem[key])}`);
    return localStorageItem[key];
}

export default Dashboard;




