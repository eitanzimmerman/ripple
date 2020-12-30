import React, {useRef, useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

import './tracklist-container.styles.scss';

import TrackListItem from '../tracklist-item/tracklist-item.component';


const TrackList = ({ trackList, token }) => {
    const [currentPlaying, setCurrentPlaying] = useState(null);
    const spotifyApi = new SpotifyWebApi();
    
    const handlePlayTrack = (track) => {
      spotifyApi.setAccessToken(token);
      spotifyApi.play({uris:[track.uri]})
      .then(res => {
          setCurrentPlaying(track);
      })
      .catch(e => console.log(e))
  }

  useEffect(() => {
    spotifyApi.setAccessToken(token);
    spotifyApi.getMyCurrentPlayingTrack()
    .then(response => {
      if(response) {
        console.log(response, "hi")
        setCurrentPlaying(response.item)
      }
    })
    .catch(e => console.log(e))
  },[]);


  const handlePushToQueue = () => {
    if (trackList.length > 0) {
      const urisList  = trackList.map(item => item.uri);
      spotifyApi.setAccessToken(token);
      spotifyApi.play({uris : urisList})
      .then((response) => {
        console.log(response)
      })
      .catch(e => console.log(e))
    }
    return
  }
  console.log(trackList)


    const totalDurationMs = trackList.reduce((a, b) => a + b.duration_ms, 0);
    const min = Math.floor(totalDurationMs / 60000);
    const sec = ((totalDurationMs % 60000) / 1000).toFixed(0);
    return (
    <div className="tracklist" style={{position:"relative"}}>
      <div className="tracklist-header">
        <h1 >
          TrackList
        </h1>
        <span style={{ fontSize: "1.7rem", color: "white", marginRight: "1rem" }}>
              {trackList.length} tracks <span style={{ marginLeft: "2rem" }}>{`${min} : ${sec}`}</span>
        </span>
      </div>
      <div style={{display:"flex",position:"sticky", top:"1%", height:"10rem", backgroundColor:"#e6e6e6", width:"100%", zIndex:"100", backgroundSize:"cover", backgroundPosition:"center"}}>
          <div style={{display:"flex", alignItems:"center", flex:"0 0 30%", backgroundColor:"#ebf6fff8", justifyContent:"center"}}>
            <button onClick={handlePushToQueue}  style={{cursor:"pointer", color:"white",backgroundColor:"#344050",fontFamily:"Ubuntu", fontSize:"1.7rem", padding:"1.2rem", borderRadius:"3rem" ,maxWidth:"20rem", width:"100%", border:"none", outline:"none"}}>Push all to queue</button>
          </div>
          <div style={{flex:"1 1", display:"flex", alignItems:"center",backgroundColor:"#344050"}}>
            <div style={{marginLeft:"2rem",borderRadius:"1rem", backgroundImage:`url(${currentPlaying ? currentPlaying.album.images[0].url : ""})`, width:"8.5rem", height:"8.5rem", backgroundSize:"cover"}}/>
            {
              currentPlaying ? 
              <div style ={{display:"flex", alignItems:"baseline"}}>
                <h1 style={{ color:"white",marginLeft:"2rem", marginRight:"1rem", fontSize:"2.3rem"}}>{currentPlaying.name}</h1>
                <h2 style={{color:"white", fontWeight:"300", fontSize:"1.6rem"}}>{currentPlaying.artists[0].name}</h2>
              </div>
              :
              <h1 style={{ color:"white",marginLeft:"2rem", marginRight:"1rem", fontSize:"2.3rem"}}>Nothing currently playing</h1>
            }
            
          </div>

      </div>
      <ul className="tracklist-body">
        {trackList.map((track) => {
          return <TrackListItem key={track.id} track={track} playTrack={handlePlayTrack}/>
        })}
      </ul>
    </div>)
};

export default TrackList;