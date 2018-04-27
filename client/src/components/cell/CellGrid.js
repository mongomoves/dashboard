import React, { Component } from 'react';
import './cell.css';
import GridLayout from 'react-grid-layout';



class MyFirstGrid extends React.Component {
    render() {
        // layout is an array of objects, see the demo for more complete usage
        var layout = [
            { i: 'a', x: 0, y: 0, w: 1, h: 2 },
            { i: 'b', x: 1, y: 0, w: 3, h: 2 },
            { i: 'c', x: 1, y: 0, w: 3, h: 2 },
            { i: 'd', x: 1, y: 0, w: 3, h: 2 },
            { i: 'e', x: 1, y: 0, w: 3, h: 2 },
            { i: 'f', x: 1, y: 0, w: 3, h: 2 },
            { i: 'g', x: 1, y: 0, w: 3, h: 2 },
            { i: 'h', x: 4, y: 0, w: 1, h: 2 }
        ];
        return (
            <GridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
                <div className = "rez" key="a">a</div>
                <div className = "rez" key="b">b</div>
                <div className = "rez" key="c">c</div>
                <div className = "rez" key="d">e</div>
                <div className = "rez" key="e">f</div>
                <div className = "rez" key="f">g</div>
                <div className = "rez" key="g">h</div>
                <div className = "rez" key="h">i</div>
            </GridLayout>
        )
    }
}
//can be changed to MyFirstGrid
export default MyFirstGrid;






