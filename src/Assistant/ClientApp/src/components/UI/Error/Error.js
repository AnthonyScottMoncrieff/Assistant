import React from 'react';
import classes from './Error.module.css';
import PropTypes from'prop-types';

const error = (props) => {
    let errorContent = props.isVisible ? 
    (<div data-test='ErrorRoot' className={classes.ErrorRoot}>
        <div data-test='ErrorExclamation' className={classes.ErrorExclamation}>!</div>
        <div data-test='ErrorMessage' className={classes.ErrorMessage}>{props.children}</div>
    </div>) :
    null;

    return errorContent;
}

error.propTypes = {
    isVisible: PropTypes.bool,
    children: PropTypes.node.isRequired
}

export default error;