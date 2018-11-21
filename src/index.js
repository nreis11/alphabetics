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
import { MainContainer } from "./MainContainer";
import { ControlContainer } from "./ControlContainer";
import { ControlButton } from "./ControlButton";

class Game extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      wordVault: wordBank.words,
      wordList: [],
      currIdx: 0,
      isGameOn: false,
      timeLeft: 60
    };
  }

  componentDidMount() {
    this.generateWordList();
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e, cmd = null) => {
    const { isGameOn, currIdx, wordList } = this.state;
    if (!isGameOn) {
      return;
    }

    if (e.keyCode === 32 || cmd === "next") {
      // Correct
      const currWord = wordList[currIdx];
      currWord.isRight = true;
      const newWordList = wordList.slice();
      newWordList[currIdx] = currWord;
      this.setState({
        wordList: newWordList
      });
      this.nextWord();
    } else if (e.keyCode === 18 || cmd === "pass") {
      // Pass
      this.nextWord();
    }
  };

  generateWordList = () => {
    const { wordVault } = this.state;
    const randomIdx = Math.floor(Math.random() * 16);
    const wordList = wordVault
      .slice(randomIdx, randomIdx + 10)
      .map(letterArr => {
        const word = letterArr[
          Math.floor(Math.random() * letterArr.length)
        ].toUpperCase();
        return { value: word, isRight: false };
      });
    this.setState({
      wordList
    });
  };

  tick = () => {
    const { timeLeft } = this.state;
    if (timeLeft <= 0) {
      clearInterval(this.timer);
      // Need to execute here to work on mobile browsers
      const buzzer = document.getElementById("buzzer");
      buzzer.play();
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
    console.log(this);
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

  reset = e => {
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
  };

  render() {
    const { wordList, currIdx, timeLeft, isGameOn } = this.state;
    if (wordList.length < 1) {
      return (
        <div>
          <h1>LOADING...</h1>
        </div>
      );
    }

    const letter = wordList[currIdx].value[0];
    return (
      <div className="game">
        <h1>Alphabetics</h1>
        {isGameOn && <Speech text={letter} />}
        <LetterBar wordList={wordList} currIdx={currIdx} />
        <Timer seconds={timeLeft < 10 ? "0" + timeLeft : timeLeft.toString()} />
        <MainContainer>
          <ControlContainer
            name="pass"
            handleClick={e => this.handleKeyDown(e, "pass")}
          />
          <WordTileContainer>
            {wordList.map((word, idx) => (
              <WordTile key={word.value} word={idx <= currIdx ? word : null} />
            ))}
          </WordTileContainer>
          <ControlContainer
            name="next"
            handleClick={e => this.handleKeyDown(e, "next")}
          />
        </MainContainer>
        <ButtonContainer>
          <ControlButton name="start" onClick={this.startTimer} />
          <ControlButton name="reset" onClick={this.reset} />
        </ButtonContainer>
        {timeLeft <= 0 && <audio id="buzzer" ref={this.myRef} src={buzzer} />}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Game />, rootElement);
