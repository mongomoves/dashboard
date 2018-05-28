import React from 'react';
import PropTypes from 'prop-types';
import FormInput from './FormInput';
import {ButtonToolbar, Col, ControlLabel, FormGroup, Grid, Row, ToggleButton, ToggleButtonGroup} from "react-bootstrap";
import {DISPLAY_TYPE} from "../../Constants";

class GraphForm extends React.Component {

    render() {
        const {graphUrl, displayType, refreshRate, handleInputChange, handleDisplayTypeChange, handleGraphUrlChange} = this.props;

        return (
            <div>
                <Grid>
                    <Row>
                        <Col xs={8}>
                            <FormGroup>
                                <ControlLabel>Visningstyp</ControlLabel>
                                <ButtonToolbar>
                                    <ToggleButtonGroup
                                        type='radio'
                                        value={displayType}
                                        name='displayType'
                                        onChange={handleDisplayTypeChange}>
                                        <ToggleButton value={DISPLAY_TYPE.IFRAME}>Iframe</ToggleButton>
                                        <ToggleButton value={DISPLAY_TYPE.IMG}>Img</ToggleButton>
                                    </ToggleButtonGroup>
                                </ButtonToolbar>
                            </FormGroup>
                        </Col>
                        <Col style={{paddingRight: 0}} xs={4}>
                            <FormInput
                                title='Uppdateringsfrekvens'
                                type='number'
                                value={refreshRate}
                                name='refreshRate'
                                onChange={handleInputChange}
                                tooltip='I minuter hur ofta data ska uppdateras. 0 eller blankt för ingen uppdatering'/>
                        </Col>
                    </Row>
                </Grid>
                <FormInput
                    title='Diagram-URL'
                    type='text'
                    value={graphUrl}
                    name='graphUrl'
                    onChange={handleGraphUrlChange}
                    tooltip='Ange URL för inbäddat innehåll att visa'/>
            </div>
        );
    }
}

GraphForm.propTypes = {
    graphUrl: PropTypes.string.isRequired,
    displayType: PropTypes.string.isRequired,
    refreshRate: PropTypes.oneOfType([
        PropTypes.number.isRequired,
        PropTypes.string.isRequired,
    ]),
    handleInputChange: PropTypes.func.isRequired,
    handleDisplayTypeChange: PropTypes.func.isRequired,
    handleGraphUrlChange: PropTypes.func.isRequired
};

export default GraphForm;