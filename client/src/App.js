import React, { Component } from 'react';
import Dashboard from "./components/dashboard";
// import Widget from "./components/widget";
// import ValueDisplay from "./components/valuedisplay";
// import Cell from './components/cell/cell';
// import 'react-grid-layout/css/styles.css'
// import 'react-resizable/css/styles.css'


//"Cells" to pass to the dashboard
const cells = [
    {i: 'a', x: 0, y: 0, w: 1, h: 2, title: 'Hello'},
    {i: 'b', x: 1, y: 0, w: 3, h: 2, title: 'World'},
    {i: 'c', x: 4, y: 0, w: 1, h: 2, title: '!!!'}
  ];

class App extends Component {
    render() {
        return (
           <Dashboard layout={cells}/>
        );
    }
}

export default App;

