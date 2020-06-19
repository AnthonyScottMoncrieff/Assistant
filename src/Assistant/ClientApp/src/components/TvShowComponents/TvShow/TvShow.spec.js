import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAtrr } from '../../../TestAssets/utilities';
import TvShow from './TvShow';

describe('Tv Show tests', () => {
    const getProps = (thumbnailUrl, showName, description) => {
        return{
            thumbnailUrl,
            showName,
            description
        }
    }

    it('tvShow should render correctly on short name and dscription', () => {
        let showName = [...Array(37)].map(u => 'i').reduce((x,y) => x + y);;
        let thumbnailUrl = 'https://www.test.com';
        let description = [...Array(190)].map(u => 'i').reduce((x,y) => x + y);
        let props = getProps(thumbnailUrl, showName, description);

        let component = shallow(<TvShow {...props} />);

        let tvShowNode = findByTestAtrr(component, 'TvShow');
        expect(tvShowNode.length).toBe(1);

        let tvShowImgNode = findByTestAtrr(component, 'TvShowImg');
        expect(tvShowImgNode.length).toBe(1);
        let style = tvShowImgNode.get(0).props.style;
        expect(style.backgroundImage).toBe(`url(${thumbnailUrl})`);

        let showNameNode = findByTestAtrr(component, 'ShowName');
        expect(showNameNode.length).toBe(1);
        expect(showNameNode.text()).toBe(showName);

        let showDescriptionNode = findByTestAtrr(component, 'ShowDescription');
        expect(showDescriptionNode.length).toBe(1);
        expect(showDescriptionNode.text()).toBe(description);
    })

    it('tvShow should render correctly on long name and dscription', () => {
        let showName = [...Array(40)].map(u => 'i').reduce((x,y) => x + y);;
        let thumbnailUrl = 'https://www.test.com';
        let description = [...Array(250)].map(u => 'i').reduce((x,y) => x + y);
        let props = getProps(thumbnailUrl, showName, description);

        let component = shallow(<TvShow {...props} />);

        let tvShowNode = findByTestAtrr(component, 'TvShow');
        expect(tvShowNode.length).toBe(1);

        let tvShowImgNode = findByTestAtrr(component, 'TvShowImg');
        expect(tvShowImgNode.length).toBe(1);
        let style = tvShowImgNode.get(0).props.style;
        expect(style.backgroundImage).toBe(`url(${thumbnailUrl})`);

        let showNameNode = findByTestAtrr(component, 'ShowName');
        expect(showNameNode.length).toBe(1);
        expect(showNameNode.text()).toBe(`${showName.substring(0, 38)}...`);

        let showDescriptionNode = findByTestAtrr(component, 'ShowDescription');
        expect(showDescriptionNode.length).toBe(1);
        expect(showDescriptionNode.text()).toBe(`${description.substring(0, 200)}...`);
    })
})