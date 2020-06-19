import React, { Fragment } from 'react';
import classes from './Error.module.css';

const error = (props) => {
    let errorContent = props.isVisible ? 
    (<div data-test='ErrorRoot' className={classes.ErrorRoot}>
        <div className={classes.ErrorExclamation}>!</div>
        <div className={classes.ErrorMessage}>{props.children}</div>
    </div>) :
    null;
    return (
        <Fragment>
            {errorContent}
        </Fragment>
    )
}

export default error;