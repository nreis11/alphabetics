import React from "react";
import "./WordTileContainer.css";

export const WordTileContainer = props => {
  return (
    <div id="container-words" className="container">
      <div id="inner-container" className="container">
        <div id="innermost-container" className="container">
          <ul>{props.children}</ul>
        </div>
      </div>
    </div>
  );
};
