import React, { Component } from 'react';
import { Button, FormGroup } from 'react-bootstrap';

/**
 * Confirmation message to display in a modal when the user
 * requests to clear their dashboard.
 */
class ClearPromptForm extends Component {

    handleClearDashboardClick = () => {
        this.props.clear();
        this.props.done();
    };

    render() {
        return (
            <FormGroup>
                <h3>Vill du verkligen rensa din Dashboard?</h3>
                <h5>Alla opublicerade widgets försvinner om du rensar din Dashboard.</h5>
                <Button bsStyle="primary" onClick={this.handleClearDashboardClick}>Rensa Dashboard</Button>
            </FormGroup>
        );
    }
}

export default ClearPromptForm;
