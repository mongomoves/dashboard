import React, { Component } from 'react';
import Dashboard from "./components/dashboard";
import Widget from "./components/widget";
import ValueDisplay from "./components/valuedisplay";
import CustomNavbar from "./components/customnavbar/customnavbar";

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
    
    render() {
        return (
            <div>
                <CustomNavbar></CustomNavbar>
                <Dashboard layout={this.state.cells}/>
            </div>

        );
    }
}

export default App;

