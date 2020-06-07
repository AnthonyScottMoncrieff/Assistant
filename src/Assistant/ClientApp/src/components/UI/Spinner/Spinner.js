import React from 'react';

import classes from './Spinner.module.css';

const spinner = (props) => (
    <div className={classes.Loader}>props.children</div>
);

export default spinner;