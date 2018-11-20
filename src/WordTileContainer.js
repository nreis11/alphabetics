import React from "react";
import "./WordTileContainer.css";

export const WordTileContainer = props => {
  return <div className="container container-words">{props.children}</div>;
};
