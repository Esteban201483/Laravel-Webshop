import Menu from './Menu';

import {isAuthenticated} from '../services/authentication';

import './layouts.css';

export default function Header(){ 

    const authenticated = isAuthenticated();
    return(
        <>
            <div id="header"></div>
            <Menu isAuthenticated={authenticated}></Menu>
        </>
    );
}