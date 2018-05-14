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

const localStorageLayouts = loadFromLocalStorage("layouts") || {};
const localStorageCells = loadFromLocalStorage("cells") || [];

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            layouts: JSON.parse(JSON.stringify(localStorageLayouts)),
            cells: JSON.parse(JSON.stringify(localStorageCells)),
            modals: {
                createCell: false,
                existingCell: false
            },
            idCounter: localStorageCells.length
        };
    }

    // adds a cell to the layout
    // depending on widget type the inital w/h and minw/minh are different
    addCell = (cell) => {
        let w, h, minW, minH;
        if (cell.kind === 'Value') {
            w = 2;
            h = 2;
            minW = 2;
            minH = 2;
        }
        else if (cell.kind === 'Graph' ) {
            w = 3;
            h = 4;
            minW = 3;
            minH = 4;
        }

        const layout = {
            i: this.state.idCounter,
            x: (this.state.cells.length) % (this.state.cols || 12),
            y: Infinity,
            w: w,
            h: h,
            minW: minW,
            minH: minH
        };

        const newCell = {
            layoutId: layout.i,
            content: cell
        };

        this.setState({
            layout: this.state.layout.concat(layout),
            cells: this.state.cells.concat(newCell),
            idCounter: this.state.idCounter + 1
        });

        console.log(`addCell:cell=${JSON.stringify(newCell)}:layout=${JSON.stringify(layout)}`);
        return newCell;
    };

    removeCell = (layoutId) => {
        this.setState({
            cells: _.reject(this.state.cells, {layoutId: layoutId})
        });
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

        saveToLocalStorage('layouts', layouts);
        saveToLocalStorage('cells', this.state.cells);

        this.setState({
            layout: layout,
            layouts: layouts
        });
    };

    // We're using the cols coming back from this to calculate where to add new items.
    onBreakpointChange = (breakpoint, cols) => {
        // console.log(`onBreakpointChange:bp=${breakpoint}:cols=${cols}`);
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
                    removeCell={this.removeCell}
                    cells={this.state.cells}
                    onLayoutChange={this.onLayoutChange}
                    onBreakpointChane={this.onBreakpointChange}
                    onResizeStop={this.onResizeStop}/>
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

        global.localStorage.setItem(key, JSON.stringify(value));
    }
}

function loadFromLocalStorage(key) {
    let localStorageItem = {};
    if (global.localStorage) {
        try {
            localStorageItem = JSON.parse(global.localStorage.getItem(key));
        } catch (e) {
            console.log(e);
        }
    }

    console.log(`fromLS:key=${JSON.stringify(key)}:val=${JSON.stringify(localStorageItem)}`);
    return localStorageItem;
}

export default App;
