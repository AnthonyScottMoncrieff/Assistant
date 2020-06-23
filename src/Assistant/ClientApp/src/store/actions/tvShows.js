import * as actionTypes from './actionTypes';

/* START TvShow Fetch Actions */
export const setTvShows = (shows) => {
    return {
        type: actionTypes.SET_TVSHOWS,
        shows: shows
    }
}

export const fetchTvShowsStarted = () => {
    return {
        type: actionTypes.FETCH_TVSHOWS_STARTED
    };
};

export const fetchTvShowsFailed = () => {
    return {
        type: actionTypes.FETCH_TVSHOWS_FAILED
    };
};

export const initTvShows = () => {
    return {
        type: actionTypes.SET_TVSHOWS_SAGA
    };
};
/* END TvShow Actions */

/* START TvShow Submit Actions */

export const submitTvShow = (show) => {
    return {
        type: actionTypes.SUBMIT_TVSHOW,
        show: show
    }
}

export const submitTvShowStarted = () => {
    return {
        type: actionTypes.SUBMIT_TVSHOW_STARTED
    };
};

export const submitTvShowFailed = () => {
    return {
        type: actionTypes.SUBMIT_TVSHOW_FAILED
    };
};

export const initTvShowSubmission = (show, key, closeDialog) => {
    return {
        type: actionTypes.SUBMIT_TVSHOW_SAGA,
        show,
        key,
        closeDialog
    }
}
/* END TvShow Submit Actions */

/* START TvShow delete Actions */

export const deleteTvShow = (showKey) => {
    return {
        type: actionTypes.DELETE_TVSHOW,
        showKey: showKey
    }
}

export const deleteTvShowStarted = () => {
    return {
        type: actionTypes.DELETE_TVSHOW_STARTED
    };
};

export const deleteTvShowFailed = () => {
    return {
        type: actionTypes.DELETE_TVSHOW_FAILED
    };
};

export const initTvShowDeletion = (key, closeDialog) => {
    return {
        type: actionTypes.DELETE_TVSHOW_SAGA,
        key,
        closeDialog
    };
};
/* END TvShow delete Actions */