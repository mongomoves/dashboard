import React, { Component } from 'react';


class StepByStep extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            toggleValue: false,
            toggleEdit: false,
            togglePublish: false
        }
    }

    togglePublishHandler = () => {
        this.setState({togglePublish: !this.state.togglePublish});
        console.log("HEJ")
    }

    render() {
        return (
            <div>
                <li className="liBold">3. Steg för steg</li>
                    <p>
                        Här ges ett flertal exempel på hur man kommer igång med sin Dashboard samt håller den uppdaterad. 
                        <li>Skapa en widget med typen "Värde".</li>
                        <li>Redigera widget</li>
                        <li><a href="#" onClick={this.togglePublishHandler}>Publicera widget</a></li>
                    
                    </p>
                    <p>
                        För att kunna skapa en widget börjar man med att trycka på navigationsfältets kugghjul till höger.
                    </p>
                    <img src="https://i.imgur.com/tbtPqDK.png" alt="Create Widget"/>
                        <ul>
                            <li>3.1 Välj Widget-typ. Här kan man välja mellan tre olika typer. Värde, diagram och text.</li>
                            <li>3.2 Ange titel (Titeln är även parametern som anges när man vill ladda widgets)</li>
                            <li>3.3 Värde (Antingen detta eller Datakälla)</li>
                            <li>3.4 Datakälla (Antingen detta eller Värde)</li>
                            <li>3.5 Den data man vill hämta ut från datakällan ovanför anges genom att ange de data-attribut som inehåller detta. Detta är </li>
                            <li>3.6 Följade steg är att ange Uppdateringsfrekvens i antal minuter. Detta innebär att datan hämtas om på nytt vid varje angivet tidsintervall.</li>
                            <li>3.7 Ange enheten som förklarar ovanstående data. Exepmpel år / tid / antal anställda.</li>
                            <li>3.8 Sista steget när man skapar en widget är att kryssa i om man vill få sin widget <u>publicerad</u>.</li>
                        </ul>
            </div>
        );
    }
}

export default StepByStep;