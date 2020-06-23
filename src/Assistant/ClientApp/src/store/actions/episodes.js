import * as actionTypes from './actionTypes';

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
    return {
        type: actionTypes.INIT_EPISODES_SAGA,
        showKey
    }
}
/* END Episode Actions */