import React, { Component } from 'react';
import { PageHeader} from 'react-bootstrap';
import "./Article.css";


class Article extends Component {
    constructor(props){
        super(props);
        this.state = {
            toggleKoncept: true,
            toggleStepByStep: true,
            toggleWidget: true
        }
    }

    toggleKonceptHandler = () => {
        this.setState({toggleKoncept: !this.state.toggleKoncept});
    }

    toggleStepByStepHandler = () => {
        this.setState({toggleStepByStep: !this.state.toggleStepByStep});
    }

    toggleWidgetHandler = () => {
        this.setState({toggleWidget: !this.state.toggleWidget})
    }

    render() {
        return (
            <div className="Article">
                <PageHeader>
                    Dashboard <small> Grundläggande funktionalitet</small>
                </PageHeader>
                <ul>
                    <li className="liBold">1. Koncept</li>
                    <p>
                        Denna sida är till för att du ska kunna komma igång och bekanta dig med Dashboarden. 
                        Under fliken Widgets beskrivs de olika celler man kan skapa och hur det är anpassningsbara. 
                        Under fliken Steg för steg kommer ett exempel på hur man skapar en widget att visas. Här kan man även läsa mer om de tre olika widget typer som finns att välja mellan.
                    </p>
                    <p> 

                    </p>
                    <li className="liBold">2. Widgets</li>
                    <p>
                        Widgets utgör grunden för Dashboarden. Varje widget har en XX beroende på var datan till widgeten hämtas in.
                        Alla widgets placering och storlek kan ändras av användaren.
                        De olika delar som utgör en widget är en rubrikkomponent som innehåller en titel som användare angivit vid skapandet samt en config knapp. Config knappen låter användaren redigera information, visa information om widgeten, t.ex. om vem som skapat den och slutligen ta bort en widget. 
                        Widgeten har också en body där innehållet för varje widget visas.  
                        Det finns just nu tre olika typer av widgets: <u>Diagram</u>, <u>värde</u> och <u>text</u>. Samtliga av dessa har en möjlighet att få individuellt anpassade uppdateringsfrekvenser.
                    </p>
                    <li className="liBold">3. Steg för steg</li>
                    <p>Här ges ett exempel på hur man skapar en widget med typen "Värde".</p>
                    <img src="https://i.imgur.com/tbtPqDK.png" alt="Create Widget"/>
                        <ul>
                            <li>3.1 Välj Widget-typ</li>
                            <li>3.2 Ange titel (Titeln är även parametern som anges när man vill ladda widgets)</li>
                            <li>3.3 Värde (Antingen detta eller Datakälla)</li>
                            <li>3.4 Datakälla (Antingen detta eller Värde)</li>
                            <li>3.5 Den data man vill hämta ut från datakällan ovanför anges genom att ange de data-attribut som inehåller detta. Detta är </li>
                            <li>3.6 Följade steg är att ange Uppdateringsfrekvens i antal minuter. Detta innebär att datan hämtas om på nytt vid varje angivet tidsintervall.</li>
                            <li>3.7 Ange enheten som förklarar ovanstående data. Exepmpel år / tid / antal anställda.</li>
                            <li>3.8 Sista steget när man skapar en widget är att kryssa i om man vill få sin widget <u>publicerad</u>.</li>
                        </ul>
                    <li className="liBold">4. Datakällor</li>
                        <p> En datakälla är ett API som returnerar värde baserat på angivna parametrar. Dessa parametrar kan vara t.ex. år, title och typ. </p>
                                                            
                </ul>


                {this.props.children[0]}
                {this.props.children[1]}
                {this.props.children[2]}

            </div>
        );
    }
}

export default Article;