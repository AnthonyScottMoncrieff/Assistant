import React, { memo, Fragment } from 'react';
import './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
import Transition from "react-transition-group/Transition";
import PropTypes from'prop-types';

const modal = (props) => {

    return (
        <Transition
            mountOnEnter
            unmountOnExit
            in={props.show}
            timeout={500}>
            {state => {
                const cssClasses = [
                    "Modal",
                    state === "entering"
                        ? "ModalIn"
                        : state === "exiting" ? "ModalOut" : null
                ];
                return (
                    <Fragment>
                        <Backdrop show={props.show} clicked={props.modalClosed} />
                        <div className={cssClasses.join(" ")}>
                            {props.children}
                        </div>
                    </Fragment>
                );
            }}
        </Transition>
    )
}

modal.propTypes = {
    show: PropTypes.bool,
    modalClosed: PropTypes.func,
    children: PropTypes.node.isRequired
}

export default memo(modal, (prevProps, nextProps) => nextProps.show === prevProps.show && nextProps.children === prevProps.children);