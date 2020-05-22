import { updateObject } from '../../shared/utilities/utilities';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    shows: []
}

const setTvShows = (state, action) => {
    return updateObject(state, {
        shows: [...action.shows]
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SET_TVSHOWS: return setTvShows(state, action);
    }
}

export default reducer;