import React, { Component, Fragment } from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import authService from './AuthorizeService';
import { ApplicationPaths } from './ApiAuthorizationConstants';
import classes from './Styles/LoginMenu.module.css';

export class LoginMenu extends Component {

    state = {
        isAuthenticated: false,
        userName: null
    }

    componentDidMount() {
        this._subscription = authService.subscribe(() => this.populateState());
        this.populateState();
    }

    componentWillUnmount() {
        authService.unsubscribe(this._subscription);
    }

    async populateState() {
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
        this.setState({
            isAuthenticated,
            userName: user && user.name
        });
    }

    render() {
        const { isAuthenticated, userName } = this.state;
        if (!isAuthenticated) {
            const registerPath = `${ApplicationPaths.Register}`;
            const loginPath = `${ApplicationPaths.Login}`;
            return this.anonymousView(registerPath, loginPath);
        } else {
            const profilePath = `${ApplicationPaths.Profile}`;
            const logoutPath = { pathname: `${ApplicationPaths.LogOut}`, state: { local: true } };
            return this.authenticatedView(userName, profilePath, logoutPath);
        }
    }

    authenticatedView(userName, profilePath, logoutPath) {
        return (<Fragment>
            <NavItem>
                <NavLink tag={RRNavLink} activeClassName={classes.Active} className="text-dark" to={profilePath} onClick={this.props.navClicked}>Account</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={RRNavLink} activeClassName={classes.Active} className="text-dark" to={logoutPath} onClick={this.props.navClicked}>Logout</NavLink>
            </NavItem>
        </Fragment>);
    }

    anonymousView(registerPath, loginPath) {
        return (<Fragment>
            <NavItem>
                <NavLink tag={RRNavLink} activeClassName={classes.Active} className="text-dark" to={registerPath} onClick={this.props.navClicked}>Register</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={RRNavLink} activeClassName={classes.Active} className="text-dark" to={loginPath} onClick={this.props.navClicked}>Login</NavLink>
            </NavItem>
        </Fragment>);
    }
}