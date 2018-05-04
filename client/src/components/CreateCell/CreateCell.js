import React, { Component } from 'react';

import { Button } from 'react-bootstrap';
import './CreateCell.css';

class CreateCell extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            dataSource: '',
            descr: '',
            value: '',
            unit: '',
            author: '',
            dateTime: ''
        }
    }

    
    //Changes the title state to the input in the "Title" input box.
    handleTitleChange = (e) => {
        this.setState({title: e.target.value})
    }
    //Changes the dataSource state to the input in the "Datakälla/URL" input box.
    handleDataSourceChange = (e) => {
        this.setState({dataSource: e.target.value})
    }
    //Changes the descr state to the input in the "Beskrivning" input box.
    handleDescrChange = (e) => {
        this.setState({descr: e.target.value})
    }
    //Changes the value state to the input in the "Värde" input box.
    handleValueChange = (e) => {
        this.setState({value: e.target.value})
    }
    //Changes the title state to the input in the "Enhet" input box.
    handleUnitChange = (e) => {
        this.setState({unit: e.target.value})
    }
    //Changes the author state to the input in the "Skapare" input box.
    handleAuthorChange = (e) => {
        this.setState({author: e.target.value})
    }
    //Changes the dateTime state to the input in the "Datum" input box.
    handleDateTimeChange = (e) => {
        this.setState({dateTime: e.target.value})
    }
    //Clears the state when the submit button is clicked.
    handleClearState = () => {

        this.props.addCell({i: "d", title: "Test4", iframe : "Iframe4", desc: "x"})
        
        this.setState({
            title: '',
            dataSource: '',
            descr: '',
            value: '',
            unit: '',
            author: '',
            dateTime: ''
        })
    }
 
    render() {
        return (
            <div>
                <h3 className="createHeader">Skapa en ny {this.props.widgetType} widget!</h3>
                <form>
                    <label>Titel:</label><input className="textField" type="text" name="title" value={this.state.title} onChange={this.handleTitleChange} placeholder="Ange titel på widget..." />
                    
                    <label>Datakälla/URL:</label><input className="textField" type="url" name="dataSource" value={this.state.dataSource} onChange={this.handleDataSourceChange} placeholder="Ange datakälla/URL..." />
                    
                    <label>Beskrivning:</label><input className="textField" type="text" name="descr" value={this.state.descr} onChange={this.handleDescrChange} placeholder="Ange beskrivning på widget..." />
                    
                    <label>Värde:</label><input className="textField" type="text" name="value" value={this.state.value} onChange={this.handleValueChange} placeholder="Ange värde..." />
                    
                    <label>Enhet:</label><input className="textField" type="text" name="unit" value={this.state.unit} onChange={this.handleUnitChange} placeholder="Ange enhet på widget..." />

                    <label>Skapare:</label><input className="textField" type="text" name="author" value={this.state.author} onChange={this.handleAuthorChange} placeholder="Ange Namn på Skapare..." />

                    <label>Datum:</label><input className="textField" type="text" name="dateTime" value={this.state.dateTime} onChange={this.handleDateTimeChange} placeholder="Ange Datum..." />
                    <label>Välj typ:</label>
                    <select>
                        <option>Välj typ</option>
                        <option value="siffra">Siffra</option>
                        <option value="text">Text</option>
                        <option value="graf">Graf</option>
                        <option value="tabell">Tabell</option>
                    </select>

                    <Button className="buttons" 
                        disabled={
                            !this.state.title || 
                            !this.state.dataSource ||
                            !this.state.descr ||
                            !this.state.value ||
                            !this.state.unit ||
                            !this.state.author ||
                            !this.state.dateTime
                        } 
                        bsStyle="success"
                        onClick={this.handleClearState}
                    
                    >Skapa Widget</Button>

                </form>
            </div>
         );
    }
    
}

export default CreateCell;