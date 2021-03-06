import React, { Fragment } from 'react';
import classes from './Home.module.css';
import Hero from '../../Assets/Images/hero.jpg';

const home = () => (
    <Fragment>
        <div data-test='Root' className={classes.Root} style={{backgroundImage: `url(${Hero})`}} />
        <div data-test='Title' className={classes.Title}>Welcome, from your own personal life assistant. We got this.</div>
    </Fragment>
);

export default home;