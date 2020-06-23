import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAtrr } from '../../../TestAssets/utilities';
import classes from './Button.module.css';
import Button from './Button';

describe('Button tests', () => {
    const getProps = (disabled, btnType, children) => ({
        disabled,
        btnType,
        children
    })

    it('button should render correctly if NOT disabled', () => {
        let buttonText = 'This is a button';
        let buttonStyle = 'Success';
        let props = getProps(false, buttonStyle, buttonText);
        let component = shallow(<Button {...props} />);

        let buttonElement = findByTestAtrr(component, 'Button');
        expect(buttonElement.length).toBe(1);
        expect(buttonElement.text()).toBe(buttonText);
        expect(buttonElement.html().includes('disabled=""')).toBeFalsy();
        expect(buttonElement.hasClass(classes.Button)).toBeTruthy();
        expect(buttonElement.hasClass(classes[props.btnType])).toBeTruthy();
    })

    it('button should render correctly if disabled', () => {
        let buttonText = 'This is a button';
        let buttonStyle = 'Success';
        let props = getProps(true, buttonStyle, buttonText);
        let component = shallow(<Button {...props} />);

        let buttonElement = findByTestAtrr(component, 'Button');
        expect(buttonElement.length).toBe(1);
        expect(buttonElement.text()).toBe(buttonText);
        expect(buttonElement.html().includes('disabled=""')).toBeTruthy();
        expect(buttonElement.hasClass(classes.Button)).toBeTruthy();
        expect(buttonElement.hasClass(classes[props.btnType])).toBeTruthy();
    })
})