import React from 'react';
import classes from './Add.module.css';

const add = (props) => {

    let content = props.visible ? (<div data-test='Root' className={classes.AddRoot}>
        <div data-test='AddContainer' className={classes.AddContainer}>
            <div data-test='Add' className={classes.Add} onClick={props.clicked}>+</div>
            <div data-test='Label' className={classes.Label}>Add a new TV Show</div>
        </div>
    </div>) : null;

    return content;
};

export default add;