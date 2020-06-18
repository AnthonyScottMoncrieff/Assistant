import React from 'react';
import { NavMenu } from '../../containers/NavMenu/NavMenu';

const layout = (props) => (
    <div data-test='Layout'>
        <NavMenu />
        {props.children}
    </div>
);

export default layout;