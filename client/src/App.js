import React, { Component } from 'react';
import Dashboard from "./components/dashboard";
import Widget from "./components/widget";
import ValueDisplay from "./components/valuedisplay";
import CustomNavbar from "./components/customnavbar/customnavbar";

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

const styles = {

};

class App extends Component {
    render() {
        return (
            <div>
                <CustomNavbar></CustomNavbar>
                <Dashboard>
                    <Widget title={"Widget 1"}>
                        <ValueDisplay title={"Dynamic value"} api={"/api/test"} attribute={"value"}/>
                    </Widget>

                    <Widget title={"Widget 2"}>
                        <ValueDisplay title={"Dynamic value"} api={"/api/test"} attribute={"anotherValue"}/>
                    </Widget>

                    <Widget title={"Widget 3"}>
                        <ValueDisplay title={"Static value"} number={8}/>
                    </Widget>
                </Dashboard>

            </div>
        );
    }
}

export default App;

