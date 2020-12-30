import React from 'react';

import './favorite-card.styles.scss';

const FavoriteCard = ({ windowWidth,imageUrl, name, addItem}) => (
  <div 
    onClick={addItem}
    className="card-container"
    style={{
        height: `${windowWidth > 900 ? "30rem" : "10rem"}`,
      }}
  >
    <div  
        className="card-image"
        style={{
            backgroundImage: `-webkit-linear-gradient(270deg, rgba(87,153,143,0.2) 0%, rgba(41,73,68,0.7) 49%, rgba(41,73,68,1) 100%) ,url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition:"center",
            height: "100%",
            width:"100%",
            borderRadius:".5rem"
        }}/>
    <span className="card-title">{name}</span>
  </div>
)

export default FavoriteCard;