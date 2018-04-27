import React, { Component } from 'react';
import Cell from './Cell.js'
import './cell.css';
import GridLayout from 'react-grid-layout';



class MyFirstGrid extends React.Component {
    render() {
        // layout is an array of objects, see the demo for more complete usage
        var layout = [
            { i: 'a', x: 0, y: 0, w: 1, h: 2 },
            { i: 'b', x: 1, y: 0, w: 3, h: 2 },
            { i: 'c', x: 1, y: 0, w: 3, h: 2 }

            //kanske vi skall ha x y w h i state hos cellen? 

        ];
        return (
            <GridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
                <div className="rez" key="a">a <Cell></Cell></div>
                <div className="rez" key="b">b</div>
                <div className="rez" key="c">c</div>

            </GridLayout>
        )
    }
}

export default MyFirstGrid;






