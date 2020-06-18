import Episode from './Episode';
import classes from './Episode.module.css';
import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAtrr } from '../../../TestAssets/utilities';
import NoImage from '../../../Assets/Images/noimg.png';

const getProps = (shouldLoadImg, image, name, number, airdate) => {
    return {
        shouldLoadImg,
        episode: {
            image: {
                medium: image
            },
            name,
            number,
            airdate
        }
    }
};

const setUp = (props = {}) => {
    const component = shallow(<Episode {...props} />);
    return component;
};

describe('Episode tests', () => {
    it('episode should render correctly with loaded image and past airdate', () => {
        //Arrange
        let props = getProps(true, 'http://www.image.com', 'epsiode name', 8, '01/02/2020');
        let episode = setUp(props);

        //Act
        let episodeNode = findByTestAtrr(episode, 'Episode');
        expect(episodeNode.length).toBe(1);
        expect(episodeNode.hasClass([classes.Episode, classes.EpisodeHighlight].join(" "))).toBe(true);

        let imageContainer = findByTestAtrr(episode, 'ImageContainer');
        expect(imageContainer.length).toBe(1);

        let image = findByTestAtrr(episode, 'Image');
        expect(imageContainer.length).toBe(1);
        let style = image.get(0).props.style;
        expect(style.backgroundImage).toBe('url(https://www.image.com)');

        let nameContainer = findByTestAtrr(episode, 'Name');
        expect(nameContainer.length).toBe(1);

        let numberContainer = findByTestAtrr(episode, 'Number');
        expect(numberContainer.length).toBe(1);

        let dateContainer = findByTestAtrr(episode, 'Date');
        expect(dateContainer.length).toBe(1);
    })

    it('episode should render correctly with no image and past airdate', () => {
        //Arrange
        let props = getProps(false, 'http://www.image.com', 'epsiode name', 8, '01/02/2020');
        let episode = setUp(props);

        //Act
        let episodeNode = findByTestAtrr(episode, 'Episode');
        expect(episodeNode.length).toBe(1);
        expect(episodeNode.hasClass([classes.Episode, classes.EpisodeHighlight].join(" "))).toBe(true);

        let imageContainer = findByTestAtrr(episode, 'ImageContainer');
        expect(imageContainer.length).toBe(1);

        let image = findByTestAtrr(episode, 'Image');
        expect(imageContainer.length).toBe(1);
        let style = image.get(0).props.style;
        expect(style.backgroundImage).toBe(`url(${NoImage})`);

        let nameContainer = findByTestAtrr(episode, 'Name');
        expect(nameContainer.length).toBe(1);

        let numberContainer = findByTestAtrr(episode, 'Number');
        expect(numberContainer.length).toBe(1);

        let dateContainer = findByTestAtrr(episode, 'Date');
        expect(dateContainer.length).toBe(1);
    })

    it('episode should render correctly with no image and future airdate', () => {
        //Arrange
        let props = getProps(false, 'http://www.image.com', 'epsiode name', 8, '01/02/2100');
        let episode = setUp(props);

        //Act
        let episodeNode = findByTestAtrr(episode, 'Episode');
        expect(episodeNode.length).toBe(1);
        expect(episodeNode.hasClass([classes.Episode, classes.FutureEpisode].join(" "))).toBe(true);

        let imageContainer = findByTestAtrr(episode, 'ImageContainer');
        expect(imageContainer.length).toBe(1);

        let image = findByTestAtrr(episode, 'Image');
        expect(imageContainer.length).toBe(1);
        let style = image.get(0).props.style;
        expect(style.backgroundImage).toBe(`url(${NoImage})`);

        let nameContainer = findByTestAtrr(episode, 'Name');
        expect(nameContainer.length).toBe(1);

        let numberContainer = findByTestAtrr(episode, 'Number');
        expect(numberContainer.length).toBe(1);

        let dateContainer = findByTestAtrr(episode, 'Date');
        expect(dateContainer.length).toBe(1);
    })
})