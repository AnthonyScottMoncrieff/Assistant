import axios from 'axios';
import * as actionTypes from './actionTypes';
import authService from '../../containers/api-authorization/AuthorizeService';

/* START TvShow Actions */
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

const configureAuthHeader = (token) => {
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        }
      }
}

export const initTvShows = () => {
    return dispatch => {
        dispatch(fetchTvShowsStarted());
        authService.getAccessToken()
        .then(token => {
            var header = configureAuthHeader(token);
            axios.get('/api/tvshows', header)
            .then(response => {
                console.log(response.data);
                dispatch(setTvShows(response.data.result))
            })
            .catch(error => {
                console.log(error);
                dispatch(fetchTvShowsFailed())
            })
        })
    }
}
/* END TvShow Actions */

