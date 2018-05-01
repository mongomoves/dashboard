import React, { Component } from 'react';
import Dashboard from "./components/dashboard/Dashboard.js";

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

//"Cells" to pass to the dashboard TEST DATA
const data = {
    layout: [
        {i: 'a', x: 0, y: 0, w: 1, h: 2},
        {i: 'b', x: 1, y: 0, w: 1, h: 2},
        {i: 'c', x: 4, y: 0, w: 1, h: 2}
    ],
    cells: [
        {i: 'a', title: 'Test1', iframe: 'Iframe1', desc: 'Desc1'},
        {i: 'b', title: 'Test2', iframe: 'Iframe2', desc: 'Desc2'},
        {i: 'c', title: 'Test3', iframe: 'Iframe3', desc: 'Desc3'},
    ]
};
const localStorageKey = 'dashdata';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //Placeholder state initialisation
            layout: data.layout,
            cells: data.cells
        }
        this.getFromLocalStorage = this.getFromLocalStorage.bind(this);
        this.saveToLocalStorage = this.saveToLocalStorage.bind(this);
        this.onLayoutChanged = this.onLayoutChanged.bind(this);
    }

    /**
     * Lifecycle method. When component is mounted, check for stored
     * layouts.
     */
    componentDidMount() {
        // this.setState(prevState => ({
        //     layout: JSON.parse(getFromLocalStorage())
        // }));
    }

    //Saves all the data to localStorage
    saveToLocalStorage(data) {
        console.log("data to be stored: " + data);
        if(localStorage) {
           localStorage.setItem(localStorageKey, data);
        }
    }
    //Gets all the data from localStorage
    getFromLocalStorage() {
        if(localStorage) {
            return localStorage.getItem(localStorageKey);
        }
        return null;
    }

    /**
     * Callback function. Sets new layout state.
     * @param {*} changedLayout 
     * TODO: Save both layout and cells
     */
    onLayoutChanged(changedLayout) {
        console.log("changedlayout: " + JSON.stringify(changedLayout));
        if(changedLayout) {
            this.setState(prevState => ({
                layout: changedLayout
            }));
            this.saveToLocalStorage(JSON.stringify(this.state.layout));
        }
    }
    
    render() {
        return (
            <div>
                <Dashboard 
                    onLayoutChanged={this.onLayoutChanged}
                    data={{layout: this.state.layout, cells: this.state.cells}}
                />
            </div>
        );
    }
}

export default App;

