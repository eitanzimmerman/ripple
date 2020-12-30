import React,{useEffect, useState, useRef} from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

import './search-container.styles.scss';

import SearchList from '../searchList/search-list.component';

const SearchContainer = ({token, searchTopic, addItem, disableSearch}) => {

    const [searchResults, setSearchReuslts] = useState([]);
    const [enteredQuery , setEnteredQuery] = useState("");
    const [isListShown, showList] = useState(false)

    const spotifyApi = new SpotifyWebApi();
    const inputRef = useRef();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (enteredQuery === inputRef.current.value && enteredQuery !== "") {

                spotifyApi.setAccessToken(token);
                if (searchTopic === "artists") {
                    spotifyApi.searchArtists(enteredQuery, {limit : 10})
                    .then(response => {
                        const results = response.artists.items.map(item => {
                            const resultObj = {
                                id: item.id,
                                name : item.name,
                                images: item.images,
                                type:"artists"
                            }
                            return resultObj
                        });
                        setSearchReuslts(results);

                    })
                    .catch(e => console.log(e))
                }

                if(searchTopic === 'tracks') {
                    spotifyApi.searchTracks(enteredQuery, {limit: 10})
                    .then(response => {
                        const results = response.tracks.items.map(item => {
                            const resultsObj = {
                                id: item.id,
                                name: item.name,
                                images: item.album.images,
                                type:"tracks"
                            }
                            return resultsObj;
                        });
                        setSearchReuslts(results)
                    })
                    .catch(e => console.log(e))
                }
            }
        },500);
        return () => clearTimeout(timer)
    },[enteredQuery, inputRef, setSearchReuslts]);
    
    return (
            <div  style={{position:"relative", display:"flex", justifyContent:"center", marginTop:"5rem"}}>
                <input disabled={disableSearch} className="search-bar" placeholder={ `Search by ${searchTopic.charAt(0).toUpperCase() + searchTopic.slice(1)}`} ref={inputRef} value={disableSearch ? "max of 5 items added" : enteredQuery} onClick={() => showList(true)} onChange={event => setEnteredQuery(event.target.value) } type="search"/>
                {
                    isListShown && searchResults.length > 0 ? 
                    <SearchList searchResults={searchResults} showList={showList} addItem={addItem}/>
                    :
                    null
                }
            </div>
    )


}

export default SearchContainer;