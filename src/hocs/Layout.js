import React, { Fragment} from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/Layout.css';

function layout(props) {
    return (
        <div className="Main">
        <Fragment>
            <Sidebar />
            {props.children}
        </Fragment>
        </div>
    )
}

export default layout;