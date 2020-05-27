import { updateObject } from '../../shared/utilities/utilities';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    shows: [],
    tvShowFetchError: false,
    tvShowsLoading: false,

    tvShowSubmissionLoading: false,
    tvShowSubmissionError: false
}

const setTvShows = (state, action) => {
    return updateObject(state, {
        shows: [...action.shows],
        tvShowFetchError: false,
        tvShowsLoading: false
    })
}

const submitTvShow = (state, action) => {
    return updateObject(state, {
        shows: [...state.shows, action.show],
        tvShowSubmissionError: false,
        tvShowSubmissionLoading: false
    })
}

const fetchTvShowsStarted = (state) => {
    return updateObject(state, {tvShowFetchError: false, tvShowsLoading: true});
}

const fetchTvShowsFailed = (state) => {
    return updateObject(state, {tvShowFetchError: true, tvShowsLoading: false});
}

const submitTvShowsStarted = (state) => {
    return updateObject(state, {tvShowSubmissionError: false, tvShowSubmissionLoading: true});
}

const submitTvShowsFailed = (state) => {
    return updateObject(state, {tvShowSubmissionError: true, tvShowSubmissionLoading: false});
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_TVSHOWS: return setTvShows(state, action);
        case actionTypes.FETCH_TVSHOWS_STARTED: return fetchTvShowsStarted(state);
        case actionTypes.FETCH_TVSHOWS_FAILED: return fetchTvShowsFailed(state);
        case actionTypes.SUBMIT_TVSHOW: return submitTvShow(state, action);
        case actionTypes.SUBMIT_TVSHOW_STARTED: return submitTvShowsStarted(state);
        case actionTypes.SUBMIT_TVSHOW_FAILED: return submitTvShowsFailed(state);
        default: return state;
    }
}

export default reducer;