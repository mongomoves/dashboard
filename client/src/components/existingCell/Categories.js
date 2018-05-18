import React from 'react';
import { ButtonGroup,Button } from 'react-bootstrap';

class Categoeies extends React.Component {
  

  render() {
    return (

    <ButtonGroup bsSize="large" vertical>
        <Button onClick={this.props.triggerGraphCellUpdate}>Grafer</Button>
        <Button onClick={this.props.triggerTextCellUpdate}>Text</Button>
        <Button onClick={this.props.triggerNumberCellUpdate}>Siffror</Button>
        <Button onClick={this.props.triggerChartCellUpdate}>Tabeller</Button>
      </ButtonGroup>

    )}
  }
  export default Categoeies;
