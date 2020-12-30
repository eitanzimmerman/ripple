import React from 'react';

const RangeInput = ({minTitle, maxTitle, min, max, steps, mainTitle,name,value, onChangeHandler}) => (
  <div
    style={{
      display: "flex",
      width: "100%",
      flexDirection: "column",
      textAlign: "center",
      marginTop:"1rem"
    }}
  >
    <h2 style={{opacity:"1", fontSize:"1.5rem", color: "white", marginBottom: "1rem" }}>{mainTitle}</h2>
    <input
      style={{ flex: "1 1", marginBottom:"1.2rem" }}
      type="range"
      min={min}
      max={max}
      step={steps}
      name={name}
      value={value}
      onChange={onChangeHandler}
      
    />
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <h2 style={{fontWeight:"300", color: "white", marginRight: "1.2rem" }}>{minTitle}</h2>
      <h2 style={{fontWeight:"300", color: "white", marginLeft: "1.2rem"}}>{maxTitle}</h2>
    </div>
  </div>
);

export default RangeInput