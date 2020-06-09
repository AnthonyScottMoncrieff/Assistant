import React from 'react';
import { NavMenu } from '../../containers/NavMenu/NavMenu';

const layout = (props) => (
    <div>
        <NavMenu />
        {props.children}
    </div>
);

export default layout;