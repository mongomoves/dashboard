import React from 'react';
import PropTypes from 'prop-types';
import {FormGroup, FormControl, ControlLabel, OverlayTrigger, Tooltip} from 'react-bootstrap';

/**
 * Simple input field for controlled forms.
 * Supply title, type, possible defaultValue and some onChange function.
 */
class FormInput extends React.Component {
    render() {
        return (
            <FormGroup>
                <ControlLabel>{this.props.title}</ControlLabel>
                <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-number">{this.props.tooltip}</Tooltip>}>
                    <FormControl
                        type={this.props.type}
                        name={this.props.name}
                        value={this.props.value}
                        onChange={this.props.onChange}/>
                </OverlayTrigger>
            </FormGroup>
        )
    }
}

FormInput.propTypes = {
    title: PropTypes.string,
    tooltip: PropTypes.string,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    onChange: PropTypes.func.isRequired
};

export default FormInput;