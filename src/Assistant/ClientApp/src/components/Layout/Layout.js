import React from 'react';
import { NavMenu } from '../../containers/NavMenu/NavMenu';
import PropTypes from 'prop-types';

const layout = (props) => (
    <div data-test='Layout'>
        <NavMenu />
        {props.children}
    </div>
);

layout.propTypes = {
    children: PropTypes.node.isRequired
}

export default layout;