import React, { Component } from 'react';
import CustomNavbar from "./components/customnavbar/CustomNavbar";
import Dashboard from "./components/dashboard/Dashboard";
import CreateCellForm from "./components/CreateCell/CreateCellForm";
import SelectExistingCell from './components/existingCell/SelectExistingCell';
import BootstrapModal from './components/Modal/BootstrapModal';
import _ from 'lodash';

import './App.css';
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

const originalLayouts = loadFromLocalStorage("layouts") || {};

// Test data
const testWidgets = [
    {
        layout: {i: 0, x: 0, y: Infinity, w: 1, h: 2, minW: 1, minH: 2},
        content: {kind: 'Value', title: 'Employees', number: 22, unit: 'people'}
    },

    {
        layout: {i: 1, x: 1, y: Infinity, w: 1, h: 2, minW: 1, minH: 2},
        content: {kind: 'Value', title: 'Disk usage', number: 108, unit: 'gb'}
    },

    {
        layout: {i: 2, x: 2, y: Infinity, w: 3, h: 4, minW: 3, minH: 4},
        content: {kind: 'Graph', title: 'Grafana graph', graphUrl: 'http://play.grafana.org/render/dashboard-solo/db/grafana-play-home?orgId=1&panelId=4&from=1499272191563&to=1499279391563&width=1000&height=500&tz=UTC%2B02%3A00&timeout=5000'}
    }
];

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            layouts: JSON.parse(JSON.stringify(originalLayouts)),
            cells: testWidgets,
            modals: {
                createCell: false,
                existingCell: false
            },
            idCounter: testWidgets.length
        };
    }

    // adds a cell to the layout
    // depending on widget type the inital w/h and minw/minh are different
    addCell = (cell) => {
        let w, h, minH, minW;
        if (cell.kind === 'Value') {
            w = 1;
            h = 2;
            minW = 1;
            minH = 2;
        }
        else if (cell.kind === 'Graph' ) {
            w = 3;
            h = 4;
            minW = 3;
            minH = 4;
        }
        const newCell = {
            layout: {
                i: this.state.idCounter,
                x: (this.state.cells.length) % (this.state.cols || 12),
                y: Infinity,
                w: w,
                h: h,
                minW: minW,
                minH: minH
            },
            content: cell
        };

        this.setState({
            cells: this.state.cells.concat(newCell),
            idCounter: this.state.idCounter + 1
        });

        console.log(`addCell:cell=${JSON.stringify(newCell)}`);
        return newCell;
    };

    removeCell = (i) => {
        this.setState({cells: _.reject(this.state.cells, {i: i})})
    };

    clearDashboardLayout = () => {
        this.setState({layouts: {} });
    };

    /**
     * Callback function. Sets new layout state.
     * @param {*} layout
     */
    onLayoutChange = (layout, layouts) => {
        console.log(`onLayoutChange:layout=${JSON.stringify(layout)}:layouts=${JSON.stringify(layouts)}`);
        saveToLocalStorage("layouts", layouts);
        // TODO: also save cells here...
        this.setState({
            layout: layout, // not sure we need to keep track of layout
            layouts: layouts
        });
    };

    // We're using the cols coming back from this to calculate where to add new items.
    onBreakpointChange = (breakpoint, cols) => {
        console.log(`onBreakpointChange:bp=${breakpoint}:cols=${cols}`);
        this.setState({
            breakpoint: breakpoint,
            cols: cols
        });
    };

    handleShowCreateCell = () => {
        this.setState({modals: {createCell: true}})
    };

    handleCloseCreateCell = () => {
        this.setState({modals: {createCell: false}})
    };

    handleShowExistingCell = () => {
        this.setState({modals: {existingCell: true}})
    };

    handleCloseExistingCell = () => {
        this.setState({modals: {existingCell: false}})
    };

    render() {
        return (
            <div>
                <CustomNavbar showCreateCell={this.handleShowCreateCell} showExistingCell={this.handleShowExistingCell} />
                <Dashboard
                    cells={this.state.cells}
                    onLayoutChange={this.onLayoutChange}
                    onBreakpointChane={this.onBreakpointChange} />
                <BootstrapModal
                    title="Create widget"
                    show={this.state.modals.createCell}
                    close={this.handleCloseCreateCell}>
                    <CreateCellForm addCell={this.addCell} done={this.handleCloseCreateCell} />
                </BootstrapModal>
                <BootstrapModal
                  show={this.state.modals.existingCell}
                  close={this.handleCloseExistingCell}>
                  <SelectExistingCell done={this.handleCloseExistingCell} />
                </BootstrapModal>
            </div>
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

export default App;
