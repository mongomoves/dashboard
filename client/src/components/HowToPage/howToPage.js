import React, { Component } from 'react';
import CustomNavbar from '../customnavbar/CustomNavbar';
import Article from '../Article/Article';
import Sidebar from '../Sidebar/Sidebar';
import Koncept from '../HowToPage/ContentComponents/KonceptComponent';
import StepByStep from '../HowToPage/ContentComponents/StegforStegComponent';
import WidgetEx from '../HowToPage/ContentComponents/WidgetComponent';
import './howToPage.css';

class HowToPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            hideKoncept: false,
            hideStepByStep: false,
            hideWidgetEx: false
        }
    }

    toggleHideKonceptHandler = () => {
        
    }

    render() {
        return (
            <div>
                <CustomNavbar />
                <div className="howToContent">
                    <Article>
                        <Koncept />
                        <StepByStep />
                        <WidgetEx />         
                    </Article>
                    <Sidebar />
                </div>
            </div>
        );
    }
}

export default HowToPage;