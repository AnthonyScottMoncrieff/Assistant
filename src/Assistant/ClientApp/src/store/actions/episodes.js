import axios from 'axios';
import * as actionTypes from './actionTypes';
import { stripHTMLTags } from '../../shared/utilities/utilities'

/* START Episode Actions */
export const fetchEpisodesStarted = () => {
    return {
        type: actionTypes.FETCH_EPISODES_STARTED
    };
}

export const fetchEpisodesFailed = () => {
    return {
        type: actionTypes.FETCH_EPISODES_FAILED
    };
};

export const setEpisodes = (episodes, showKey) => {
    return {
        type: actionTypes.SET_EPISODES,
        episodes: episodes,
        showKey: showKey
    }
}

export const setIsLoading = () => {
    return {
        type: actionTypes.SET_ISLOADING
    };
}

export const setNotIsLoading = () => {
    return {
        type: actionTypes.SET_NOT_ISLOADING
    };
}

export const initEpisodes = (showKey) => {
    return dispatch => {
        dispatch(fetchEpisodesStarted());
        axios.get(`https://api.tvmaze.com/singlesearch/shows?q=${showKey}&embed=episodes`)
            .then((response) => {
                let episodes = response.data._embedded.episodes.map(x => {return { ...x, summary: stripHTMLTags(x.summary) } });
                dispatch(setEpisodes(episodes, showKey));
            })
            .catch(error => {
                console.log(error);
                dispatch(fetchEpisodesFailed());
            })
    }
}
/* END Episode Actions */