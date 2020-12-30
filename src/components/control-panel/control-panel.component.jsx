import React, {useState, useEffect} from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

import './control-panel.styles.scss';

import SearchContainer from '../search-container/search-container.component';
import FavoritesOverview from '../favorites-overview/favorites-overview.component';
import Recommendations from '../recommendations/recommendations.component';
import TrackList from '../tracklis-container/tracklist-container.component';
import TrackSettings from '../tracks-settings/tracks-settings.component';

const ControlPanel = ({token, windowWidth}) => {

    // STATE
    const [topic, setTopic] = useState('artists');
    const [metaData, setMetaData] = useState({
        items : [],
        type : '',
        searchType : '',
        searchLimit: 5,
    })
    const [recommendationsData, setRecomendationsData] = useState(
        Boolean(sessionStorage.getItem("recommendationsData")) ?
        JSON.parse(sessionStorage.getItem("recommendationsData"))
        :
        []
        );
    const [trackList, setTrackList] = useState([])
    const [settingsObj, setSettings] = useState(
        Boolean(sessionStorage.getItem("settingsObj")) ?
        JSON.parse(sessionStorage.getItem("settingsObj"))
        :{
        popularity: "100",
        energy: "0.5",
        dancable:"0.5",
        mood:"0.5",
        acousticness:"0.5"
    })   
    
    


    const spotifyApi = new SpotifyWebApi();
    
    // EFFECTS 

    // Effect for fetching favorites artists and tracks from spotify
    useEffect(() => {
        spotifyApi.setAccessToken(token);
        if (topic === 'artists') {
            spotifyApi.getMyTopArtists({limit : 5})
            .then(response => {
                const items = response.items.map(item => {
                    const itemObj = {
                        name : item.name,
                        id : item.id,
                        images : item.images,
                        type:'artists'
                    }
                    return itemObj;
                })
                setMetaData({
                    ...metaData,
                    items : items,
                    type : 'artists',
                    searchType: 'artist'
                })
            })
            .catch(er => console.log(er))
        }

        if (topic === 'tracks') {
            spotifyApi.getMyTopTracks({limit : 5})
            .then(response => {
                const items = response.items.map((item) =>{
                    const itemObj = {
                        name : item.name,
                        id : item.id,
                        images : item.album.images,
                        type:'tracks'
                    }
                    return itemObj
                })
                setMetaData({
                    ...metaData,
                    items : items,
                    type : 'tracks',
                    searchType: 'track'
                })
            })
            .catch(er => console.log(er))
        }
    }, [topic])

    // Effect for storing recommendationData in sessionStorgae in case user refres the page
    useEffect(() => {
        sessionStorage.setItem("recommendationsData", JSON.stringify(recommendationsData))
    }, [recommendationsData])

    //Effect for storing settings data in case use refresh page
    useEffect(() => {
        sessionStorage.setItem("settingsObj", JSON.stringify(settingsObj))
    }, [settingsObj])
    
    // Effect for fetching recommendations playlist
    useEffect(() => {
        spotifyApi.setAccessToken(token);
        const timer = setTimeout(() => {
            console.log("happend")
            if (recommendationsData.length > 0) {
                const artistIds = recommendationsData.filter(item => item.type === "artists").map(artist => {
                    return artist.id
                })
                const tracksIds = recommendationsData.filter(item => item.type === "tracks").map(track => {
                   return track.id
                });
                const settings = {
                    target_acousticness : Number(settingsObj.acousticness),
                    target_dancebility : Number(settingsObj.dancable),
                    target_energy : Number(settingsObj.energy),
                    target_valence: Number(settingsObj.mood),
                    target_popularity: Number(settingsObj.popularity)
    
                }
                spotifyApi.getRecommendations({ seed_artists: artistIds, seed_tracks: tracksIds, limit:30, ...settings})
                .then(response => {
                    setTrackList(response.tracks)
                })
                .catch(e => console.log(e))
            }

        }, 300)
        
        return () => clearTimeout(timer)
        
    }, [recommendationsData, settingsObj])


    useEffect(() => {
        spotifyApi.setAccessToken(token);
        spotifyApi.getMyCurrentPlayingTrack()
        .then(response => console.log(response, "hi"))
        .catch(e => console.log(e,"by"))
    },[])
    // HANDLERS
    const handleAddToRecommendations = (id, type, name) => {
        const isIncluded = recommendationsData.find(item => item.id === id)
        if(recommendationsData.length < 5 && !isIncluded) {
            const item = {
                id,
                type,
                name,
            }
            const updatedList = [...recommendationsData, item];
            setRecomendationsData(updatedList);
        } 
    }

    const handleRemoveFromRecommendations = (id) => {
        const updatedList = recommendationsData.filter(item => item.id != id);
        setRecomendationsData(updatedList);
    }

    const handleSettingsChanged = (event) => {
        const {name, value} = event.target
        setSettings({
            ...settingsObj,
            [name]: value
        })
    }

    

  

    //STYLES (DYNAMIC || )

    const selectedStyle = {
        color:"#9dc9ce",
        borderBottom:"1px solid #9dc9ce"
    }


    return (
        <React.Fragment>
            <div style={{width:"100%", display:"flex", justifyContent:"space-around", marginTop:"7rem"}}>
                <h1 style={topic === 'artists' ? selectedStyle : null} className="topic-title" id='artists' onClick={() => setTopic('artists')}>Artists</h1>
                <h1 style={topic === 'tracks' ? selectedStyle : null} className="topic-title" id='tracks' onClick={() => setTopic('tracks')}>Tracks</h1>
            </div>
            <SearchContainer addItem={handleAddToRecommendations} disableSearch={recommendationsData.length >= 5} searchTopic={topic} token={token}/>
            <div id="favorites-title"><h3>{topic.charAt(0).toUpperCase() +topic.slice(1)} you`ve listened to recently on spotify.</h3></div>
            <FavoritesOverview addItem={handleAddToRecommendations} items={metaData.items} windowWidth={windowWidth}/>
            <div style={{marginTop:"1rem" ,width:"100%", borderBottom:'1px solid #a3dbcb6c'}}/>
            <Recommendations recommendationsData={recommendationsData} removeItem={handleRemoveFromRecommendations}/>
            <div style={{display:"flex", flexDirection:`${windowWidth > 900 ? "row-reverse" : "column"}`}}>
                <div style={{flex:"0 0 40%", display:"flex", flexDirection:"column", marginTop:"3rem"}}>
                    {/* <div style={{marginBottom:"1rem", marginLeft:"2rem", marginRight:"2rem",backgroundColor:"#b3b3b346", border:"1px solid #fffa", padding:"1.5rem", borderRadius:"1rem"}}>
                       create playlist container 
                    </div> */}
                    <TrackSettings windowWidth={windowWidth} settingsObj={settingsObj} handleSettingsChanged={handleSettingsChanged}/>
                </div>
                <TrackList trackList={trackList} token={token}/>
            </div>
        </React.Fragment>
    )
}

export default ControlPanel;