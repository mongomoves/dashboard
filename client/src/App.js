import React, { Component } from 'react';
import Dashboard from "./components/dashboard";
<<<<<<< HEAD
import Widget from "./components/widget";
import Cell from './components/cell/cell';
import ValueDisplay from "./components/valuedisplay";
import MyFirstGrid from './components/cell/CellGrid';

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
=======
// import Widget from "./components/widget";
// import ValueDisplay from "./components/valuedisplay";
// import Cell from './components/cell/cell';
// import 'react-grid-layout/css/styles.css'
// import 'react-resizable/css/styles.css'
>>>>>>> 8f72354b9d8dba5f0c2395616de8a6df462a97a9


//"Cells" to pass to the dashboard
const cells = [
    {i: 'a', x: 0, y: 0, w: 1, h: 2, title: 'Hello'},
    {i: 'b', x: 1, y: 0, w: 3, h: 2, title: 'World'},
    {i: 'c', x: 4, y: 0, w: 1, h: 2, title: '!!!'}
  ];

class App extends Component {
    render() {
        return (
<<<<<<< HEAD
            <Cell title = "A new widget" creator = "John" dataURL = "https://snapshot.raintank.io/dashboard-solo/snapshot/y7zwi2bZ7FcoTlB93WN7yWO4aMiz3pZb?from=1493369923321&to=1493377123321&panelId=4"></Cell>
=======
           <Dashboard layout={cells}/>
>>>>>>> 8f72354b9d8dba5f0c2395616de8a6df462a97a9
        );
    }
}

export default App;

