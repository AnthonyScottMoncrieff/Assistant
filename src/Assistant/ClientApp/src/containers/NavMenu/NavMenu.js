import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoginMenu } from '../api-authorization/LoginMenu';
import styles from './NavMenu.module.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    state = {
        collapsed: true
    };

    toggleNavbar = () => {
        let width = window.innerWidth;

        this.setState({
            collapsed: width > 575 ? this.state.collapsed : !this.state.collapsed
        });
    }

    render() {

        return (
            <header>
                <Navbar className={`navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3 ${styles.Nav}`} light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">Assistant</NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/" onClick={this.toggleNavbar}>Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/tv-shows" onClick={this.toggleNavbar}>TV Shows</NavLink>
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