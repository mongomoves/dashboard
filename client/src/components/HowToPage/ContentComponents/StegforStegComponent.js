import React, { Component } from 'react';
import {Glyphicon} from 'react-bootstrap';
import './ContentComponent.css';
import Redigera from '../../../assets/Img/redigera.jpg';
import RedigeraKnapp from '../../../assets/Img/redigeraknapp.jpg';
import Skapa from '../../../assets/Img/skapa.jpg';


// Component that renders the Steg för steg part of the application


class StepByStep extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            toggleValue: true,
            toggleEdit: true,
            togglePublish: true,
        }

    }

    //Toggels the state onClick of toggleValue between display and hide.
    toggleValueHandler = () => {
        this.setState({toggleValue: !this.state.toggleValue});
    }
    //Toggels the state onClick of toggleEdit between display and hide.
    toggleEditHandler = () => {
        this.setState({toggleEdit: !this.state.toggleEdit});
    }
    //Toggels the state onClick of togglePublish between display and hide.
    togglePublishHandler = () => {
        this.setState({togglePublish: !this.state.togglePublish});
        
    }

    render() {
        let imgStyle = {
            paddingBottom: '20px'
        }
        return (
            <div className="Divider">
                <h4 className="h4Bold">Steg för steg</h4>
                    <p>
                        Här ges ett flertal exempel på hur man kommer igång med sin Dashboard samt håller den uppdaterad.
                    </p>
                        <li className="CompSpace"><a onClick={this.toggleValueHandler}>Skapa en widget med typen värde <Glyphicon glyph={this.state.toggleValue ? "chevron-down" : "chevron-up"}/></a></li>                      
                        {!this.state.toggleValue &&
                        <div>
                            <p>
                            För att kunna skapa en widget börjar man med att trycka på navigationsfältets kugghjul till höger.
                        </p>
                        <ul>
                            <li>1. Välj Widget-typ. Här kan man välja mellan tre olika typer. Värde, diagram och text.</li>
                            <li>2. Ange titel (Titeln är även parametern som anges när man vill ladda widgets)</li>
                            <li>3. Värde (Antingen detta eller Datakälla)</li>
                            <li>4. Datakälla (Antingen detta eller Värde)</li>
                            <li>5. Den data man vill hämta ut från datakällan ovanför anges genom att ange de data-attribut som innehåller detta.  </li>
                            <li>6. Följade steg är att ange Uppdateringsfrekvens i antal minuter. Detta innebär att datan hämtas om på nytt vid varje angivet tidsintervall.</li>
                            <li>7. Ange enheten som förklarar ovanstående data. Exepmpel år / tid / antal anställda.</li>
                            <li>8. Sista steget när man skapar en widget är att kryssa i om man vill få sin widget <u>publicerad</u>.</li>
                        </ul>
                        {!this.state.toggleValue && <img style={imgStyle} src={Skapa} alt="Create Widget"/>}
                        </div>
                        }


                        <li className="CompSpace"><a  onClick={this.toggleEditHandler}>Redigera widget <Glyphicon glyph={this.state.toggleEdit ? "chevron-down" : "chevron-up"}/></a></li>
                        {/* https://i.imgur.com/nP5qFYH.png*/}
                        {!this.state.toggleEdit && <img style={imgStyle} src={RedigeraKnapp} alt="Redigera widget"/>}   
                        {!this.state.toggleEdit &&
                        <div>
                            <p>Redigera widget gör man genom att trycka på konfigknappen i widgetens högra hörn.</p>
                            <p>Man får nu möjlighet att redigera information som:</p>
                            <ul className="ListStyle">
                                <li>Titel</li>
                                <li>Värde</li>
                                <li>...beroende på vilken typ av widget man redigerar kan detta innehåll ändras</li>
                            </ul>
                            <p>Samma valideringsregler gäller i redigeringsformuläret som i skapa-formuläret.</p>
                            <p> Te.x man måste alltid ange en titel, om du anger en datakälla så måste man också ange ett data-attribut annars går det inte att skapa eller redigera.</p>
                        </div>
                        }
                        <li className="CompSpace"><a onClick={this.togglePublishHandler}>Publicera widget <Glyphicon glyph={this.state.togglePublish ? "chevron-down" : "chevron-up"}/></a></li>
                        {!this.state.togglePublish &&
                        <div>
                            <p>Man kan publicera en widget på två sätt, antigen genom att klicka i rutan "publicera widget" när man skapar en widget.
                            Eller om man vill göra det vid senare tillfälle, så kan man göra det via redigeraknappen som visas på bilden nedan. i widgetens högra hörn.
                            Genom att publicera en widget gör man den tillgänglig för andra användre att söka upp och återanvända.</p>
                            <p>Om man väljer att publicera en widget så sparas widgeten i databasen.</p>
                            <p>Om man sedan väljer att redigera en publicerad widget så kommer den inte att skrivas över utan blir en ny widget. </p>
                            {!this.state.togglePublish && <img style={imgStyle} src={Redigera} alt="Publicera widget"/>}
                        </div>    
                    }


            </div>
        );
    }
}

export default StepByStep;