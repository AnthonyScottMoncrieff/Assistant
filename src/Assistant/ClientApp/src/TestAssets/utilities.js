import checkPropTypes from 'check-prop-types';
import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware, combineReducers } from 'redux';
import tvShows from '../store/reducers/tvShows';
import episodes from '../store/reducers/episodes';

export const testStore = (initialState) => {
    const rootReducer = combineReducers({
        tvShows: tvShows,
        episodes: episodes
    });
    const sagaMiddleware = createSagaMiddleware();
    const createStoreWithMiddleware = applyMiddleware([sagaMiddleware])(createStore);
    return createStoreWithMiddleware(rootReducer, initialState);
}

export const findByTestAtrr = (component, attr) => {
    const wrapper = component.find(`[data-test='${attr}']`);
    return wrapper;
};

export const checkProps = (component, expectedProps) => {
    const propsErr = checkPropTypes(component.propTypes, expectedProps, 'props', component.name);
    return propsErr;
};