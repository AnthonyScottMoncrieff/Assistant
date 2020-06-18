import { findByTestAtrr } from '../../TestAssets/utilities';
import React from 'react';
import { shallow } from 'enzyme';
import Home from './Home';
describe('Home tests', () => {

    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Home />);
    });

    it('Should render Root element', () => {
        const root = findByTestAtrr(wrapper, 'Root');
        expect(root.length).toBe(1);
    })

    it('Should render Title element', () => {
        const root = findByTestAtrr(wrapper, 'Title');
        expect(root.length).toBe(1);
    })
})