import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAtrr } from '../../../TestAssets/utilities';
import EpisodeGroupingHeader from './EpisodeGroupingHeader';

describe('Episode Grouping Header tests', () => {
    it('episodeGroupingHeader should render correctly', () => {
        const component = shallow(<EpisodeGroupingHeader />);
        let headersSection = findByTestAtrr(component, 'HeadersSection');
        expect(headersSection.length).toBe(1);

        let episodeImage = findByTestAtrr(component, 'EpisodeImage');
        expect(episodeImage.length).toBe(1);

        let episodeName = findByTestAtrr(component, 'EpisodeName');
        expect(episodeName.length).toBe(1);

        let episodeNumber = findByTestAtrr(component, 'EpisodeNumber');
        expect(episodeNumber.length).toBe(1);

        let episodeReleaseDate = findByTestAtrr(component, 'EpisodeReleaseDate');
        expect(episodeReleaseDate.length).toBe(1);
    })
})