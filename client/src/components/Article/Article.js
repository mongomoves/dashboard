import React, { Component } from 'react';
import { PageHeader} from 'react-bootstrap';
import "./Article.css";

class Article extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="Article">
                <PageHeader>
                    Dashboard <small> Grundläggande funktionalitet</small>
                </PageHeader>
                <ul>
                    <li className="liBold">1. Koncept</li>
                    <li className="liBold">2. Steg för steg</li>
                    <img src="https://i.imgur.com/HVEnYOw.jpg" alt="Navbar"/>
                        <ul>
                            <li>2.1 Home button som tar användaren tillbaka till startsidan.</li>
                            <li>2.2 Visar inställningar där man kan editera sin Dashboard.</li>
                            <li>2.3 Skapa cell, här skapar användare sin cell. Detta görs genom att....</li>
                            <li>2.4 Ladda upp redan befintliga celler. Detta innebär att man kan hämta in andra celler skapta av andra personer.</li>
                            <li>2.5 Spara Dashboard innebär att du kan återanvända din Dashboard om du tex vil alternera mellan olika.</li>
                            <li>2.6 Editera Dashboard.</li>
                            <li>2.7 Ladda upp redan befintliga Dashboards.</li>
                            <li>2.8 Töm din nuvarande Dashboard så att den blir helt tom (nollställd).</li>
                        </ul>
                    <li className="liBold">3. Celler</li>
                    <li className="liBold">4. Drag and drop</li>
                    <li className="liBold">5. Datakällor</li>
                                                            
                </ul>
            </div>
        );
    }
}

export default Article;