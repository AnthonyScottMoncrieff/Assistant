import React from 'react';
import { mount } from 'enzyme';
import { findByTestAtrr } from '../../../TestAssets/utilities';
import UpcomingEpisode from './UpcomingEpisode';

describe('Upcoming Episode test', () => {
    const getEpisode = (image, name, number, airdate) => {
        return {
            image: {
                medium: image
            },
            name,
            number,
            airdate
        }
    };

    it('upcomingEpisode should render correctly if future date', () => {
        let dateNow = new Date();
        let episode1 = getEpisode('https://www.test.com', 'Episode 1', 1, `${dateNow.getFullYear() + 1}-${dateNow.getMonth() + 1}-${dateNow.getDate()}`);
        let episode2 = getEpisode('https://www.test.com', 'Episode 2', 2, `${dateNow.getFullYear() + 2}-${dateNow.getMonth() + 1}-${dateNow.getDate()}`);
        let props = {
            episodes: [episode1, episode2]
        }
        let component = mount(<UpcomingEpisode {...props} />);

        let upComingEpisodeContainerNode = findByTestAtrr(component, 'UpComingEpisodeContainer');
        expect(upComingEpisodeContainerNode.length).toBe(1);

        let headerNode = findByTestAtrr(component, 'Header');
        expect(headerNode.length).toBe(1);
        expect(headerNode.text()).toBe('Upcoming Episode');

        let upComingEpisodeNode = findByTestAtrr(component, 'UpComingEpisode');
        expect(upComingEpisodeNode.length).toBe(1);

        let headersSectionNode = findByTestAtrr(component, 'HeadersSection');
        expect(headersSectionNode.length).toBe(1);

        let episodeNode = findByTestAtrr(component, 'Episode');
        expect(episodeNode.length).toBe(1);
    })

    it('upcomingEpisode should render correctly if past date', () => {
        let dateNow = new Date();
        let episode1 = getEpisode('https://www.test.com', 'Episode 1', 1, `${dateNow.getFullYear() - 2}-${dateNow.getMonth() + 1}-${dateNow.getDate()}`);
        let episode2 = getEpisode('https://www.test.com', 'Episode 2', 2, `${dateNow.getFullYear() - 3}-${dateNow.getMonth() + 1}-${dateNow.getDate()}`);
        let props = {
            episodes: [episode1, episode2]
        }
        let component = mount(<UpcomingEpisode {...props} />);

        let upComingEpisodeContainerNode = findByTestAtrr(component, 'UpComingEpisodeContainer');
        expect(upComingEpisodeContainerNode.length).toBe(0);

        let headerNode = findByTestAtrr(component, 'Header');
        expect(headerNode.length).toBe(0);

        let upComingEpisodeNode = findByTestAtrr(component, 'UpComingEpisode');
        expect(upComingEpisodeNode.length).toBe(0);

        let headersSectionNode = findByTestAtrr(component, 'HeadersSection');
        expect(headersSectionNode.length).toBe(0);

        let episodeNode = findByTestAtrr(component, 'Episode');
        expect(episodeNode.length).toBe(0);
    })
})