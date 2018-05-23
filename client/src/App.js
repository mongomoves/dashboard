import React, { Component } from 'react';
import CustomNavbar from "./components/customnavbar/CustomNavbar";
import Dashboard from "./components/dashboard/Dashboard";
import CreateCellForm from "./components/CreateCell/CreateCellForm";
import EditCellForm from "./components/CreateCell/EditCellForm";
import SearchCells from './components/SearchCells/SearchCells';
import CellInfo from './components/cell/CellInfo';
import Footer from "./components/footer/Footer";
import BootstrapModal from './components/Modal/BootstrapModal';
import SaveDashboard from "./components/SaveDashboard/SaveDashboard";
import SearchDashboard from "./components/SearchDashboard/SearchDashboard";
import _ from 'lodash';

import './App.css';
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import LoadDashboard from "./components/SearchDashboard/SearchDashboard";

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
                searchCells: false,
                showInfo: false,
                saveDashboard: false,
                loadDashboard: false,
            },
            idCounter: localStorageCells.length > 0 // if we loaded cells from local storage
                ? Number(localStorageCells[localStorageCells.length - 1].layout.i) + 1 // set start id to highest id + 1
                : 0
        };
    }

    /**
     * Checks if the specified position is blocked by a cell in cells array.
     * Also returns true if the position would span more than max column width.
     * @param cells an array of cells, most likely this.state.cells
     * @param x the cell's x coordinate
     * @param y the cell's y coordinate
     * @param w the width of the cell
     * @param h the height of the cell
     * @returns true or false
     */
    isPositionBlocked(cells, x, y, w, h) {
        return cells.some(function(cell) {
            return (cell.layout.x < x + w && cell.layout.x + cell.layout.w > x
                && cell.layout.y < y + h && cell.layout.y + cell.layout.h > y)
                || x + w > 12;
        });
    }

    /**
     * Finds an empty position on the dashboard, used when creating new cells.
     * Terribly expensive and in need of optimization if we have time.
     * @param w width of cell
     * @param h height of cell
     * @returns array with x and y coordinates of empty position
     */
    findEmptyPosition = (w, h) => {
        let xPos = 0;
        let yPos = 0;

        let posIsBlocked = true;

        for (let i = 0; posIsBlocked; i++) {
            xPos = i % 12;

            if (i > 0 && i % 12 === 0) {
                yPos++;
            }

            posIsBlocked = this.isPositionBlocked(this.state.cells, xPos, yPos, w, h);
        }

        return [xPos, yPos];
    };

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

        const position = this.findEmptyPosition(w, h);

        const layout = {
            i: this.state.idCounter,
            x: position[0],
            y: position[1],
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

    //adds id generated for widget in backend to the widget in the cells Array.
    //parameter: data The widget from the post request response.
    addID = (data) => {
        let cells = Object.assign([], this.state.cells);
        for (let i = 0; i < cells.length; i++) {
            if((cells[i].content.description === data.description) 
                && (cells[i].content.creator === data.creator)) {
                cells[i].content._id = data._id;
            }
        }
        this.setState({cells: cells});
        saveToLocalStorage("cells", this.state.cells);
    };

    getAllCells = () => {
        return this.state.cells;
    };
    addDashboard = (dashboards) => {
        this.setState({
            cells: dashboards
        });

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

    handleShowSearchCells = () => {
        this.setState({modals: {searchCells: true}})
    };

    handleCloseSearchCells = () => {
        this.setState({modals: {searchCells: false}})
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


    handleShowSaveDashboard = () => {
        this.setState({modals: {saveDashboard: true}})
    };

    handleCloseSaveDashboardSuccess = () => {
        this.setState({modals: {saveDashboard: false}})
    };
    handleCloseSaveDashboard = () => {
        this.setState({modals: {saveDashboard: false}})
    };
    handleShowLoadDashboard = () => {
        this.setState({modals: {loadDashboard: true}})
    };
    handleCloseLoadDashboard = () => {
        this.setState({modals: {loadDashboard: false}})
    };

    render() {
        return (
            <div>

                <CustomNavbar
                    showCreateCell={this.handleShowCreateCell}
                    showExistingCell={this.handleShowSearchCells}
                    clearDashboard={this.clearDashboardLayout}
                    showSaveDashboard={this.handleShowSaveDashboard}
                    showLoadDashboard={this.handleShowLoadDashboard}/>
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
                    <CreateCellForm
                        addCell={this.addCell}
                        done={this.handleCloseCreateCell}
                        addID = {this.addID}/>
                </BootstrapModal>
                <BootstrapModal
                    title="Sök Widgets"
                    show={this.state.modals.searchCells}
                    close={this.handleCloseSearchCells}>
                    <SearchCells addCell={this.addCell} done={this.handleCloseSearchCells} />
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
                <BootstrapModal
                    title='Spara Dashboard'
                    show={this.state.modals.saveDashboard}
                    close={this.handleCloseSaveDashboard}>
                    <SaveDashboard
                        getAllCells={this.getAllCells}
                        handleCloseSaveDashboardSuccess={this.handleCloseSaveDashboardSuccess}/>
                </BootstrapModal>
                <BootstrapModal
                    title='Sök Dashboard'
                    show={this.state.modals.loadDashboard}
                    close={this.handleCloseLoadDashboard}>
                    <SearchDashboard
                        addDashboard={this.addDashboard}/>
                </BootstrapModal>
                 <Footer/>
            </div>
        );
    }
}

function saveToLocalStorage(key, value) {
    if (global.localStorage) {
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
    return localStorageItem;
}

export default App;
