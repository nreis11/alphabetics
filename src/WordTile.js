import React from "react";
import "./WordTile.css";
import { object } from "prop-types";

const WordTile = ({ word }) => {
  const classes = `word-tile ${word && word.isRight ? "is-right" : ""}`;
  return (
    <li>
      <div className={classes}>
        <strong>{word ? word.value : null}</strong>
      </div>
    </li>
  );
};

WordTile.propTypes = {
  word: object
};

WordTile.defaultProps = {
  word: { value: "", isRight: false }
};

export default React.memo(WordTile);
