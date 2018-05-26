import React, { Component } from 'react';
import CustomNavbar from '../customnavbar/CustomNavbar';
import Article from '../Article/Article';
import Sidebar from '../Sidebar/Sidebar';
import Concept from '../HowToPage/Content/Concept';
import StepByStep from '../HowToPage/Content/StepByStep';
import WidgetInfo from '../HowToPage/Content/WidgetInfo';
import Footer from '../footer/footer';
import './howToPage.css';

//Component for displaying the how to page and its content. 

class HowToPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            toggleConcept: true,
            toggleStepByStep: false,
            toggleWidgetInfo: false
        }
    }

    toggleConceptHandler = () => {
        this.setState({toggleConcept: !this.state.toggleConcept});
    }

    toggleStepByStepHandler = () => {
        this.setState({toggleStepByStep: !this.state.toggleStepByStep});
    }

    toggleWidgetInfoHandler = () => {
        this.setState({toggleWidgetInfo: !this.state.toggleWidgetInfo});
    }

    render() {
        return (
            <div>
                <CustomNavbar />
                <div className="howToContent">
                    <Article>
                        {this.state.toggleConcept && <Concept />}
                        {this.state.toggleStepByStep && <StepByStep />}
                        {this.state.toggleWidgetInfo && <WidgetInfo />}         
                    </Article>
                    <Sidebar 
                        clickedConcept={this.toggleConceptHandler}
                        clickedStepByStep={this.toggleStepByStepHandler}
                        clickedWidgetEx={this.toggleWidgetInfoHandler} />
                </div>
                <Footer />
            </div>
        );
    }
}

export default HowToPage;
