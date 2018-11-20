import React from "react";
import ReactDOM from "react-dom";

import { LetterBar } from "./LetterBar";
import { WordTileContainer } from "./WordTileContainer";
import { Timer } from "./Timer";
import { WordTile } from "./WordTile";
import { ButtonContainer } from "./ButtonContainer";
import Speech from "./Speech";

import wordBank from "./words.json";

import buzzer from "./sounds/buzzer-1.mp3";
import "./index.css";

class Game extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      wordVault: wordBank.words,
      wordList: [],
      currIdx: 0,
      isGameOn: false,
      timeLeft: 60,
      correct: []
    };

    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    this.generateWordList();
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = e => {
    const { isGameOn, currIdx, correct } = this.state;
    if (isGameOn) {
      if (e.keyCode === 32) {
        // Correct
        const newCorrect = correct.slice().concat([currIdx]);
        this.setState({
          correct: newCorrect
        });
        this.nextWord();
      } else if (e.keyCode === 18) {
        // Pass
        this.nextWord();
      }
    }
  };

  generateWordList = () => {
    const { wordVault } = this.state;
    const randomIdx = Math.floor(Math.random() * 16);
    const wordList = wordVault
      .slice(randomIdx, randomIdx + 10)
      .map(letterArr => {
        return letterArr[
          Math.floor(Math.random() * letterArr.length)
        ].toUpperCase();
      });
    this.setState({
      wordList
    });
  };

  tick = () => {
    const { timeLeft } = this.state;
    if (timeLeft <= 0) {
      clearInterval(this.timer);
      this.setState({
        isGameOn: false
      });
    } else {
      this.setState({
        timeLeft: timeLeft - 1
      });
    }
  };

  startTimer = () => {
    if (!this.timer) {
      this.timer = setInterval(this.tick, 1000);
      this.setState({
        isGameOn: true
      });
    }
  };

  nextWord = () => {
    const { currIdx, wordList } = this.state;
    if (currIdx < wordList.length - 1) {
      this.setState(prevState => ({
        currIdx: prevState.currIdx + 1
      }));
    }
  };

  reset(e) {
    e.target.blur();
    clearInterval(this.timer);
    this.timer = null;
    this.generateWordList();
    this.setState({
      currIdx: 0,
      isGameOn: false,
      timeLeft: 60,
      correct: []
    });
  }

  render() {
    const { wordList, currIdx, timeLeft, correct, isGameOn } = this.state;
    const letters = wordList.map(word => word[0]);
    const letter = letters[currIdx];
    return (
      <div className="game">
        <h1>Alphabetics</h1>
        {isGameOn && <Speech text={letter}/>}
        <LetterBar letters={letters} currIdx={currIdx} correct={correct} />
        <Timer seconds={timeLeft < 10 ? "0" + timeLeft : timeLeft.toString()} />
        <WordTileContainer>
          {wordList.map((word, idx) => (
            <WordTile key={word} word={idx <= currIdx ? word : null} />
          ))}
        </WordTileContainer>
        <ButtonContainer>
          <button id="start-btn" onClick={this.startTimer}>
            Start
          </button>
          <button id="reset-btn" onClick={this.reset}>
            Reset
          </button>
        </ButtonContainer>
        {timeLeft <= 0 && <audio ref={this.myRef} src={buzzer} autoPlay />}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Game />, rootElement);