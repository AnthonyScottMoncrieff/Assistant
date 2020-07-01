import React from 'react';
import PropTypes from'prop-types';
import classes from './Input.module.css';

const input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                data-test='Input'
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('textarea'):
            inputElement = <textarea
                data-test='TextArea'
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('select'):
            inputElement = (
                <select
                    data-test='Select'
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option data-test='Option' key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input
                data-test='Input'
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }

    return (
        <div data-test='InputRoot' className={classes.Input}>
            <label data-test='Label' className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

input.propTypes = {
    invalid: PropTypes.bool,
    shouldValidate: PropTypes.bool,
    touched: PropTypes.bool,
    elementType: PropTypes.string,
    value: PropTypes.string,
    changed: PropTypes.func
}

export default input;