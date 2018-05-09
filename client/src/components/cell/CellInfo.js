import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';

/**
 * Shows information about a specific cell. Author, date and description.
 * TODO: Make it look good.
 */
class CellInfo extends Component {
    generateElements() {
        const {creator, created, description} = this.props.cell;
        let dom;
        if(!creator && !created && !description) {
            dom = <p>Cellen är inte publicerad och saknar information</p>;
            return dom;
        } else {
            dom = (
            <div>
                <p>{description}</p>
                <Row>
                    <Col lg={6}>
                        <h3>Skapad av {creator}</h3>
                    </Col>
                    <Col lg={6}>
                        <h3>{created}</h3>
                    </Col>
                </Row>
            </div>);
        }
        return dom;
    }

    render() {
        return (
            <div>
                {this.generateElements()}
            </div>
        )
    }
}

export default CellInfo;