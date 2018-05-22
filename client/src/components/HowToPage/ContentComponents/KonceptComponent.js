import React, { Component } from 'react';
import './ContentComponent.css';
import {Glyphicon} from 'react-bootstrap';

//Component that renders the content on the how to page.

class Koncept extends Component {
    render() {
        return (
            <div className="Divider">
                <li className="liBold">Koncept</li>
                <p>
                    Denna sida är till för att du ska kunna bekanta dig med Dashboarden.  
                    Under fliken Steg för steg till vänster kommer ett exempel på hur man skapar en widget att visas. Här kan man även läsa mer om de tre olika widget typer som finns att välja mellan.
                    Under fliken Widget beskrivs de olika celler man kan skapa och hur det är anpassningsbara.
                </p>
                <p>
                    För att komma igång och skapa ditt Dashboard kan du trycka på Steg för steg fliken här till vänster.
                    Du börjar alltid med en tom Dashboard.
                </p>
            </div>
        );
    }
}

export default Koncept;