import { put } from "redux-saga/effects";
import axios from 'axios';
import * as actions from "../actions";
import authService from '../../containers/api-authorization/AuthorizeService';
import { stripHTMLTags, toHttps } from '../../shared/utilities/utilities';

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
        thumbnailUrl: toHttps(imgUrl),
        summary: show.summary
    }
}

export function* SetTVShowsSaga() {
    yield put(actions.fetchTvShowsStarted());
    try {

        let token = yield authService.getAccessToken();

        let header = configureAuthHeader(token);
        let response = yield axios.get('/api/tvshows', header)
        yield put(actions.setTvShows(response.data.result))

    }
    catch (err) {
        yield put(actions.fetchTvShowsFailed());
    }
}

export function* SubmitTvShowSaga(action) {
    let { show, key, closeDialog } = action;
    show.summary = stripHTMLTags(show.summary);
    try {
        yield put(actions.submitTvShowStarted());
        let token = yield authService.getAccessToken();
        let postData = configurePost(show, key);
        let header = configureAuthHeader(token);
        let response = yield axios.post('/api/tvshows', postData, header);
        yield put(actions.submitTvShow(response.data.result.tvShow));
        closeDialog();
    }
    catch (err) {
        yield put(actions.submitTvShowFailed())
    }

}

export function* DeleteTvShowSaga(action) {
    let { key, closeDialog } = action;
    yield put(actions.deleteTvShowStarted());
    try {
        let token = yield authService.getAccessToken()
        let header = configureAuthHeader(token);
        let response = yield axios.delete(`/api/tvshows?showKey=${key}`, header)
        yield put(actions.deleteTvShow(key));
        closeDialog();
    }
    catch (err) {
        yield put(actions.deleteTvShowFailed())
    }
}