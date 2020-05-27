import axios from 'axios';
import * as actionTypes from './actionTypes';
import authService from '../../containers/api-authorization/AuthorizeService';
import { stripHTMLTags } from '../../shared/utilities/utilities';

const configureAuthHeader = (token) => {
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
}

const configurePost = (show, key) => {
    let imgUrl = show.image && show.image.medium ? show.image.medium : "";

    return {
        showName: show.name,
        showKey: key,
        thumbnailUrl: imgUrl,
        summary: show.summary
    }
}

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
    return dispatch => {
        dispatch(fetchTvShowsStarted());
        authService.getAccessToken()
            .then(token => {
                var header = configureAuthHeader(token);
                axios.get('/api/tvshows', header)
                    .then(response => {
                        dispatch(setTvShows(response.data.result))
                    })
                    .catch(_ => {
                        dispatch(fetchTvShowsFailed())
                    })
            })
    }
}
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
    show.summary = stripHTMLTags(show.summary);
    return dispatch => {
        dispatch(submitTvShowStarted());
        authService.getAccessToken()
            .then(token => {
                let postData = configurePost(show, key);
                let headers = configureAuthHeader(token);
                axios.post('/api/tvshows', postData, headers)
                    .then(response => {
                        dispatch(submitTvShow(response.data.result.tvShow));
                        closeDialog();
                    })
                    .catch(_ => {
                        dispatch(submitTvShowFailed())
                    })
            })
    }
}
/* END TvShow Submit Actions */