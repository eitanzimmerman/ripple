import React from 'react';

import FavoriteCard from '../FavoriteCard/favorite-card.component';

const FavoritesOverview = ({items, windowWidth, addItem}) => (
    <div className="favorites-display" style={{display:"flex", width:"100%", marginTop:"1rem"}}>
            
                    {
                        items ? 
                        items.map(item => {
                            return (
                                <FavoriteCard  key={item.id} addItem={()=>addItem(item.id, item.type, item.name)} windowWidth={windowWidth} imageUrl={item.images[1].url} name={item.name}/>
                            )
                        })
                        :
                        null

                    }

               
            </div>
)


export default FavoritesOverview;