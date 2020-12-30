import React, {Fragment} from 'react';
import {ReactComponent as LogoComponent} from '../../assets/logo.svg';
import './landing.styles.scss';

const LandingComponent = ({handleClick}) => {
    return(
<Fragment>
<LogoComponent id='landing-logo'/>
<div className='landing-container'>
    <div className='bg-box' id="bg-1"/>
    <div className='bg-box' id="bg-2"/>
</div>
<h1 id='landing-title'>Discover the continuing and spreading of your playlists.</h1>
<button id="landing-btn" onClick={handleClick}>login to spotify</button>
</Fragment>
)}

export default LandingComponent;