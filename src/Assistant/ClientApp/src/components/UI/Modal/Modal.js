import React, { Component, Fragment } from 'react';
import './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
import Transition from "react-transition-group/Transition";

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render() {

        return (

            <Transition
                mountOnEnter
                unmountOnExit
                in={this.props.show}
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
                            <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                            <div className={cssClasses.join(" ")}>
                                {this.props.children}
                            </div>
                        </Fragment>
                    );
                }}
            </Transition>


        )
    }
}

export default Modal;