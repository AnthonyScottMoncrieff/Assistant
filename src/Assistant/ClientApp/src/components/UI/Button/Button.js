import React from 'react';
import PropTypes from'prop-types';

import classes from './Button.module.css';

const button = (props) => (
    <button 
        data-test='Button'
        disabled={props.disabled}
        className={[classes.Button, classes[props.btnType]].join(' ')}
        onClick={props.clicked}>{props.children}</button>
)

button.propTypes = {
    disabled: PropTypes.bool,
    btnType: PropTypes.string,
    children: PropTypes.node.isRequired
}

export default button;