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
        {i: 'a', x: 0, y: 0, w: 6, h: 8},
        {i: 'b', x: 1, y: 0, w: 3, h: 8},
        {i: 'c', x: 4, y: 0, w: 4, h: 10}
    ],
    cells: [
        {i: 'a', title: 'Test1', iframe: 'Iframe1', desc: 'Desc1'},
        {i: 'b', title: 'Test2', iframe: 'Iframe2', desc: 'Desc2'},
        {i: 'c', title: 'Test3', iframe: 'Iframe3', desc: 'Desc3'},
    ]
};


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
            if(changedLayout) {
                this.setState(prevState => ({
                    layout: changedLayout
                }));
        }
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

            <CustomNavbar/>
            <Dashboard  
                  onLayoutChanged={this.onLayoutChanged}
                  data={{layout: this.state.layout, cells: this.state.cells}}
            />
            <Modal show={this.state.modal} modalClosed={this.modalCancelHandler}>
                    <CreateCell widgetType="Kibana/Grafana" />
                </Modal>
                <Button bsStyle="primary" onClick={this.modalShowHandler}>Skapa ny widget</Button>

            </div>
        );
    
}

};

export default App;

