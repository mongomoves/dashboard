import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Button, Modal} from 'react-bootstrap';

class BootstrapModal extends Component {

    render() {
        const {children, title, show, close} = this.props;

        return (
            <Modal show={show} onHide={close}>
                <Modal.Header closeButton style={modalHeader}>
                    <Modal.Title>
                        {title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={modalBody}>
                    {children}
                </Modal.Body>
                <Modal.Footer style={modalFooter}>
                    <Button onClick={close}>Stäng</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}


const modalBody = {
    // Changes the background of Modal header
    backgroundColor: "gainsboro"
};

const modalHeader = {
    backgroundColor: "#353535",
    color: "orange" 
    //Must add rounded corners in header!
};

const modalFooter = {
    // Changes the background of Modal footer
    backgroundColor: "#353535"
};

BootstrapModal.propTypes = {
    children: PropTypes.any.isRequired,
    title: PropTypes.string,
    show: PropTypes.bool,
    close: PropTypes.func.isRequired
};

export default BootstrapModal;