import React, { Fragment } from 'react';
import classes from './Home.module.css';

const home = (props) => (
    <Fragment>
        <div className={classes.Root} />
        <div className={classes.Title}>Welcome, from your own personal life assistant. We got this.</div>
    </Fragment>
);

export default home;