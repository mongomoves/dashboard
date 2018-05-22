import React, { Component } from 'react';
import { PageHeader} from 'react-bootstrap';
import "./Article.css";

//Component that holds the content of the how to page. 
class Article extends Component {
    constructor(props){
        super(props);
        this.state = {
            toggleKoncept: true,
            toggleStepByStep: true,
            toggleWidget: true
        }
    }

    //Methods that toggle the content inside the Article component. Is called onClick from Sidebar.

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
                <p>Detta kommer alltid stå här...</p>
                {this.props.children[0]}
                {this.props.children[2]}
                {this.props.children[1]}

            </div>
        );
    }
}

export default Article;