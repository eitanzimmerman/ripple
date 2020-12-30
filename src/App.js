import React, {useEffect, useState} from 'react';

import axios from 'axios';
import  { getHashParams, generateRandomString } from './utils/utils';

import LandingComponent from './components/landing/landing.component';
import MainApp from './components/mainApp/mainApp.component';

import './App.styles.scss';

const App = () => {
  const [isAuth, setIsAuth] = useState(sessionStorage.getItem("isAuth") ? Boolean(sessionStorage.getItem("isAuth")) : false);
  const [userName, setUserName] = useState(sessionStorage.getItem("userName") ? sessionStorage.getItem("userName") : "");
  const [token, setToken] = useState(sessionStorage.getItem("token") ? sessionStorage.getItem("token") : "");

  useEffect(() => {
    const params = getHashParams();
    if (params && !isAuth) {
      const { access_token, state } = params;
      const storedState = localStorage.getItem("stateKey");
      if ( access_token && (state == null || state !== storedState )) {
        alert("there was problem with authentication")
      } else {

        if(access_token) {

          sessionStorage.setItem("token", access_token);
          setToken(access_token);
          localStorage.removeItem("stateKey");
          setIsAuth(true);
          sessionStorage.setItem("isAuth", "true");

          axios.get("https://api.spotify.com/v1/me",{
            headers: {
              Authorization : `Bearer ${access_token}`
            }
          }).then(response => {
            setUserName(response.data.display_name);
            sessionStorage.setItem("userName",response.data.display_name)
          })
        } else {
          alert("acess denied")
        }
      }
    } 
  },[isAuth])

  const handleUserAuth = () => {
    let url = "https://accounts.spotify.com/authorize";
    const clientId = "237c45c8b05b4037afcd51a0b631d374";
    const redirectURI = "http://localhost:3000/callback";
    const scope = 'user-read-private user-read-email user-read-recently-played user-top-read user-read-playback-state user-modify-playback-state';
    const state = generateRandomString(16);

    localStorage.setItem("stateKey", state)

    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(clientId);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirectURI);
    url += '&state=' + encodeURIComponent(state);
    url += '&show_dialog=true';
    window.location = url;
  }

  // const handleFetch = () => {
  //   spotifyApi.setAccessToken(token);
  //   spotifyApi.getMyTopTracks()
  //   .then(response => console.log(response)).catch(e =>console.log(e))
  // }

  return (
    <div style={{display:'flex', justifyContent:'center'}}>
      {isAuth ? 
      <MainApp token={token} userName={userName} setIsAuth={setIsAuth}/>
      : 
      <LandingComponent handleClick={handleUserAuth}/>
       }
    </div>
  );
}

export default App;
