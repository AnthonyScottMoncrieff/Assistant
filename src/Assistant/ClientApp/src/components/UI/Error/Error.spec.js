import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAtrr, checkProps } from '../../../TestAssets/utilities';
import Error from './Error';

describe('Error tests', () => {
    it('error should render correctly when visible', () => {
        let children = 'This is an error message';
        let props = {isVisible: true, children};
        let component = shallow(<Error {...props} />);

        let rootElement = findByTestAtrr(component, 'ErrorRoot');
        expect(rootElement.length).toBe(1);

        let errorExclamationElement = findByTestAtrr(component, 'ErrorExclamation');
        expect(errorExclamationElement.length).toBe(1);

        let errorMessageElement = findByTestAtrr(component, 'ErrorMessage');
        expect(errorMessageElement.length).toBe(1);
        expect(errorMessageElement.text()).toBe(children);

        const propsErr = checkProps(component, props);
        expect(propsErr).toBeUndefined();
    })

    it('error should render correctly when NOT visible', () => {
        let children = 'This is an error message';
        let props = {isVisible: false, children};
        let component = shallow(<Error {...props} />);

        let rootElement = findByTestAtrr(component, 'ErrorRoot');
        expect(rootElement.length).toBe(0);

        let errorExclamationElement = findByTestAtrr(component, 'ErrorExclamation');
        expect(errorExclamationElement.length).toBe(0);

        let errorMessageElement = findByTestAtrr(component, 'ErrorMessage');
        expect(errorMessageElement.length).toBe(0);

        const propsErr = checkProps(component, props);
        expect(propsErr).toBeUndefined();
    })
})