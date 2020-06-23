import { put } from "redux-saga/effects";
import axios from 'axios';
import * as actions from "../actions";
import { saveEpisodesToLocalstorage, getEpisodesFromLocalstorage } from '../../shared/utilities/episodeHelpers';
import { stripHTMLTags } from '../../shared/utilities/utilities'

export function* InitEpisodesSaga(action) {
    let showKey = action.showKey;
    yield put(actions.fetchEpisodesStarted());
    let savedEpisodes = getEpisodesFromLocalstorage(showKey);
    if (savedEpisodes !== null)
        yield put(actions.setEpisodes(savedEpisodes, showKey));
    else {
        try {
            let response = yield axios.get(`https://api.tvmaze.com/singlesearch/shows?q=${showKey}&embed=episodes`);
            let episodes = response.data._embedded.episodes.map(x => ({ ...x, summary: stripHTMLTags(x.summary) }));
            saveEpisodesToLocalstorage(episodes, showKey);
            yield put(actions.setEpisodes(episodes, showKey));
        }
        catch (err) {
            yield put(actions.fetchEpisodesFailed());
        }
    }
}