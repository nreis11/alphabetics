import React from "react";
import "./WordTileContainer.css";

const WordTileContainer = props => {
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

export default React.memo(WordTileContainer);
