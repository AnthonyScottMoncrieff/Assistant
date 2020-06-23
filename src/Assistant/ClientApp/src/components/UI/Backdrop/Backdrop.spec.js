import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAtrr } from '../../../TestAssets/utilities';
import Backdrop from './Backdrop';

describe('Backdrop tests', () => {
    it('backdrop should render correctly when visible', () => {
        let props = { show: true };
        let component = shallow(<Backdrop {...props} />);

        let backdropComponent = findByTestAtrr(component, 'Backdrop');
        expect(backdropComponent.length).toBe(1);
    })

    it('backdrop should render correctly when not visible', () => {
        let props = { show: false };
        let component = shallow(<Backdrop {...props} />);

        let backdropComponent = findByTestAtrr(component, 'Backdrop');
        expect(backdropComponent.length).toBe(0);
    })
})