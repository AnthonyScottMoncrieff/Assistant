import React, { Component } from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import { FetchData } from './containers/FetchData/FetchData';
import { Counter } from './containers/Counter/Counter';
import AuthorizeRoute from './containers/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './containers/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './containers/api-authorization/ApiAuthorizationConstants';

import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/counter' component={Counter} />
                <AuthorizeRoute path='/fetch-data' component={FetchData} />
                <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
            </Layout>
        );
    }
}