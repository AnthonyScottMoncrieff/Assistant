import { saveEpisodesToLocalstorage, getEpisodesFromLocalstorage } from './episodeHelpers';

describe('Episode Helper tests', () => {
    it('episodeHelpers should interact correctly with localstorage', () => {
        //Arrange
        let episodes = [
            {showName: 'Breaking Bad', Season: 1, Epsiode: 1},
            {showName: 'Breaking Bad', Season: 1, Epsiode: 2},
            {showName: 'Breaking Bad', Season: 1, Epsiode: 3},
            {showName: 'Breaking Bad', Season: 1, Epsiode: 4},
        ];

        //Act
        saveEpisodesToLocalstorage(episodes, 'breaking-bad');

        //Assert
        let retrievedEpisodes = getEpisodesFromLocalstorage('breaking-bad');
        expect(retrievedEpisodes.length).toBe(4);
    })

    it('getEpisodesFromLocalstorage should return null if episodes not present', () => {
        //Assert
        let retrievedEpisodes = getEpisodesFromLocalstorage('no-show');
        expect(retrievedEpisodes).toBe(null);
    })
})