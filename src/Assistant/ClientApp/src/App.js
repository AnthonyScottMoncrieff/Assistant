import React, { Component } from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import AuthorizeRoute from './containers/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './containers/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './containers/api-authorization/ApiAuthorizationConstants';
import TvShowRangeManager from './containers/TvShowRangeManager/TvShowRangeManager';
import FullTvShowManager from './containers/FullTvShowManager/FullTvShowManager';

import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <AuthorizeRoute exact path='/tv-shows' component={TvShowRangeManager} />
                <AuthorizeRoute exact path='/tv-shows/:showKey' component={FullTvShowManager} />
                <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
            </Layout>
        );
    }
}