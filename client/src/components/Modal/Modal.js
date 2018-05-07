import React from 'react';

import Backdrop from '../Backdrop/Backdrop';
import Auxiliary from '../../hoc/Auxiliary';

import './Modal.css';

const modal = (props) => (
    <Auxiliary>
    <Backdrop show={props.show} clicked={props.close} />
    <div className="Modal" style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? '1' : '0'
    }}>
        {props.children}
    </div>
    </Auxiliary>
);

export default modal;