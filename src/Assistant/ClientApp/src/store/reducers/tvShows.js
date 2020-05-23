import { updateObject } from '../../shared/utilities/utilities';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    shows: [],
    tvShowFetchError: false,
    tvShowsLoading: false
}

const setTvShows = (state, action) => {
    return updateObject(state, {
        shows: [...action.shows],
        tvShowFetchError: false,
        tvShowsLoading: false
    })
}

const fetchTvShowsStarted = (state) => {
    return updateObject(state, {tvShowFetchError: false, tvShowsLoading: true});
}

const fetchTvShowsFailed = (state) => {
    return updateObject(state, {tvShowFetchError: true, tvShowsLoading: false});
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_TVSHOWS: return setTvShows(state, action);
        case actionTypes.FETCH_TVSHOWS_STARTED: return fetchTvShowsStarted(state);
        case actionTypes.FETCH_TVSHOWS_FAILED: return fetchTvShowsFailed(state);
        default: return state;
    }
}

export default reducer;