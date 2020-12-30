import React, {useState} from 'react';
import {ReactComponent as PlayIcon} from '../../assets/play3.svg';
import './tracklist-item.styles.scss';


const TrackListItem = ({track, playTrack}) => {
    const [isIconShown , showIcon] = useState(false)
    const min = Math.floor(track.duration_ms / 60000);
    const sec = ((track.duration_ms % 60000) / 1000).toFixed(0);
   

    return(
    <li className="tracklist-item">
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          className="tracklist-item-image"
          onMouseEnter={() => showIcon(true)}
          onMouseLeave={() => showIcon(false)}
          onClick={() => playTrack(track)}
          style={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            backgroundSize: "cover",
            backgroundImage: `url(${track.album.images.length > 0 ? track.album.images[0].url : ""})`,
            backgroundPosition: "center",
          }}
        >
        {
          isIconShown ? <PlayIcon id="play-icon"/> : null
        }
        </div>
        
        
        <div className="tracklist-item-titles">
          <h1>{track.name.split("").slice(0, 15).join("")}</h1>
          <h2>{track.artists[0].name.split("").slice(0, 10).join("")}</h2>
        </div>
      </div>
      <div className="tracklist-item-details">
        <span style={{ color: "white", fontSize: "1.4rem" }}>
          {`${min} : ${sec}`}
        </span>
        <span
          style={{
            color: "white",
            fontSize: "1.4rem",
            marginLeft: "2rem",
          }}
        >
          Preview
        </span>
      </div>
      <div className="tracklist-item-border" />
    </li>
    );
}

export default TrackListItem;