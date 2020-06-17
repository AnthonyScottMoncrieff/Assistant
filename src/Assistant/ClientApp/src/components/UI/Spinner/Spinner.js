import React, { Fragment } from 'react';

import classes from './Spinner.module.css';

const spinner = (props) => (
    <Fragment>
        <div className={classes.Loader}></div>
        <div className={classes.Message}>{props.children}</div>
    </Fragment>
);

export default spinner;