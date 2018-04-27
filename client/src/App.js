import React, { Component } from 'react';
import Dashboard from "./components/dashboard";
import Widget from "./components/widget";
import ValueDisplay from "./components/valuedisplay";
import MyFirstGrid from './components/cell/CellGrid';
import Cell from './components/cell/Cell';
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'


const styles = {

};

class App extends Component {
    render() {
        return (
           <MyFirstGrid></MyFirstGrid>
        );
    }
}

export default App;

