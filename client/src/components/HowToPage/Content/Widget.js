import React, { Component } from 'react';

/**
 * Shows some basic information about the different kinds of
 * widget and what they are capable of.
 */
class Widget extends Component {
    render() {
        return (
            <div className="Divider">
                <h4 className="h4Bold">Widgets</h4>
                <p>
                    Widgets utgör grunden för Dashboarden. Alla skapas av användare. 
                    Det finns just nu tre olika typer av widgets: <u>Diagram</u>, <u>Värde</u> och <u>Text</u>.
                    Vid användande av datakälla eller inbäddad data kan en uppdateringsfrekvens i minuter specificeras.
                    När datakälla används för Text- eller Värde-widget och ett attribut anges, ska detta attribut skrivas i format som stöds 
                    av <a target="_blank" rel="noopener noreferrer" href="https://www.npmjs.com/package/json-query">JSON query</a>. (T.ex. vanlig punktnotation.)
                </p>
                <h5 className="h5Bold">Diagram:</h5>
                <p>
                    Någon form av inbäddat material som hämtas via URL. Visas antingen i form av iframe- eller img-tagg.
                    Om iframe används kommer det finnas en Uppdatera-knapp i widgetens meny som kan hämta om innehållet
                    om storleken på widgeten ändras, om det behövs.
                </p>
                <h5 className="h5Bold">Värde & Text:</h5>
                <p>
                    Data för dessa två typer visas genom att antingen mata in den statiskt eller hämta den från valfritt API 
                    som returnerar JSON.
                    Text-widget har stöd att visa arrayer som hämtas via API. Värde-widget visar bara ett värde, och stödjer
                    bara siffror utöver enheten.
                </p>
                <br/>
                <h4 className="h4Bold">Publicering</h4>
                <p>
                    Alla widgets går att publicera till databasen så att andra kan hämta dem till sin egen dashboard.
                    Detta sker antingen vid skapandet eller redigeringen av en widget. Redigeras en publicerad widget skapas 
                    det en ny på dashboarden, för att visa att den publicerade widgeten inte har redigerats.
                </p>
                <br/>
            </div>
        );
    }
}

export default Widget;