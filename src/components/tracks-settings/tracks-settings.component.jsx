import React,{useState, useEffect} from 'react';

import {ReactComponent as CtrlIcon} from '../../assets/ctrl.svg';
import RangeInput from '../range-input/range-input.component';

import './tracks-settings.styles.scss';


const TrackSettings = ({windowWidth, settingsObj, handleSettingsChanged}) => {
    const [isSettingShown,ToggleSettings] = useState(true);
    
   

    useEffect(()=> {
        if (windowWidth < 900) {
            ToggleSettings(false);
        }
        return () => ToggleSettings(true);
    }, [windowWidth]);

    

    return (
      <div className="settings-container" >
        {windowWidth < 900 ? (
          <div className="toggle-settings-visibility">
            <h2>
              {isSettingShown ? "Hide tracks settings" : "Show tracks settings"}
            </h2>
            <CtrlIcon
              className="ctrl-icon"
              style={{
                transform: `rotate(${isSettingShown ? "180deg" : "0deg"})`,
              }}
              onClick={() => ToggleSettings(!isSettingShown)}
            />
          </div>
        ) : null}

        {isSettingShown ? (
          <div style={{ width: "100%" }}>
            <RangeInput
              mainTitle="Popularity"
              minTitle="Playing at bars"
              maxTitle="World Tour"
              min="0"
              max="100"
              steps="1"
              name="popularity"
              value={settingsObj.popularity}
              onChangeHandler={handleSettingsChanged}
            />
            <RangeInput
              mainTitle="Energy"
              minTitle="Bach like"
              maxTitle="Death Metal"
              min="0"
              max="1"
              steps="0.01"
              name="energy"
              value={settingsObj.energy}
              onChangeHandler={handleSettingsChanged}
            />
            <RangeInput
              mainTitle="Dancable"
              minTitle="Stay Seated"
              maxTitle="Disco"
              min="0"
              max="1"
              steps="0.01"
              name="dancable"
              value={settingsObj.dancable}
              onChangeHandler={handleSettingsChanged}
            />
            <RangeInput
              mainTitle="Mood"
              minTitle="Downer"
              maxTitle="Upper"
              min="0"
              max="1"
              steps="0.01"
              name="mood"
              value={settingsObj.mood}
              onChangeHandler={handleSettingsChanged}
            />
            <RangeInput
              mainTitle="Acousticness"
              minTitle="Synthizied"
              maxTitle="Pure Acousticness"
              min="0"
              max="1"
              steps="0.01"
              name="acousticness"
              value={settingsObj.acousticness}
              onChangeHandler={handleSettingsChanged}
            />
          </div>
        ) : null}
      </div>
    );

}

export default TrackSettings;