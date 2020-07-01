import React from 'react';
import PropTypes from'prop-types';

import classes from './Backdrop.module.css';

const backdrop = (props) => (
    props.show ? <div data-test='Backdrop' id="modal-backdrop" className={classes.Backdrop} onClick={props.clicked}></div> : null
);

backdrop.propTypes = {
    show: PropTypes.bool,
    clicked: PropTypes.func
}

export default backdrop;