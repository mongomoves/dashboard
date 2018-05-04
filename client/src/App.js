import React, { Component } from 'react';
import Dashboard from "./components/dashboard";
import Widget from "./components/widget";
import ValueDisplay from "./components/valuedisplay";
import Cell from './components/cell/cell';
import Footer from './components/footer'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'


const styles = {

};

class App extends Component {
    render() {
        return (
            <div>
               <Footer></Footer>
            </div>
        );
    }
}

export default App;
