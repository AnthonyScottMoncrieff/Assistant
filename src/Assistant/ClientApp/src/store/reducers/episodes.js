import { updateObject } from '../../shared/utilities/utilities';
import * as actionTypes from '../actions/actionTypes';

const initalState = {
    showEpisodes: [],
    episodesLoading: true,
    episodesFetchError: false
}

const setEpisodes = (state, action) => {
    let updatedShow = {showKey: action.showKey, episodes: action.episodes };
    let shows = [...state.showEpisodes.filter(x => x.showKey !== action.showKey), updatedShow];
    return updateObject(state, {
        showEpisodes: shows,
        episodesFetchError: false,
        episodesLoading: false
    })
}

const fetchEpisodesStarted = (state) => {
    return updateObject(state, {episodesFetchError: false, episodesLoading: true});
}

const fetchEpisodesFailed = (state) => {
    return updateObject(state, {episodesFetchError: true, episodesLoading: false});
}

const setIsLoading = (state) => {
    return updateObject(state, {episodesLoading: true});
}

const setNotIsLoading = (state) => {
    return updateObject(state, {episodesLoading: false});
}

const reducer = (state = initalState, action) => {
    switch(action.type){
        case actionTypes.SET_ISLOADING: return setIsLoading(state);
        case actionTypes.SET_NOT_ISLOADING: return setNotIsLoading(state);
        case actionTypes.FETCH_EPISODES_STARTED: return fetchEpisodesStarted(state);
        case actionTypes.FETCH_EPISODES_FAILED: return fetchEpisodesFailed(state);
        case actionTypes.SET_EPISODES: return setEpisodes(state, action);
        default: return state;
    }
}

export default reducer;