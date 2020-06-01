import { updateObject } from '../../shared/utilities/utilities';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    shows: [],
    tvShowFetchError: false,
    tvShowsLoading: false,

    tvShowSubmissionLoading: false,
    tvShowSubmissionError: false,

    tvShowDeletionLoading: false,
    tvShowDeletionError: false
}

const setTvShows = (state, action) => {
    return updateObject(state, {
        shows: [...action.shows],
        tvShowFetchError: false,
        tvShowsLoading: false
    })
}

const submitTvShow = (state, action) => {
    if(state.shows.filter(x => x.showKey === action.show.showKey).length > 0)
        return state;
    return updateObject(state, {
        shows: [...state.shows, action.show],
        tvShowSubmissionError: false,
        tvShowSubmissionLoading: false
    })
}

const deleteTvShow = (state, action) => {
    return updateObject(state, {
        shows: state.shows.filter(x => x.showKey !== action.showKey),
        tvShowDeletionLoading: false,
        tvShowDeletionError: false
    })
}

const fetchTvShowsStarted = (state) => {
    return updateObject(state, { tvShowFetchError: false, tvShowsLoading: true });
}

const fetchTvShowsFailed = (state) => {
    return updateObject(state, { tvShowFetchError: true, tvShowsLoading: false });
}

const submitTvShowsStarted = (state) => {
    return updateObject(state, { tvShowSubmissionError: false, tvShowSubmissionLoading: true });
}

const submitTvShowsFailed = (state) => {
    return updateObject(state, { tvShowSubmissionError: true, tvShowSubmissionLoading: false });
}

const deleteTvShowsStarted = (state) => {
    return updateObject(state, { tvShowDeletionError: false, tvShowDeletionLoading: true });
}

const deleteTvShowsFailed = (state) => {
    return updateObject(state, { tvShowDeletionError: true, tvShowDeletionLoading: false });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_TVSHOWS: return setTvShows(state, action);
        case actionTypes.FETCH_TVSHOWS_STARTED: return fetchTvShowsStarted(state);
        case actionTypes.FETCH_TVSHOWS_FAILED: return fetchTvShowsFailed(state);
        case actionTypes.SUBMIT_TVSHOW: return submitTvShow(state, action);
        case actionTypes.SUBMIT_TVSHOW_STARTED: return submitTvShowsStarted(state);
        case actionTypes.SUBMIT_TVSHOW_FAILED: return submitTvShowsFailed(state);
        case actionTypes.DELETE_TVSHOW: return deleteTvShow(state, action);
        case actionTypes.DELETE_TVSHOW_STARTED: return deleteTvShowsStarted(state);
        case actionTypes.DELETE_TVSHOW_FAILED: return deleteTvShowsFailed(state);
        default: return state;
    }
}

export default reducer;