import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAtrr, checkProps } from '../../../TestAssets/utilities';
import Add from './Add';

describe('Add tests', () => {

    const getProps = (visible) => ({
        visible,
        clicked: () => { }
    });

    it('add should render correctly when visible', () => {
        let props = getProps(true);
        let component = shallow(<Add {...props} />);

        let rootElement = findByTestAtrr(component, 'Root');
        expect(rootElement.length).toBe(1);

        let addContainerElement = findByTestAtrr(component, 'AddContainer');
        expect(addContainerElement.length).toBe(1);

        let addElement = findByTestAtrr(component, 'Add');
        expect(addElement.length).toBe(1);

        let labelElement = findByTestAtrr(component, 'Label');
        expect(labelElement.length).toBe(1);

        const propsErr = checkProps(component, props);
        expect(propsErr).toBeUndefined();
    })

    it('add should render correctly when not visible', () => {
        let props = getProps(false);
        let component = shallow(<Add {...props} />);

        let rootElement = findByTestAtrr(component, 'Root');
        expect(rootElement.length).toBe(0);

        let addContainerElement = findByTestAtrr(component, 'AddContainer');
        expect(addContainerElement.length).toBe(0);

        let addElement = findByTestAtrr(component, 'Add');
        expect(addElement.length).toBe(0);

        let labelElement = findByTestAtrr(component, 'Label');
        expect(labelElement.length).toBe(0);

        const propsErr = checkProps(component, props);
        expect(propsErr).toBeUndefined();
    })
})