import React from "react";
import "./WordTile.css";

export const WordTile = ({ word }) => (
  <div className="word-tile">
    <strong>{word}</strong>
  </div>
);
