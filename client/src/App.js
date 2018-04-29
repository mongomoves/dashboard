import React, { Component } from 'react';
import Dashboard from "./components/dashboard";

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
            <Dashboard layout={this.state.cells}/>
        );
    }
}

export default App;

