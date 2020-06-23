import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAtrr } from '../../../TestAssets/utilities';
import Input from './Input';
import classes from './Input.module.css';

describe('Input tests', () => {

    const getOptions = () =>
        [
            { value: 'value1', displayValue: 'Value 1' },
            { value: 'value2', displayValue: 'Value 2' },
            { value: 'value3', displayValue: 'Value 3' }
        ]


    const getProps = (invalid, shouldValidate, touched, value, elementConfig, label, elementType) => ({
        invalid,
        shouldValidate,
        touched,
        value,
        elementConfig,
        label,
        elementType,
        changed: () => { }
    })

    it('standard input to render correctly with no error', () => {
        let label = 'Input label';
        let props = getProps(false, true, false, "", {}, label, 'input');
        let component = shallow(<Input {...props} />);

        let rootElement = findByTestAtrr(component, 'InputRoot');
        expect(rootElement.length).toBe(1);

        let labelElement = findByTestAtrr(component, 'Label');
        expect(labelElement.length).toBe(1);
        expect(labelElement.text()).toBe(label);

        let inputElement = findByTestAtrr(component, 'Input');
        expect(inputElement.length).toBe(1);
        expect(inputElement.hasClass(classes.Invalid)).toBeFalsy();
        expect(inputElement.hasClass(classes.InputElement)).toBeTruthy();
    })

    it('standard input to render correctly with error', () => {
        let label = 'Input label';
        let props = getProps(true, true, true, "", {}, label, 'input');
        let component = shallow(<Input {...props} />);

        let rootElement = findByTestAtrr(component, 'InputRoot');
        expect(rootElement.length).toBe(1);

        let labelElement = findByTestAtrr(component, 'Label');
        expect(labelElement.length).toBe(1);
        expect(labelElement.text()).toBe(label);

        let inputElement = findByTestAtrr(component, 'Input');
        expect(inputElement.length).toBe(1);
        expect(inputElement.hasClass(classes.Invalid)).toBeTruthy();
        expect(inputElement.hasClass(classes.InputElement)).toBeTruthy();
    })

    it('incorrect inputtype should render standard input', () => {
        let label = 'Input label';
        let props = getProps(false, true, true, "", {}, label, 'badinput');
        let component = shallow(<Input {...props} />);

        let rootElement = findByTestAtrr(component, 'InputRoot');
        expect(rootElement.length).toBe(1);

        let labelElement = findByTestAtrr(component, 'Label');
        expect(labelElement.length).toBe(1);
        expect(labelElement.text()).toBe(label);

        let inputElement = findByTestAtrr(component, 'Input');
        expect(inputElement.length).toBe(1);
        expect(inputElement.hasClass(classes.Invalid)).toBeFalsy();
        expect(inputElement.hasClass(classes.InputElement)).toBeTruthy();
    })

    it('textarea to render correctly with no error', () => {
        let label = 'Input label';
        let props = getProps(false, true, false, "", {}, label, 'textarea');
        let component = shallow(<Input {...props} />);

        let rootElement = findByTestAtrr(component, 'InputRoot');
        expect(rootElement.length).toBe(1);

        let labelElement = findByTestAtrr(component, 'Label');
        expect(labelElement.length).toBe(1);
        expect(labelElement.text()).toBe(label);

        let inputElement = findByTestAtrr(component, 'TextArea');
        expect(inputElement.length).toBe(1);
        expect(inputElement.hasClass(classes.Invalid)).toBeFalsy();
        expect(inputElement.hasClass(classes.InputElement)).toBeTruthy();
    })

    it('textarea to render correctly with error', () => {
        let label = 'Input label';
        let props = getProps(true, true, true, "", {}, label, 'textarea');
        let component = shallow(<Input {...props} />);

        let rootElement = findByTestAtrr(component, 'InputRoot');
        expect(rootElement.length).toBe(1);

        let labelElement = findByTestAtrr(component, 'Label');
        expect(labelElement.length).toBe(1);
        expect(labelElement.text()).toBe(label);

        let inputElement = findByTestAtrr(component, 'TextArea');
        expect(inputElement.length).toBe(1);
        expect(inputElement.hasClass(classes.Invalid)).toBeTruthy();
        expect(inputElement.hasClass(classes.InputElement)).toBeTruthy();
    })

    it('select to render correctly with no error', () => {
        let label = 'Input label';
        let props = getProps(false, true, false, "", { options: getOptions() }, label, 'select');
        let component = shallow(<Input {...props} />);

        let rootElement = findByTestAtrr(component, 'InputRoot');
        expect(rootElement.length).toBe(1);

        let labelElement = findByTestAtrr(component, 'Label');
        expect(labelElement.length).toBe(1);
        expect(labelElement.text()).toBe(label);

        let inputElement = findByTestAtrr(component, 'Select');
        expect(inputElement.length).toBe(1);
        expect(inputElement.hasClass(classes.Invalid)).toBeFalsy();
        expect(inputElement.hasClass(classes.InputElement)).toBeTruthy();

        let optionElements = findByTestAtrr(component, 'Option');
        expect(optionElements.length).toBe(3);
    })

    it('select to render correctly with error', () => {
        let label = 'Input label';
        let props = getProps(true, true, true, "", { options: getOptions() }, label, 'select');
        let component = shallow(<Input {...props} />);

        let rootElement = findByTestAtrr(component, 'InputRoot');
        expect(rootElement.length).toBe(1);

        let labelElement = findByTestAtrr(component, 'Label');
        expect(labelElement.length).toBe(1);
        expect(labelElement.text()).toBe(label);

        let inputElement = findByTestAtrr(component, 'Select');
        expect(inputElement.length).toBe(1);
        expect(inputElement.hasClass(classes.Invalid)).toBeTruthy();
        expect(inputElement.hasClass(classes.InputElement)).toBeTruthy();

        let optionElements = findByTestAtrr(component, 'Option');
        expect(optionElements.length).toBe(3);
    })
})