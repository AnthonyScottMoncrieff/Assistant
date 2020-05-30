import React, { Component } from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import AuthorizeRoute from './containers/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './containers/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './containers/api-authorization/ApiAuthorizationConstants';

import './custom.css'
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncTvShowRangeManager = asyncComponent(() => {
    return import('./containers/TvShowContainers/TvShowRangeManager/TvShowRangeManager');
})

const asyncFullTvShowManager = asyncComponent(() => {
    return import('./containers/TvShowContainers/FullTvShowManager/FullTvShowManager');
})

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <AuthorizeRoute exact path='/tv-shows' component={asyncTvShowRangeManager} />
                <AuthorizeRoute exact path='/tv-shows/:showKey' component={asyncFullTvShowManager} />
                <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
            </Layout>
        );
    }
}