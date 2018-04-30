import React, { Component } from 'react';
import Dashboard from "./components/dashboard";
import Widget from "./components/widget";
import Cell from './components/cell/cell';
import ValueDisplay from "./components/valuedisplay";
import MyFirstGrid from './components/cell/CellGrid';

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'


//"Cells" to pass to the dashboard
const cells = [
    {i: 'a', x: 0, y: 0, w: 20, h: 2},
    {i: 'b', x: 1, y: 0, w: 3, h: 2},
    {i: 'c', x: 4, y: 0, w: 1, h: 2}
  ];

class App extends Component {
    render() {
        return (
        <div>
            <Dashboard layout = {cells}/>
        </div>);
       
    };
}

export default App;

//<Cell title = "A new widget" creator = "John" dataURL = "https://snapshot.raintank.io/dashboard-solo/snapshot/y7zwi2bZ7FcoTlB93WN7yWO4aMiz3pZb?from=1493369923321&to=1493377123321&panelId=4"></Cell>
//<Cell title = "A new widget" creator = "John" dataURL = "https://snapshot.raintank.io/dashboard-solo/snapshot/y7zwi2bZ7FcoTlB93WN7yWO4aMiz3pZb?from=1493369923321&to=1493377123321&panelId=4"></Cell>