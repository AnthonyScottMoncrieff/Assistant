import { takeEvery, all } from "redux-saga/effects";
import * as actionTypes from '../actions/actionTypes';
import { InitEpisodesSaga } from './episodes';
import { SetTVShowsSaga, SubmitTvShowSaga, DeleteTvShowSaga } from './tvShows';

export function* watchEpisodes(){
    yield all([
        takeEvery(actionTypes.INIT_EPISODES_SAGA, InitEpisodesSaga)
    ]);
}

export function* watchTvShows(){
    yield all([
        takeEvery(actionTypes.SET_TVSHOWS_SAGA, SetTVShowsSaga),
        takeEvery(actionTypes.SUBMIT_TVSHOW_SAGA, SubmitTvShowSaga),
        takeEvery(actionTypes.DELETE_TVSHOW_SAGA, DeleteTvShowSaga)
    ]);
}