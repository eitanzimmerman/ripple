import React from 'react';

import './search-list.styles.scss';

const SearchList = ({ showList, searchResults, addItem }) => {

  const handleClick = (item) => {
    addItem(item.id, item.type, item.name)
    showList(false)
  }


  return(
  <div style={{ position: "absolute", width: "100%" }}>
    <ul className="search-list-container">
      {searchResults.map((item) => {
        return (
          <li
            className="search-list-item"
            key={item.id}
            onClick={() => handleClick(item)}
          >
            <img
              src={item.images.length > 0 ? item.images.slice(-1)[0].url : ""}
              className="search-list-item-img"
            />
            <h2 className="search-list-item-text">{item.name}</h2>
          </li>
        );
      })}
    </ul>
    <div
      onClick={() => showList(false)}
      style={{
        position: "fixed",
        top: "0%",
        left: "0%",
        width: "100vw",
        height: "100vh",
      }}
    />
  </div>
)};

export default SearchList;


