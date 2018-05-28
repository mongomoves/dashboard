import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Row, Col} from 'react-bootstrap';

/**
 * Shows information about a specific cell. Author, date and description.
 */
class CellInfo extends Component {

    /**
     * Removes some unwanted characters and seconds indicators for
     * a more clean presentation.
     * @param {String} timestamp Timestamp to format
     */
    formatTimeStamp = (timestamp) => {
        let newTime = timestamp.replace(/([A-Z])/g, " ");
        return newTime.slice(0, (newTime.indexOf(".") - 3));
    };

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
                            <h4><b>Skapad:</b> {this.formatTimeStamp(created)}</h4>
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