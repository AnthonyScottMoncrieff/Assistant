import * as actionTypes from '../actions/actionTypes';
import tvShowsReducer from './tvShows';

describe('TV Shows Reducer tests', () => {
    const getInitialState = (shows=[], 
        tvShowFetchError=false, 
        tvShowsLoading=false, 
        tvShowSubmissionLoading=false, 
        tvShowSubmissionError=false, 
        tvShowDeletionLoading=false, 
        tvShowDeletionError=false) => ({

        shows,
        tvShowFetchError,
        tvShowsLoading,
    
        tvShowSubmissionLoading,
        tvShowSubmissionError,
    
        tvShowDeletionLoading,
        tvShowDeletionError
    })

    it('Set Tv Shows should correctly set shows', () => {
        //Arrange
        const shows = [{showName: 'TestShow 1'},{showName: 'TestShow 2'}];
        const initialState = getInitialState([], true, true);
        const action = {type: actionTypes.SET_TVSHOWS, shows: shows};

        //Act
        const responseState = tvShowsReducer(initialState, action);

        //Assert
        expect(responseState.shows.length).toBe(shows.length);
        for(var show of responseState.shows){
            expect(responseState.shows.filter(x => x.showName === show.showName).length).toBe(1);
        }
        expect(responseState.tvShowFetchError).toBeFalsy();
        expect(responseState.tvShowsLoading).toBeFalsy();
    })

    it('Submit Tv Show should correctly submit tv show', () => {
        //Arrange
        const shows = [{showName: 'TestShow 1'},{showName: 'TestShow 2'}];
        const initialState = getInitialState(shows, false, false, true, true);
        const newShow = {showName: 'TestShow 3'}
        const action = {type: actionTypes.SUBMIT_TVSHOW, show: newShow};

        //Act
        const responseState = tvShowsReducer(initialState, action);

        //Assert
        expect(responseState.shows.length).toBe(shows.length + 1);
        expect(responseState.shows.filter(x => x.showName === newShow.showName).length).toBe(1);
        expect(responseState.tvShowSubmissionError).toBeFalsy();
        expect(responseState.tvShowSubmissionLoading).toBeFalsy();
    })

    it('Delete Tv Show should correctly delete tv show', () => {
        //Arrange
        const shows = [{showKey: 'test-show-1'},{showKey: 'test-show-2'}, {showKey: 'test-show-3'}];
        const initialState = getInitialState(shows, false, false, false, false, true, true);
        const showToDelete = {showKey: 'test-show-3'}
        const action = {type: actionTypes.DELETE_TVSHOW, showKey: showToDelete.showKey};

        //Act
        const responseState = tvShowsReducer(initialState, action);

        //Assert
        expect(responseState.shows.length).toBe(shows.length - 1);
        expect(responseState.shows.filter(x => x.showKey === showToDelete.showKey).length).toBe(0);
        expect(responseState.tvShowDeletionLoading).toBeFalsy();
        expect(responseState.tvShowDeletionError).toBeFalsy();
    })

    it('Fetch Tv Shows Started should update appropriately', () => {
        //Arrange
        const initialState = getInitialState([], true, false);
        const action = {type: actionTypes.FETCH_TVSHOWS_STARTED};

        //Act
        const responseState = tvShowsReducer(initialState, action);

        //Assert
        expect(responseState.tvShowFetchError).toBeFalsy();
        expect(responseState.tvShowsLoading).toBeTruthy();
    })

    it('Fetch Tv Shows Failed should update appropriately', () => {
        //Arrange
        const initialState = getInitialState([], true, false);
        const action = {type: actionTypes.FETCH_TVSHOWS_FAILED};

        //Act
        const responseState = tvShowsReducer(initialState, action);

        //Assert
        expect(responseState.tvShowFetchError).toBeTruthy();
        expect(responseState.tvShowsLoading).toBeFalsy();
    })

    it('Submit Tv Shows Started should update appropriately', () => {
        //Arrange
        const initialState = getInitialState([], false, false, false, true);
        const action = {type: actionTypes.SUBMIT_TVSHOW_STARTED};

        //Act
        const responseState = tvShowsReducer(initialState, action);

        //Assert
        expect(responseState.tvShowSubmissionLoading).toBeTruthy();
        expect(responseState.tvShowSubmissionError).toBeFalsy();
    })

    it('Submit Tv Shows Failed should update appropriately', () => {
        //Arrange
        const initialState = getInitialState([], false, false, true, false);
        const action = {type: actionTypes.SUBMIT_TVSHOW_FAILED};

        //Act
        const responseState = tvShowsReducer(initialState, action);

        //Assert
        expect(responseState.tvShowSubmissionError).toBeTruthy();
        expect(responseState.tvShowSubmissionLoading).toBeFalsy();
    })

    it('Delete Tv Shows Started should update appropriately', () => {
        //Arrange
        const initialState = getInitialState([], false, false, false, false, false, true);
        const action = {type: actionTypes.DELETE_TVSHOW_STARTED};

        //Act
        const responseState = tvShowsReducer(initialState, action);

        //Assert
        expect(responseState.tvShowDeletionLoading).toBeTruthy();
        expect(responseState.tvShowDeletionError).toBeFalsy();
    })

    it('Delete Tv Shows Failed should update appropriately', () => {
        //Arrange
        const initialState = getInitialState([], false, false, false, false, true, false);
        const action = {type: actionTypes.DELETE_TVSHOW_FAILED};

        //Act
        const responseState = tvShowsReducer(initialState, action);

        //Assert
        expect(responseState.tvShowDeletionError).toBeTruthy();
        expect(responseState.tvShowDeletionLoading).toBeFalsy();
    })
})