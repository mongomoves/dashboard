import React from 'react';
import {FormGroup, FormControl, ControlLabel, OverlayTrigger, Tooltip} from 'react-bootstrap';
import PropTypes from 'prop-types';

class FormInput extends React.Component {
    render() {
        return (
            <FormGroup>
                <ControlLabel>{this.props.title}</ControlLabel>
                <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-number">{this.props.tooltip}</Tooltip>}>
                    <FormControl
                        type={this.props.type}
                        defaultValue={this.props.defaultValue}
                        onChange={this.props.onChange}/>
                </OverlayTrigger>
            </FormGroup>
        )
    }
}

export default FormInput;

FormInput.propTypes = {
    title: PropTypes.string.isRequired,
    tooltip: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    defaultValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
}