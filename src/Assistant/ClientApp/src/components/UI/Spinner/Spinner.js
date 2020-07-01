import React, { Fragment } from 'react';
import PropTypes from'prop-types';
import classes from './Spinner.module.css';

const spinner = (props) => (
    <Fragment>
        <div data-test='Loader' className={classes.Loader}></div>
        <div data-test='Message' className={classes.Message}>{props.children}</div>
    </Fragment>
);

spinner.propTypes = {
    children: PropTypes.node.isRequired
}

export default spinner;