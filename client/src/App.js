import React, { Component } from 'react';
import Dashboard from "./components/dashboard/dashboard";
import CreateCell from "./components/CreateCell/CreateCell";
import Modal from './components/Modal/Modal';
import { Button } from 'react-bootstrap';
import './App.css';
import CustomNavbar from "./components/customnavbar/customnavbar";



import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'




//"Cells" to pass to the dashboard TEST DATA
const data = {
    layout: [
        {i: 'a', x: 0, y: 0, w: 2, h: 8},
        {i: 'b', x: 1, y: 0, w: 4, h: 8},
        {i: 'c', x: 4, y: 0, w: 8, h: 6}
    ],
    cells: [
        {i: 'a', title: 'Test1', iframe: 'https://snapshot.raintank.io/dashboard-solo/snapshot/y7zwi2bZ7FcoTlB93WN7yWO4aMiz3pZb?from=1493369923321&to=1493377123321&panelId=4', desc: 'Desc1'},
        {i: 'b', title: 'Test2', iframe: 'https://snapshot.raintank.io/dashboard-solo/snapshot/y7zwi2bZ7FcoTlB93WN7yWO4aMiz3pZb?from=1493369923321&to=1493377123321&panelId=4', desc: 'Desc2'},
        {i: 'c', title: 'Test3', iframe: 'https://snapshot.raintank.io/dashboard-solo/snapshot/y7zwi2bZ7FcoTlB93WN7yWO4aMiz3pZb?from=1493369923321&to=1493377123321&panelId=4', desc: 'Desc3'},
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
            layout: changedLayout,
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

            <CustomNavbar show={this.modalShowHandler} />
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
}

export default App;

