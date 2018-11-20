import React from "react";
import "./LetterBar.css";

export const LetterBar = ({ letters, currIdx, correct }) => {
  return (
    <div className="letter-bar-container">
      {letters.map((letter, idx) => (
        <span className={idx === currIdx ? "active" : null} key={letter}>
          {correct.includes(idx) ? null : letter}
        </span>
      ))}
    </div>
  );
};
