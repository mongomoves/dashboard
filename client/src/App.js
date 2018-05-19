import React, { Component } from 'react';
import CustomNavbar from "./components/customnavbar/CustomNavbar";
import Dashboard from "./components/dashboard/Dashboard";
import CreateCellForm from "./components/CreateCell/CreateCellForm";
import EditCellForm from "./components/CreateCell/EditCellForm";
import SelectExistingCell from './components/existingCell/SelectExistingCell';
import CellInfo from './components/cell/CellInfo';
import Footer from "./components/footer/footer";
import BootstrapModal from './components/Modal/BootstrapModal';
import _ from 'lodash';

import './App.css';
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

const localStorageCells = loadFromLocalStorage("cells") || [];

//Used to show info about Cell
let cellInfoData = {};
//Used to show values when editing Cell
let editValues = {};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cells: JSON.parse(JSON.stringify(localStorageCells))
                .sort(function (a, b) {
                return a.layout.i - b.layout.i;
            }),
            modals: {
                createCell: false,
                editCell: false,
                existingCell: false,
                showInfo: false
            },
            idCounter: localStorageCells.length > 0 // if we loaded cells from local storage
                ? Number(localStorageCells[localStorageCells.length - 1].layout.i) + 1 // set start id to highest id + 1
                : 0
        };
    }

    // adds a cell to the layout
    // depending on widget type the initial w/h and minw/minh are different
    addCell = (cell) => {
        let w, h, minW, minH;
        if (cell.kind === 'Value' || cell.kind === 'Text') {
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
            x: (this.state.cells.length) % 12, // TODO: better way to calculate X
            y: Infinity,
            w: w,
            h: h,
            minW: minW,
            minH: minH
        };

        const newCell = {
            layout: layout,
            content: cell
        };

        this.setState({
            cells: this.state.cells.concat(newCell),
            idCounter: this.state.idCounter + 1
        });

        return newCell;
    };

    editCell = (cell, index) => {
        let edited = Object.assign([], this.state.cells);
        edited[index].content = cell;
        this.setState({cells: edited});

        saveToLocalStorage("cells", edited);
    };

    removeCell = (i) => {
        this.setState({
            cells: _.reject(this.state.cells, {layout: {i: i}})
        })
    };

    clearDashboardLayout = () => {
        this.setState({
            layouts: {},
            cells: [],
            idCounter: 0
        });
    };

    /**
     * Callback function. Sets new layout state.
     * @param {*} layout
     */
    onLayoutChange = (layout) => {
        const sortedLayout = layout.sort(function (a ,b) {
            return a.i - b.i;
        });

        // Update layout data in cells
        for (let i = 0; i < this.state.cells.length && i < sortedLayout.length; i++) {
            let cells = Object.assign([], this.state.cells);
            cells[i].layout = sortedLayout[i];
            this.setState({cells: cells});
        }

        saveToLocalStorage('cells', this.state.cells);
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

    handleShowCellInfo = (i) => {
        this.setState({modals: {showInfo: true}});
        this.state.cells.some(function(e) {
            if(e.layout.i === i) {
                cellInfoData = {
                    title: e.content.title,
                    creator: e.content.creator,
                    created: e.content.created,
                    description: e.content.description
                };
                return true;
            }
            return false;
        });
    };

    handleCloseCellInfo = () => {
        this.setState({modals: {showInfo: false}})
    };

    handleShowEditCell = (i) => {
        this.setState({modals: {editCell: true}})
        this.state.cells.some(function(e, index) {
            if(e.layout.i === i) {
                if(e.content.kind === 'Value') {
                    editValues = {
                        index: index,
                        creator: e.content.creator,
                        kind: 'Value',
                        title: e.content.title,
                        number: e.content.number,
                        unit: e.content.unit,
                        dataSource: e.content.dataSource,
                        attribute: e.content.attribute,
                        refreshRate: e.content.refreshRate
                    }
                } else if (e.content.kind === 'Graph') {
                    editValues = {
                        index: index,
                        creator: e.content.creator,
                        kind: 'Graph',
                        title: e.content.title,
                        graphUrl: e.content.graphUrl,
                        displayType: e.content.displayType,
                        refreshRate: e.content.refreshRate
                    }
                } else if (e.content.kind === 'Text') {
                    editValues = {
                        index: index,
                        creator: e.content.creator,
                        kind: 'Text',
                        title: e.content.title,
                        textInput: e.content.textInput,
                        dataSource: e.content.dataSource,
                        attribute: e.content.attribute,
                        refreshRate: e.content.refreshRate
                    }
                }
                return true;
            }
            return false;
        })
    };

    handleCloseEditCell = () => {
        this.setState({modals: {editCell: false}})
    };

    render() {
        return (
            <div>
                <CustomNavbar
                    showCreateCell={this.handleShowCreateCell}
                    showExistingCell={this.handleShowExistingCell}
                    clearDashboard={this.clearDashboardLayout}/>
                <Dashboard
                    removeCell={this.removeCell}
                    showInfo={this.handleShowCellInfo}
                    editCell={this.handleShowEditCell}
                    cells={this.state.cells}
                    onLayoutChange={this.onLayoutChange}/>
                <BootstrapModal
                    title="Skapa widget"
                    show={this.state.modals.createCell}
                    close={this.handleCloseCreateCell}>
                    <CreateCellForm addCell={this.addCell} done={this.handleCloseCreateCell} />
                </BootstrapModal>
                <BootstrapModal
                    show={this.state.modals.existingCell}
                    close={this.handleCloseExistingCell}>
                    <SelectExistingCell done={this.handleCloseExistingCell} />
                </BootstrapModal>
                <BootstrapModal
                    title={cellInfoData.title}
                    show={this.state.modals.showInfo}
                    close={this.handleCloseCellInfo}>
                    <CellInfo cell={cellInfoData}/>
                </BootstrapModal>
                <BootstrapModal
                    title='Redigera widget'
                    show={this.state.modals.editCell}
                    close={this.handleCloseEditCell}>
                    <EditCellForm
                        values={editValues}
                        addCell={this.addCell}
                        editCell={this.editCell}
                        done={this.handleCloseEditCell}/>
                </BootstrapModal>
                 <Footer/>
            </div>
        );
    }
}

function saveToLocalStorage(key, value) {
    if (global.localStorage) {
        //console.log(`toLS:key=${JSON.stringify(key)}:val=${JSON.stringify(value)}`);

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

    //console.log(`fromLS:key=${JSON.stringify(key)}:val=${JSON.stringify(localStorageItem)}`);
    return localStorageItem;
}

export default App;
