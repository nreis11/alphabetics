import React from "react";
import "./LetterBar.css";

export const LetterBar = ({ wordList, currIdx }) => {
  return (
    <div className="letter-bar-container">
      {wordList.map((word, idx) => {
        const letter = word.value[0];
        return (
          <span className={idx === currIdx ? "active" : null} key={letter}>
            {word.isRight ? null : letter}
          </span>
        )
      })}
    </div>
  );
};
