import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAtrr } from '../../../TestAssets/utilities';
import FullTvShow from './FullTvShow';

describe('Full Tv Show tests', () => {
    const getProps = (header, thumbnailUrl, description) => {
        return {
            header,
            description,
            thumbnailUrl
        }
    }

    it('fullTvShow should render correctly', () => {
        let headerText = 'header';
        let thumbnailUrl = 'https://www.test.com';
        let descriptionText = 'description';
        let props = getProps(headerText, thumbnailUrl, descriptionText);
        let component = shallow(<FullTvShow {...props} />);

        let root = findByTestAtrr(component, 'FullTvShow');
        expect(root.length).toBe(1);

        let header = findByTestAtrr(component, 'Header');
        expect(header.length).toBe(1);
        expect(header.text()).toBe(headerText);

        let body = findByTestAtrr(component, 'Body');
        expect(body.length).toBe(1);

        let tvShowImg = findByTestAtrr(component, 'TvShowImg');
        expect(tvShowImg.length).toBe(1);
        let style = tvShowImg.get(0).props.style;
        expect(style.backgroundImage).toBe('url(https://www.test.com)');

        let description = findByTestAtrr(component, 'Description');
        expect(description.length).toBe(1);
        expect(description.text()).toBe(descriptionText);
    })
})