import React, { Component } from 'react';

import { Button } from 'react-bootstrap';
import './CreateCell.css';

class CreateCell extends Component {

    state = {
        buttonClass: 'primary'
    }

    changeColorHandler = () => {
        this.setState({buttonClass: 'success'});
    }

    render() {
        return (
            <div>
                <h3 className="createHeader">Skapa en ny {this.props.widgetType} widget!</h3>
                <div className="wrapper">
                {/* <Button onClick={this.changeColorHandler} className="buttons" bsStyle={this.state.buttonClass} >Siffra</Button>
                <Button className="buttons">Text</Button>
                <Button className="buttons">Graf</Button><Button className="buttons">Tabell</Button> */}
                </div>
                <form>
                    <label>Titel:</label><input className="textField" type="text" name="titel" />
                    
                    <label>Datakälla/URL:</label><input className="textField" type="url" name="data-source" />
                    
                    <label>Beskrivning:</label><input className="textField" type="text" name="descr" />
                    
                    <label>Värde:</label><input className="textField" type="text" name="value" />
                    
                    <label>Enhet:</label><input className="textField" type="text" name="unit" />

                    <label>Skapare:</label><input className="textField" type="text" name="author" />
                    
                </form>
            </div>
         );
    }
    
}

export default CreateCell;