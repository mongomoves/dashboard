import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'react-bootstrap';

/**
 * Shows information about a specific cell. Author, date and description.
 * TODO: Make it look good.
 */

class CellInfo extends Component {
    generateElements() {
        const {creator, created, description} = this.props.cell;
        if(!creator && !created && !description) {
            return (
                <p>Cellen är inte publicerad och saknar information</p>
            );
        } else {
            return (
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
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                {this.generateElements()}
            </div>
        )
    }
}

CellInfo.propTypes = {
    cell: PropTypes.object.isRequired
};

export default CellInfo;