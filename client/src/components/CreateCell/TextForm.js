import React from 'react';
import PropTypes from 'prop-types';
import FormInput from './FormInput';
import {Col, ControlLabel, FormControl, FormGroup, Grid, OverlayTrigger, Row, Tooltip} from "react-bootstrap";

class TextForm extends React.Component {

    render() {
        const {textInput, dataSource, attribute, refreshRate, handleInputChange} = this.props;

        return (
            <div>
                <FormGroup>
                    <ControlLabel>Fritext</ControlLabel>
                    <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-textinput">Ange den text som cellen ska visa</Tooltip>}>
                        <FormControl
                            componentClass="textarea"
                            value={textInput}
                            name='textInput'
                            onChange={handleInputChange}/>
                    </OverlayTrigger>
                </FormGroup>
                <FormInput
                    title='Datakälla'
                    type='text'
                    value={dataSource}
                    name='dataSource'
                    onChange={handleInputChange}
                    tooltip='Ange den datakälla som widgeten ska presentera data ifrån'/>
                <Grid>
                    <Row className='show-grid'>
                        <Col style={{padding: 0}} xs={8}>
                            <FormInput
                                title='Data-attribut'
                                type='text'
                                value={attribute}
                                name='attribute'
                                onChange={handleInputChange}
                                tooltip='Ange specifikt attribut från API'/>
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
            </div>
        );
    }
}

TextForm.propTypes = {
    textInput: PropTypes.string.isRequired,
    dataSource: PropTypes.string.isRequired,
    attribute: PropTypes.string.isRequired,
    refreshRate: PropTypes.oneOfType([
        PropTypes.number.isRequired,
        PropTypes.string.isRequired,
    ]),
    handleInputChange: PropTypes.func.isRequired
};

export default TextForm;