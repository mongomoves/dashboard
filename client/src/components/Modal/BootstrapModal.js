import React, { Component } from 'react';
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
                    <Button onClick={close}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

const modalBody = {
    backgroundColor: "gainsboro"
}

const modalHeader = {
    backgroundColor: "#353535",
    color: "orange" 
}

const modalFooter = {
    backgroundColor: "#353535"
}

export default BootstrapModal;