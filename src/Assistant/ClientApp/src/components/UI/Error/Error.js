import React from 'react';
import classes from './Error.module.css';

const error = (props) => {
    let rootClass = props.isVisible ? classes.ErrorRoot : classes.NoDisplay;
    return (
        <div data-test='ErrorRoot' className={rootClass}>
            <div className={classes.ErrorExclamation}>!</div>
            <div className={classes.ErrorMessage}>{props.children}</div>
        </div>
    )
}

export default error;