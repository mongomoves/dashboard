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
                    <label>Titel:</label><input className="textField" type="text" name="titel" placeholder="Ange titel på widget..." />
                    
                    <label>Datakälla/URL:</label><input className="textField" type="url" name="data-source" placeholder="Ange datakälla/URL..." />
                    
                    <label>Beskrivning:</label><input className="textField" type="text" name="descr" placeholder="Ange beskrivning på widget..." />
                    
                    <label>Värde:</label><input className="textField" type="text" name="value" placeholder="Ange värde..." />
                    
                    <label>Enhet:</label><input className="textField" type="text" name="unit" placeholder="Ange enhet på widget..." />

                    <label>Skapare:</label><input className="textField" type="text" name="author" placeholder="Ange Namn på Skapare..." />

                    <label>Datum:</label><input className="textField" type="text" name="date-time" placeholder="Ange Datum..." />

                    <Button className="buttons" bsStyle={this.state.buttonClass}>Skapa Widget</Button>
                    
                </form>
            </div>
         );
    }
    
}

export default CreateCell;