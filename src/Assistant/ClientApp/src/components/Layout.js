import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

const layout = (props) => (
    <div>
        <NavMenu />
        <Container>
            {props.children}
        </Container>
    </div>
);

export default layout;