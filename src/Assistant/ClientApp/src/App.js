import React, { Component } from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import AuthorizeRoute from './containers/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './containers/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './containers/api-authorization/ApiAuthorizationConstants';
import './custom.css'

//Comment when using async
import TvShowRangeManager from './containers/TvShowContainers/TvShowRangeManager/TvShowRangeManager';
import FullTvShowManager from './containers/TvShowContainers/FullTvShowManager/FullTvShowManager'


//import asyncComponent from './hoc/asyncComponent/asyncComponent';

//Async loading for production (IISExpress is very slow loading chunks (or anything for that matter))
// const asyncTvShowRangeManager = asyncComponent(() => {
//     return import('./containers/TvShowContainers/TvShowRangeManager/TvShowRangeManager');
// })

// const asyncFullTvShowManager = asyncComponent(() => {
//     return import('./containers/TvShowContainers/FullTvShowManager/FullTvShowManager');
// })

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <AuthorizeRoute exact path='/' component={Home} />
                <AuthorizeRoute exact path='/tv-shows' component={TvShowRangeManager} />
                <AuthorizeRoute exact path='/tv-shows/:showKey' component={FullTvShowManager} />
                <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
            </Layout>
        );
    }
}