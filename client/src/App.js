import React, { Component } from 'react';
import Dashboard from "./components/dashboard";
import Widget from "./components/widget";
import ValueDisplay from "./components/valuedisplay";
import MyFirstGrid from './components/cell/CellGrid';
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'


const styles = {

};

class App extends Component {
    render() {
        return (
            <div>
               <MyFirstGrid></MyFirstGrid>
            </div>
        );
    }
}

export default App;

