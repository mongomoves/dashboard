import React, { Component } from 'react';
import CustomNavbar from '../customnavbar/CustomNavbar';
import Article from '../Article/Article';
import Sidebar from '../Sidebar/Sidebar';
import Koncept from '../HowToPage/Content/Concept';
import StepByStep from '../HowToPage/Content/StepByStep';
import WidgetEx from '../HowToPage/Content/Widget';
import Footer from '../footer/footer';
import './howToPage.css';

//Component for displaying the how to page and its content. 

class HowToPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            toggleConcept: true,
            toggleStepByStep: true,
            toggleWidgetEx: true
        }
    }

    //Methods that toggles the visabillity of the content.

    toggleConceptHandler = () => {
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
                        clickedConcept={this.toggleConceptHandler}
                        clickedStepByStep={this.toggleStepByStepHandler}
                        clickedWidgetEx={this.toggleWidgetExHandler} />
                </div>
                <Footer />
            </div>
        );
    }
}

export default HowToPage;
