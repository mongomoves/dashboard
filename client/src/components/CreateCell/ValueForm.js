import React from 'react';
import FormInput from './FormInput';
import {Col, Grid, Row} from "react-bootstrap";

class ValueForm extends React.Component {

    render() {
        const {number, dataSource, attribute, refreshRate, unit, handleInputChange} = this.props;

        return (
            <div>
                <FormInput
                    title='Värde'
                    type='number'
                    value={number}
                    name='number'
                    onChange={handleInputChange}
                    tooltip='Ange det värde som ska visas i widgeten'/>
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
                <FormInput
                    title='Enhet'
                    type='text'
                    value={unit}
                    name='unit'
                    onChange={handleInputChange}
                    tooltip='Ange enhet för värdet'/>
            </div>
        );
    }
}

export default ValueForm;