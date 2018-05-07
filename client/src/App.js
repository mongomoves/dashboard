import React, { Component } from 'react';
import CustomNavbar from "./components/customnavbar/CustomNavbar";
import Dashboard from "./components/dashboard/Dashboard";
import CreateCellForm from "./components/CreateCell/CreateCellForm";
import BootstrapModal from './components/Modal/BootstrapModal';
import './App.css';
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

//"Cells" to pass to the dashboard TEST DATA
const data = {
    cells: []
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //Placeholder state initialisation
            cells: data.cells,
            modals: {
                createCell: false
            },
            idCounter: 0
        };

        this.addCell = this.addCell.bind(this);
        this.handleShowCreateCell = this.handleShowCreateCell.bind(this);
        this.handleCloseCreateCell = this.handleCloseCreateCell.bind(this);
    }

    //adds a cell to the layout 
    addCell(cell) {
        this.setState({
            cells: this.state.cells.concat({
                layout: {
                    i: this.state.idCounter,
                    x: (this.state.cells.length) % (this.state.cols || 12),
                    y: Infinity,
                    w: 1,
                    h: 2,
                    minW: 1,
                    minH: 2
                },
                data: cell
            }),

            idCounter: this.state.idCounter + 1
        });
    };

    handleShowCreateCell = () => {
        this.setState({modals: {createCell: true}})
    };

    handleCloseCreateCell = () => {
        this.setState({modals: {createCell: false}})
    };

    render() {
        return (
            <div>
                <CustomNavbar showCreateCell={this.handleShowCreateCell} />
                <Dashboard cells={this.state.cells}/>
                <BootstrapModal
                    title="Create widget"
                    show={this.state.modals.createCell}
                    close={this.handleCloseCreateCell}>
                    <CreateCellForm addCell={this.addCell} />
                </BootstrapModal>
            </div>
        );
    }
}

export default App;

