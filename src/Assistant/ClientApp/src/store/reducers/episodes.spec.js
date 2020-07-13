import * as actionTypes from '../actions/actionTypes';
import episodeReducer from './episodes';

describe('Episode reducer tests', () => {
    it('Should set episodesLoading to true', () => {
        //Arrange
        const initalState = {
            showEpisodes: [],
            episodesLoading: false,
            episodesFetchError: false
        };

        const action = {type: actionTypes.SET_ISLOADING};

        //Act
        const finalState = episodeReducer(initalState, action);

        //Assert
        expect(finalState.episodesLoading).toBeTruthy()
    })

    it('Should set episodesLoading to false', () => {
        //Arrange
        const initalState = {
            showEpisodes: [],
            episodesLoading: true,
            episodesFetchError: false
        };

        const action = {type: actionTypes.SET_NOT_ISLOADING};

        //Act
        const finalState = episodeReducer(initalState, action);

        //Assert
        expect(finalState.episodesLoading).toBeFalsy()
    })

    it('Should set fetchEpisodesStarted correctly', () => {
        //Arrange
        const initalState = {
            showEpisodes: [],
            episodesLoading: false,
            episodesFetchError: true
        };

        const action = {type: actionTypes.FETCH_EPISODES_STARTED};

        //Act
        const finalState = episodeReducer(initalState, action);

        //Assert
        expect(finalState.episodesLoading).toBeTruthy();
        expect(finalState.episodesFetchError).toBeFalsy();
    })

    it('Should set fetchEpisodesFailed correctly', () => {
        //Arrange
        const initalState = {
            showEpisodes: [],
            episodesLoading: true,
            episodesFetchError: false
        };

        const action = {type: actionTypes.FETCH_EPISODES_FAILED};

        //Act
        const finalState = episodeReducer(initalState, action);

        //Assert
        expect(finalState.episodesLoading).toBeFalsy();
        expect(finalState.episodesFetchError).toBeTruthy();
    })

    it('Should set episodes correctly', () => {
        //Arrange
        const initalState = {
            showEpisodes: [],
            episodesLoading: true,
            episodesFetchError: false
        };

        const action = {type: actionTypes.SET_EPISODES, showKey: 'TestShow', episodes: [{ShowName: 'Test Show', showKey: 'test-show'}, {ShowName: 'Test Show 2', showKey: 'test-show-2'}]};

        //Act
        const finalState = episodeReducer(initalState, action);

        //Assert
        expect(finalState.episodesLoading).toBeFalsy();
        expect(finalState.episodesFetchError).toBeFalsy();
        expect(finalState.showEpisodes.length).toBe(1);
        expect(finalState.showEpisodes.filter(x => x.showKey)[0].episodes.length).toBe(2);
        for(var episode of finalState.showEpisodes.filter(x => x.showKey)[0].episodes){
            expect(action.episodes.filter(x => x.ShowName === episode.ShowName && x.showKey === episode.showKey).length).toBe(1);
        }
    })

    it('Should not keep old episodes when updating', () => {
        //Arrange
        const initalState = {
            showEpisodes: [],
            episodesLoading: true,
            episodesFetchError: false
        };

        const action = {type: actionTypes.SET_EPISODES, showKey: 'TestShow', episodes: [{ShowName: 'Test Show', showKey: 'test-show'}, {ShowName: 'Test Show 2', showKey: 'test-show-2'}]};
        const actionUpdate = {type: actionTypes.SET_EPISODES, showKey: 'TestShow', episodes: [{ShowName: 'Test Show 3', showKey: 'test-show-3'}, {ShowName: 'Test Show 4', showKey: 'test-show-4'}]};

        //Act
        episodeReducer(initalState, action);
        const finalState = episodeReducer(initalState, actionUpdate);

        //Assert
        expect(finalState.episodesLoading).toBeFalsy();
        expect(finalState.episodesFetchError).toBeFalsy();
        expect(finalState.showEpisodes.length).toBe(1);
        expect(finalState.showEpisodes.filter(x => x.showKey)[0].episodes.length).toBe(2);
        for(var episode of finalState.showEpisodes.filter(x => x.showKey)[0].episodes){
            expect(actionUpdate.episodes.filter(x => x.ShowName === episode.ShowName && x.showKey === episode.showKey).length).toBe(1);
        }
        for(var episode of finalState.showEpisodes.filter(x => x.showKey)[0].episodes){
            expect(action.episodes.filter(x => x.ShowName === episode.ShowName && x.showKey === episode.showKey).length).toBe(0);
        }
    })
})