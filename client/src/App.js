import React, { Component } from 'react';
import CustomNavbar from "./components/customnavbar/CustomNavbar";
import Dashboard from "./components/dashboard/Dashboard";
import CreateCellForm from "./components/CreateCell/CreateCellForm";
import EditCellForm from "./components/CreateCell/EditCellForm";
import SearchCells from './components/SearchCells/SearchCells';
import CellInfo from './components/Cells/CellInfo';
import BootstrapModal from './components/Modal/BootstrapModal';
import ClearPromptForm from './components/ClearPromptForm/ClearPromptForm';
import SaveDashboard from "./components/SaveDashboard/SaveDashboard";
import SearchDashboard from "./components/SearchDashboard/SearchDashboard";
import ActivityItems from "./components/activityLog/ActivityItems";
import {saveToLocalStorage, loadFromLocalStorage} from "./utils/LocalStorage";
import _ from 'lodash';

import './App.css';
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import {WIDGET_KIND} from './Constants';

const WIDGET_SIZE = {
    GRAPH_W: 3,
    GRAPH_H: 4,
    VALUE_AND_TEXT_W: 2,
    VALUE_AND_TEXT_H: 2
};

const KEY_LS_CELLS = 'cells';

const localStorageCells = loadFromLocalStorage(KEY_LS_CELLS) || [];

//Used to show info about Cell
let cellInfoData = {};
//Used to show values when editing Cell
let editValues = {};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            layout: [],
            cells: JSON.parse(JSON.stringify(localStorageCells))
                .sort(function (a, b) {
                return a.layout.i - b.layout.i;
            }),
            modals: {
                createCell: false,
                editCell: false,
                searchCells: false,
                cellInfo: false,
                saveDashboard: false,
                clearDashboard: false,
                searchDashboards: false,
                activityLog: false
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

        if (cell.kind === WIDGET_KIND.VALUE || cell.kind === WIDGET_KIND.TEXT) {
            w = WIDGET_SIZE.VALUE_AND_TEXT_W;
            h = WIDGET_SIZE.VALUE_AND_TEXT_H;
            minW = w;
            minH = h;
        }
        else if (cell.kind === WIDGET_KIND.GRAPH) {
            w = WIDGET_SIZE.GRAPH_W;
            h = WIDGET_SIZE.GRAPH_H;
            minW = w;
            minH = h;
        }

        const [x, y] = this.findEmptyPosition(w, h);

        const layout = {
            i: this.state.idCounter,
            x: x,
            y: y,
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

    /**
     * Replaces the cell at the index in state.cell with the
     * cell passed as a parameter.
     * @param {object} cell New cell to put in state
     * @param {number} index Index of cell to replace
     */
    editCell = (cell, index) => {
        let edited = Object.assign([], this.state.cells);
        edited[index].content = cell;
        this.setState({cells: edited});

        saveToLocalStorage(KEY_LS_CELLS, edited);
    };

    /**
     * Removes the passed index from state.cells, effectively removing
     * the widget from the dashboard as well.
     * @param {number} i Index of cell in state.cell to remove
     */
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
                cells[i].content.created = data.created;
            }
        }
        this.setState({cells: cells});
        saveToLocalStorage(KEY_LS_CELLS, this.state.cells);
    };

    getAllCells = () => {
        return this.state.cells;
    };

    addDashboard = (dashboards) => {
        let sortedDashboards = dashboards.sort(function (a, b) {
            return a.layout.i - b.layout.i;
        });

        const newIdCounter = sortedDashboards.length > 0
            ? Number(sortedDashboards[sortedDashboards.length - 1].layout.i) + 1
            : 0;

        this.setState({
            layout: [],
            cells: sortedDashboards,
            idCounter: newIdCounter
        });

        saveToLocalStorage(KEY_LS_CELLS, this.state.cells);
    };

    clearDashboardLayout = () => {
        this.setState({
            layout: [],
            cells: [],
            idCounter: 0
        });

        saveToLocalStorage(KEY_LS_CELLS, this.state.cells);
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
        let cells = Object.assign([], this.state.cells);

        for (let i = 0; i < this.state.cells.length && i < sortedLayout.length; i++) {
            cells[i].layout = sortedLayout[i];
        }

        this.setState({
            layout: layout,
            cells: cells
        });

        saveToLocalStorage(KEY_LS_CELLS, this.state.cells);
    };

    setDefaultSearchCells = (search) => {
        console.log("setdeafultSearchCell")
        this.handleShowModal('searchCells');
        this.setState({defaultSearchCells: search});
    };

    setDefaultSearchDashboards = (search) => {
        console.log("setdeafultSearchDashboard")
        this.handleShowModal('searchDashboards');
        this.setState({defaultSearchDashboards: search})
    };

    handleShowModal = (modal) => {
        this.setState({modals: {[modal]: true}})
    };

    handleCloseModal = (modal) => {
        this.setState({modals: {[modal]: false}})
    };

    handleCloseSearchCells = () => {
        this.setState({
            modals: {searchCells: false},
            defaultSearchCells: null
        });
    };

    handleCloseSearchDashboards = () => {
        this.setState({
            modals: {searchDashboards: false},
            defaultSearchDashboards: null
        });
    };

    handleShowCellInfo = (i) => {
        this.setState({modals: {cellInfo: true}});
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

    /**
     * Called when the user wants to edit the contents of a widget.
     * Index of the cell in state.cell determines which cell to edit.
     * Opens a modal and gathers the data for the prop already passed.
     * @param {number} i Index of cell to edit
     */
    handleShowEditCell = (i) => {
        this.setState({modals: {editCell: true}});
        this.state.cells.some(function(e, index) {
            if(e.layout.i === i) {
                if(e.content.kind === WIDGET_KIND.VALUE) {
                    editValues = {
                        index: index,
                        creator: e.content.creator,
                        kind: WIDGET_KIND.VALUE,
                        title: e.content.title,
                        number: e.content.number,
                        unit: e.content.unit,
                        dataSource: e.content.dataSource,
                        attribute: e.content.attribute,
                        refreshRate: e.content.refreshRate
                    }
                } else if (e.content.kind === WIDGET_KIND.GRAPH) {
                    editValues = {
                        index: index,
                        creator: e.content.creator,
                        kind: WIDGET_KIND.GRAPH,
                        title: e.content.title,
                        graphUrl: e.content.graphUrl,
                        displayType: e.content.displayType,
                        refreshRate: e.content.refreshRate
                    }
                } else if (e.content.kind === WIDGET_KIND.TEXT) {
                    editValues = {
                        index: index,
                        creator: e.content.creator,
                        kind: WIDGET_KIND.TEXT,
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

    render() {
        return (
            <div>
                <CustomNavbar
                    showCreateCell={() => this.handleShowModal('createCell')}
                    showExistingCell={() => this.handleShowModal('searchCells')}
                    clearDashboard={() => this.handleShowModal('clearDashboard')}
                    showSaveDashboard={() => this.handleShowModal('saveDashboard')}
                    showLoadDashboard={() => this.handleShowModal('searchDashboards')}
                    showActivityLog={() => this.handleShowModal('activityLog')}/>
                <Dashboard
                    removeCell={this.removeCell}
                    showInfo={this.handleShowCellInfo}
                    editCell={this.handleShowEditCell}
                    layout={this.state.layout}
                    cells={this.state.cells}
                    onLayoutChange={this.onLayoutChange}/>
                <BootstrapModal
                    title="Ta bort Dashboard"
                    show={this.state.modals.clearDashboard}
                    close={() => this.handleCloseModal('clearDashboard')}>
                        <ClearPromptForm
                            clear={this.clearDashboardLayout}
                            done={() => this.handleCloseModal('clearDashboard')}/>
                </BootstrapModal>
                <BootstrapModal
                    title="Skapa widget"
                    show={this.state.modals.createCell}
                    close={() => this.handleCloseModal('createCell')}>
                    <CreateCellForm
                        addCell={this.addCell}
                        done={() => this.handleCloseModal('createCell')}
                        addID={this.addID}/>
                </BootstrapModal>
                <BootstrapModal
                    title="Sök Widgets"
                    show={this.state.modals.searchCells}
                    close={this.handleCloseSearchCells}>
                    <SearchCells
                        addCell={this.addCell}
                        defaultSearch={this.state.defaultSearchCells}/>
                </BootstrapModal>
                <BootstrapModal
                    title={cellInfoData.title}
                    show={this.state.modals.cellInfo}
                    close={() => this.handleCloseModal('cellInfo')}>
                    <CellInfo cell={cellInfoData}/>
                </BootstrapModal>
                <BootstrapModal
                    title='Redigera widget'
                    show={this.state.modals.editCell}
                    close={() => this.handleCloseModal('editCell')}>
                    <EditCellForm
                        values={editValues}
                        addCell={this.addCell}
                        editCell={this.editCell}
                        addID={this.addID}
                        done={() => this.handleCloseModal('editCell')}/>
                </BootstrapModal>
                <BootstrapModal
                    title='Spara Dashboard'
                    show={this.state.modals.saveDashboard}
                    close={() => this.handleCloseModal('saveDashboard')}>
                    <SaveDashboard
                        getAllCells={this.getAllCells}
                        handleCloseSaveDashboardSuccess={() => this.handleCloseModal('saveDashboard')}/>
                </BootstrapModal>
                <BootstrapModal
                    title='Sök Dashboard'
                    show={this.state.modals.searchDashboards}
                    close={this.handleCloseSearchDashboards}>
                    <SearchDashboard
                        addDashboard={this.addDashboard}
                        defaultSearch={this.state.defaultSearchDashboards}/>
                </BootstrapModal>
                <BootstrapModal
                    title="Aktivitetslogg"
                    show={this.state.modals.activityLog}
                    close={() => this.handleCloseModal('activityLog')}>
                    <ActivityItems
                        onLogWidgetClick={this.setDefaultSearchCells}
                        onLogDashboardClick={this.setDefaultSearchDashboards}
                        done={() => this.handleCloseModal('activityLog')}/>  
                </BootstrapModal>
            </div>
        );
    }
}

export default App;
