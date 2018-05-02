import React, { Component } from 'react';
import Dashboard from "./components/dashboard/dashboard";
import CreateCell from "./components/CreateCell/CreateCell";
import Modal from './components/Modal/Modal';
import Widget from "./components/widget";
import ValueDisplay from "./components/valuedisplay";
import { Button } from 'react-bootstrap';
import './App.css';


import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'



   
//"Cells" to pass to the dashboard
const cells = [
    {i: 'a', x: 0, y: 0, w: 1, h: 2},
    {i: 'b', x: 1, y: 0, w: 3, h: 2},
    {i: 'c', x: 4, y: 0, w: 1, h: 2}
  ];

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cells: cells
        }
    }

    state = {
        modal: false,
        grafana: false,
        kibana: false,
       
    }

    modalCancelHandler = () => {
        this.setState({ modal: false, grafana: false, kibana: false });
    }

    modalShowHandler = () => {
        this.setState({ modal: true });
    }

    kibanaShowHandler = () => {
        this.setState({ kibana: true, modal: false });
        
    }

    hideKibanaHandler = () => {
        this.setState({hideKibana: true, modal: false});
    }


    grafanaShowHandler = () => {
        this.setState({ grafana: true, modal: false });
    }
    
    render() {
        return (
            <div>
            <Dashboard layout={this.state.cells}/>
            <Modal show={this.state.modal} modalClosed={this.modalCancelHandler}>
                    <CreateCell widgetType="Kibana/Grafana" />
                </Modal>
                <Button bsStyle="primary" onClick={this.modalShowHandler}>Skapa ny widget</Button>
            </div>
        );
    
}

};

export default App;

