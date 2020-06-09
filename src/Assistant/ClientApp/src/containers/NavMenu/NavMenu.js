import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link, NavLink as RRNavLink } from 'react-router-dom';
import { LoginMenu } from '../api-authorization/LoginMenu';
import classes from './NavMenu.module.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    state = {
        collapsed: true,
        shouldShowShadow: false
    };

    componentDidMount = () => {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount = () => {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        let scrollPosition = window.scrollY;
        if(scrollPosition === 0)
            this.setState({shouldShowShadow: false});
        else
            this.setState({shouldShowShadow: true});
    }

    toggleNavbar = () => {
        let width = window.innerWidth;

        this.setState({
            collapsed: width > 575 ? this.state.collapsed : !this.state.collapsed
        });
    }

    render() {

        let shadow = this.state.shouldShowShadow ? classes.Shadow : classes.NoShadow;

        return (
            <header className={classes.Header}>
                <Navbar className={`navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3 ${classes.Nav} ${classes.FixedNav} ${shadow}`} light>
                    <Container>
                        <NavbarBrand className={classes.Brand} tag={Link} to="/">A</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink exact tag={RRNavLink} activeClassName={classes.Active} className="text-dark" to="/" onClick={this.toggleNavbar}>Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink exact tag={RRNavLink} activeClassName={classes.Active} className="text-dark" to="/tv-shows" onClick={this.toggleNavbar}>TV Shows</NavLink>
                                </NavItem>
                                <LoginMenu navClicked={this.toggleNavbar} />
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}