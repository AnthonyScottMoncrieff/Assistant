import React, { Fragment } from 'react';

import classes from './Spinner.module.css';

const spinner = (props) => (
    <Fragment>
        <div data-test='Loader' className={classes.Loader}></div>
        <div data-test='Message' className={classes.Message}>{props.children}</div>
    </Fragment>
);

export default spinner;