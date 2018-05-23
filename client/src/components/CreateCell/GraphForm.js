import React from 'react';
import FormInput from './FormInput';
import {ButtonToolbar, Col, ControlLabel, FormGroup, Grid, Row, ToggleButton, ToggleButtonGroup} from "react-bootstrap";

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
                                        <ToggleButton value='Iframe'>Iframe</ToggleButton>
                                        <ToggleButton value='Img'>Img</ToggleButton>
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

export default GraphForm;