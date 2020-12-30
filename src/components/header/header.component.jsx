import React from 'react';
import {ReactComponent as HeaderLogo} from '../../assets/logo.svg'

import './header.styles.scss';

const Header = ({setIsAuth}) => (
    <div className='header-container'>
        <HeaderLogo id='header-logo'/>
        <button className='header-btn' onClick={() => setIsAuth(false)}>Log Out</button>
    </div>
)

export default Header;