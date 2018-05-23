import React, { Component } from 'react';

//Component that renders content on the how to page.

class Widget extends Component {
    render() {
        return (
            <div className="Divider">
                <h4 className="h4Bold">Widgets</h4>
                <p>
                    Widgets utgör grunden för Dashboarden. 
                    Alla widgets placering och storlek kan ändras av användaren.
                    De olika delar som utgör en widget är en rubrikkomponent som innehåller en titel som användare angivit vid skapandet samt en config knapp. Config knappen låter användaren redigera information, visa information om widgeten, t.ex. om vem som skapat den och slutligen ta bort en widget. 
                    Widgeten har också en body där innehållet för varje widget visas.  
                    Det finns just nu tre olika typer av widgets: <u>Diagram</u>, <u>värde</u> och <u>text</u>. Samtliga av dessa har en möjlighet att få individuellt anpassade uppdateringsfrekvenser.
                </p>
                <h5 className="h5Bold">Diagram:</h5>
                <p>
                    Diagram hämtas från olika API:er genom att klista in en URL. Exempel på var detta kan vara ifrån är Grafana. 
                </p>
                <h5 className="h5Bold">Värde:</h5>
                <p>
                    Även värde kan inhämtas från API:er där man även då måste ange ett data-attribut. Annars kommer inte URL:en fungera.
                    Man kan även skriva in eget värde utan att ange en URL.
                </p>
                <p> 
                    <text style={{fontWeight: 'bold', textDecoration: 'underline', color:'red'}}>Observera</text> att man inte kan göra båda och, utan bara det ena eller det andra.
                </p>
                <h5 className="h5Bold">Text:</h5>
                <p>
                    Här kan man skriva in fritext. Kanske viktig information för veckan, deadlines osv..
                </p>
                <p>  
                    Detta stöds inte av HTML och Markup.
                </p>
            </div>
        );
    }
}

export default Widget;