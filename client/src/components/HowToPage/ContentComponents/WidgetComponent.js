import React, { Component } from 'react';

//Component that renders content on the how to page.

class Widget extends Component {
    render() {
        return (
            <div>
                <li className="liBold">2. Widgets</li>
                <p>
                    Widgets utgör grunden för Dashboarden. Varje widget har en XX beroende på var datan till widgeten hämtas in.
                    Alla widgets placering och storlek kan ändras av användaren.
                    De olika delar som utgör en widget är en rubrikkomponent som innehåller en titel som användare angivit vid skapandet samt en config knapp. Config knappen låter användaren redigera information, visa information om widgeten, t.ex. om vem som skapat den och slutligen ta bort en widget. 
                    Widgeten har också en body där innehållet för varje widget visas.  
                    Det finns just nu tre olika typer av widgets: <u>Diagram</u>, <u>värde</u> och <u>text</u>. Samtliga av dessa har en möjlighet att få individuellt anpassade uppdateringsfrekvenser.
                </p>
            </div>
        );
    }
}

export default Widget;