import React, { Component } from 'react';
import './cell.css';
import GridLayout from 'react-grid-layout';


class Cell extends Component {
    constructor(props){
        super(props);

        this.state = {
            title : "",
            data : "",
            creator : ""
            
            

        }
    }





// i think we will have the data as its own component 

    render() {
        return (

            <div className="cell">
                <div className="cellTitle">Title: {this.state.title}</div>
                <div className="cellData">Data: {this.state.data}</div>
                <div className="cellCreator">Created by: {this.state.creator}</div>
            </div>
        )

    }




}


//export default Cell;




class MyFirstGrid extends React.Component {
  render() {
    // layout is an array of objects, see the demo for more complete usage
    var layout = [
      {i: 'a', x: 0, y: 0, w: 1, h: 2},
      {i: 'b', x: 1, y: 0, w: 3, h: 2},
      {i: 'c', x: 4, y: 0, w: 1, h: 2}
    ];
    return (
      <GridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
        <div className = "chicken" key="a">a</div>
        <div className = "chicken"key="b">b</div>
        <div className = "chicken"key="c">c</div>
        
      </GridLayout>
    )
  }
}

export default MyFirstGrid;