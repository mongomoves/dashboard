import React, { Component } from 'react';
import Dashboard from "./components/dashboard/dashboard";
import CreateCell from "./components/CreateCell/CreateCell";
import Modal from './components/Modal/Modal';
import Widget from "./components/widget";
import Cell from './components/cell/cell';
import ValueDisplay from "./components/valuedisplay";
import { Button } from 'react-bootstrap';
import './App.css';
import CustomNavbar from "./components/customnavbar/customnavbar";



import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'




//"Cells" to pass to the dashboard TEST DATA
const data = {
    layout: [


    ],
    cells: [

    ]
};

var cellCount = 0;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //Placeholder state initialisation
            layout: data.layout,
            cells: data.cells,
            modal: false,

        }
        this.onLayoutChanged = this.onLayoutChanged.bind(this);
    }

    /**
     * Callback function. Sets new layout state.
     * @param {*} changedLayout 
     */
    onLayoutChanged(changedLayout) {
        if (changedLayout) {
            this.setState(prevState => ({
                layout: changedLayout
            }));
        }
    }

    //adds a cell to the layout 
    addCell = (cell) => {
        this.setState(prevState => ({
            layout: [...prevState.layout, { i: cellCount, x: 4, y: 6, w: 10, h: 10 }]
        }))

        cell.i = cellCount;

        this.setState(prevState => ({
            cells: [...prevState.cells, cell]
        }))
       
        cellCount++;

    }


    //Hides all modal windows.
    modalCancelHandler = () => {
        this.setState({ modal: false, grafana: false, kibana: false });
    }

    //Shows the modal window with form.
    modalShowHandler = () => {
        this.setState({ modal: true });
    }


    render() {
        return (
            <div>

                <CustomNavbar show={this.modalShowHandler} />
                <Dashboard
                    onLayoutChanged={this.onLayoutChanged}
                    data={{ layout: this.state.layout, cells: this.state.cells }}
                />
                <Modal show={this.state.modal} modalClosed={this.modalCancelHandler}>
                    <CreateCell widgetType="Kibana/Grafana" addCell={this.addCell} />
                </Modal>
                <Button bsStyle="primary" onClick={this.modalShowHandler}>Skapa ny widget</Button>

            </div>
        );

    }

};

export default App;

