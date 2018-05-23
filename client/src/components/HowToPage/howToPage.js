import React, { Component } from 'react';
import CustomNavbar from '../customnavbar/CustomNavbar';
import Article from '../Article/Article';
import Sidebar from '../Sidebar/Sidebar';
import Koncept from '../HowToPage/ContentComponents/KonceptComponent';
import StepByStep from '../HowToPage/ContentComponents/StegforStegComponent';
import WidgetEx from '../HowToPage/ContentComponents/WidgetComponent';
import './howToPage.css';

//Component for displaying the how to page and its content. 

class HowToPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            toggleKoncept: true,
            toggleStepByStep: true,
            toggleWidgetEx: true
        }
    }

    //Methods that toggles the visabillity of the content.

    toggleKonceptHandler = () => {
        this.setState({toggleKoncept: !this.state.toggleKoncept});
    }

    toggleStepByStepHandler = () => {
        this.setState({toggleStepByStep: !this.state.toggleStepByStep});
    }

    toggleWidgetExHandler = () => {
        this.setState({toggleWidgetEx: !this.state.toggleWidgetEx});
    }

    render() {
        return (
            <div>
                <CustomNavbar />
                <div className="howToContent">
                    <Article>
                        {this.state.toggleKoncept && <Koncept />}
                        {!this.state.toggleStepByStep && <StepByStep />}
                        {!this.state.toggleWidgetEx && <WidgetEx />}         
                    </Article>
                    <Sidebar 
                        clickedKoncept={this.toggleKonceptHandler}
                        clickedStepByStep={this.toggleStepByStepHandler}
                        clickedWidgetEx={this.toggleWidgetExHandler} />
                </div>
            </div>
        );
    }
}

export default HowToPage;