import React, {  Component} from 'react';
import Categories from './Categories';
import {Button} from 'react-bootstrap';
import SearchBar from './SearchBar';
import TextCellTest from './TextCellTest';
import GraphCellTest from './GraphCellTest';
import ChartCellTest from './ChartCellTest';
import NumberCellTest from './NumberCellTest';
class SelectExistingCell extends React.Component {

  constructor(){
    super();
    this.handleGraphCellClick = this.handleGraphCellClick.bind(this);
    this.handleTextCellClick = this.handleTextCellClick.bind(this);
    this.handleNumberCellClick = this.handleNumberCellClick.bind(this);
    this.handleChartCellClick = this.handleChartCellClick.bind(this);

    this.state= {
      graphCell: false,
      textCell: false,
      numberCell: false,
      chartCell: false,
    }
  }

  handleGraphCellClick(){
    this.setState({graphCell:true, textCell:false, numberCell: false, chartCell: false});
  }

  handleTextCellClick(){
    this.setState({graphCell:false, textCell:true, numberCell: false, chartCell: false});
  }
  handleNumberCellClick(){
    this.setState({graphCell:false, textCell:false, numberCell: true, chartCell: false});
  }
  handleChartCellClick(){
    this.setState({graphCell:false, textCell:false, numberCell: false, chartCell: true});
  }

  SelectForm() {
    if(this.state.graphCell){
      return <GraphCellTest/>
    }
    if(this.state.textCell){
      return <TextCellTest/>
    }
    if(this.state.numberCell){
      return <NumberCellTest/>
    }
    if(this.state.chartCell){
      return <ChartCellTest/>
    }
  }
  render() {
    return (

      <div>
        <SearchBar />
        <Categories triggerGraphCellUpdate={this.handleGraphCellClick}
          triggerTextCellUpdate={this.handleTextCellClick}
          triggerNumberCellUpdate={this.handleNumberCellClick}
          triggerChartCellUpdate={this.handleChartCellClick}
          />
        {this.SelectForm()}
      </div>
    );

  }
}


export default SelectExistingCell;
