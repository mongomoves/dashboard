import React, { Component } from 'react';
import { Button, FormGroup } from 'react-bootstrap';

class ClearPromptForm extends Component {
    render() {
        return (
            <FormGroup>
                <h3>Vill du verkligen ta bort din Dashboard?</h3>
                <h5>Om du väjer att ta bort din Dashboard så kommer alla skapade widgets att försvinna!</h5>
                <Button bsStyle="primary" onClick={this.props.clear}>Ta bort Dashboard</Button>
            </FormGroup>
        );
    }
}

export default ClearPromptForm;