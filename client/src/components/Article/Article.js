import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PageHeader} from 'react-bootstrap';
import "./Article.css";

//Component that holds the content of the how to page. 
class Article extends Component {
    constructor(props){
        super(props);
        this.state = {
            toggleConcept: true,
            toggleStepByStep: true,
            toggleWidget: true
        }
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

Article.propTypes = {
    children: PropTypes.any.isRequired
};

export default Article;