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
                {this.props.children[0]}
                {this.props.children[2]}
                {this.props.children[1]}

            </div>
        );
    }
}

export default Article;