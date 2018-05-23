import React, {Component} from 'react';
import './ContentComponent.css';

//Component that renders the content on the how to page.

class Koncept extends Component {
    render() {
        return (
            <div className="Divider">
                <h4 className="h4Bold">Koncept</h4>
                <p>
                    Denna sida är till för att du ska kunna bekanta dig med Dashboarden.  
                    Under fliken Steg för steg till vänster kommer ett antal exempel visas. Dessa är hur man skapar, editerar och publicerar en widget.
                </p> 
                <p> Här kan man även läsa mer om de tre olika widgettyper som finns att välja mellan.
                    Under fliken Widget beskrivs de olika celler man kan skapa och hur det är anpassningsbara.
                </p>
                <p>
                    För att komma igång och skapa ditt Dashboard kan du trycka på Steg för steg-fliken här till vänster.
                    Du börjar alltid med en tom Dashboard.
                </p>
            </div>
        );
    }
}

export default Koncept;