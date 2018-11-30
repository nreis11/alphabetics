import React from "react";
import "./LetterBar.css";

const LetterBar = ({ wordList, currIdx }) => {
  return (
    <div className="letter-bar-container">
      {wordList.map((word, idx) => {
        const letter = word.value[0];
        return (
          <span
            className={idx === currIdx && !word.isRight ? "active" : null}
            key={letter}
          >
            {word.isRight ? null : letter}
          </span>
        );
      })}
    </div>
  );
};

export default React.memo(LetterBar);
