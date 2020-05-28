import React from 'react';
import classes from './Add.module.css';

const add = (props) => (
    <div className={classes.AddRoot}>
        <div className={classes.AddContainer}>
            <div className={classes.Add} onClick={props.clicked}>+</div>
            <div className={classes.Label}>Add a new TV Show</div>
        </div>
    </div>

);

export default add;