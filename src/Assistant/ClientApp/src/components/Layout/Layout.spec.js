import { findByTestAtrr } from '../../TestAssets/utilities';
import React from 'react';
import { shallow } from 'enzyme';
import Layout from './Layout';

describe('Layout tests', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Layout>Content</Layout>);
    });

    it('Layout should render root Layout node correctly', () => {
        const layout = findByTestAtrr(wrapper, 'Layout');
        expect(layout.length).toBe(1);
    })
})