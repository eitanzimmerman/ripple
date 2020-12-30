import React,{useState, useEffect} from 'react';

import {debounce} from '../../utils/utils';


import Header from '../header/header.component';
import Hero from '../hero/hero.component';
import ControlPanel from '../control-panel/control-panel.component';

import './mainApp.styles.scss';

const MainApp = ({userName, token, setIsAuth}) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const debouncedHandlrWidth = debounce(function handleWidth () {
            setWindowWidth(window.innerWidth)
        }, 500)
        window.addEventListener('resize', debouncedHandlrWidth)

        return _ => window.removeEventListener('resize', debouncedHandlrWidth);
    })




    return (
        <div className='app-root' style={{background:'#181e26', minHeight: "100vh", width: `${windowWidth > 1200 ? "80%" : "100%"}`}}>
            <Header setIsAuth={setIsAuth}/>
            <Hero/>
            <ControlPanel windowWidth={windowWidth} token={token}/>
        </div>
    )
}

export default MainApp;