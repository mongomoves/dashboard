import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'react-bootstrap';
import {formatTimeStamp} from "../../utils/DateFormat";

/**
 * Shows information about a specific cell. Author, date and description.
 */
class CellInfo extends Component {

    render() {
        const {creator, created, description} = this.props.cell;
        if(!creator && !created && !description) {
            return (
                <p>Cellen är inte publicerad och saknar information</p>
            );
        } else {
            return (
                <div className="cellInfo">
                    <h4><b>Beskrivning:</b></h4><p>{description}</p>
                    <Row>
                        <Col lg={6}>
                            <h4><b>Skapad av:</b> {creator}</h4>
                        </Col>
                        <Col lg={6}>
                            <h4><b>Skapad:</b> {formatTimeStamp(created)}</h4>
                        </Col>
                    </Row>
                </div>
            );
        }
    }
}

CellInfo.propTypes = {
    cell: PropTypes.object.isRequired
};

export default CellInfo;