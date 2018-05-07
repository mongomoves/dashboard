import React, { Component } from 'react';
import {Button, Modal} from 'react-bootstrap';

class BootstrapModal extends Component {

    render() {
        const {children, title, show, close} = this.props;

        return (
            <Modal show={show} onHide={close}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {children}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={close}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default BootstrapModal;