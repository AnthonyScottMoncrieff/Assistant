import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAtrr } from '../../../TestAssets/utilities';
import ShowPreview from './ShowPreview';

describe('Show Preview tests', () => {
    const getProps = (showSummary, showImg, showName) => {
        return {
            showSummary,
            showName,
            showImg
        }
    }

    it('showPreview should render correctly with short summary', () => {
        let showSummary = [...Array(100)].map(u => 'i').reduce((x,y) => x + y);
        let showName = 'The Boys';
        let showImg = 'https://www.test.com';
        let props = getProps(showSummary, showImg, showName);
        let component = shallow(<ShowPreview {...props} />);

        let showPreviewNode = findByTestAtrr(component, 'ShowPreview');
        expect(showPreviewNode.length).toBe(1);

        let imageNode = findByTestAtrr(component, 'Image');
        expect(imageNode.length).toBe(1);
        let style = imageNode.get(0).props.style;
        expect(style.backgroundImage).toBe('url(https://www.test.com)');

        let showDetailNode = findByTestAtrr(component, 'ShowDetail');
        expect(showDetailNode.length).toBe(1);

        let showNameNode = findByTestAtrr(component, 'ShowName');
        expect(showNameNode.length).toBe(1);
        expect(showNameNode.text()).toBe(showName);

        let showDescriptionNode = findByTestAtrr(component, 'ShowDescription');
        expect(showDescriptionNode.length).toBe(1);
        expect(showDescriptionNode.text()).toBe(showSummary);
    })

    it('showPreview should render correctly with long summary', () => {
        let showSummary = [...Array(400)].map(u => 'i').reduce((x,y) => x + y);
        let showName = 'The Boys';
        let showImg = 'https://www.test.com';
        let props = getProps(showSummary, showImg, showName);
        let component = shallow(<ShowPreview {...props} />);

        let showPreviewNode = findByTestAtrr(component, 'ShowPreview');
        expect(showPreviewNode.length).toBe(1);

        let imageNode = findByTestAtrr(component, 'Image');
        expect(imageNode.length).toBe(1);
        let style = imageNode.get(0).props.style;
        expect(style.backgroundImage).toBe('url(https://www.test.com)');

        let showDetailNode = findByTestAtrr(component, 'ShowDetail');
        expect(showDetailNode.length).toBe(1);

        let showNameNode = findByTestAtrr(component, 'ShowName');
        expect(showNameNode.length).toBe(1);
        expect(showNameNode.text()).toBe(showName);

        let showDescriptionNode = findByTestAtrr(component, 'ShowDescription');
        expect(showDescriptionNode.length).toBe(1);
        expect(showDescriptionNode.text()).toBe(`${showSummary.substring(0, 243)}...`);
    })
})