import React, { Component } from 'react';
import Dashboard from "./components/dashboard";
import Widget from "./components/widget";
import ValueDisplay from "./components/valuedisplay";
import './App.css';

import Modal from './components/Modal/Modal';
import CreateCell from './components/CreateCell/CreateCell';
import { Button } from 'react-bootstrap';

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'



class App extends Component {

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
                <Dashboard>
                    <Widget title={"Widget 1"}>
                        <ValueDisplay title={"Dynamic value"} api={"/api/test"} attribute={"value"} />
                    </Widget>

                    <Widget title={"Widget 2"}>
                        <ValueDisplay title={"Dynamic value"} api={"/api/test"} attribute={"anotherValue"} />
                    </Widget>

                    <Widget title={"Widget 3"}>
                        <ValueDisplay title={"Static value"} number={8} />
                    </Widget>
                </Dashboard>

                <Modal show={this.state.modal} modalClosed={this.modalCancelHandler}>
                    <CreateCell widgetType="Kibana/Grafana" />
                </Modal>
                <Button bsStyle="primary" onClick={this.modalShowHandler}>Skapa ny widget</Button>

            </div>
        );
    }
}

export default App;

