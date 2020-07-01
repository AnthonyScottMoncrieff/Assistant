import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAtrr, checkProps } from '../../../TestAssets/utilities';
import Spinner from './Spinner';

describe('Spinner tests', () => {
    it('Spinner should render correctly', () => {
        let children = 'inner text';
        let props = { children };
        let component = shallow(<Spinner {...props} />);

        let loaderElement = findByTestAtrr(component, 'Loader');
        expect(loaderElement.length).toBe(1);

        let messageElement = findByTestAtrr(component, 'Message');
        expect(messageElement.length).toBe(1);
        expect(messageElement.text()).toBe(children);

        const propsErr = checkProps(component, props);
        expect(propsErr).toBeUndefined();
    })
})