import React, { useState, useEffect } from "react";
import DiceImage from "./DiceImage";
import GameInterface from "./GameInterface";
import GameOver from "./GameOver";
import History from "./History";
import PointsAndRounds from "./PointsAndRounds";
import ResumeGame from "./ResumeGame";

function Game() {
  const [history, setHistory] = useState([]);
  const [gameHistory, setGameHistory] = useState([]);
  const [bet, setBet] = useState("");
  const [counter, setCounter] = useState(1);
  const [outcome, setOutcome] = useState("");
  const [points, setPoints] = useState(0);
  const [gameOver, setGameOver] = useState("");

  useEffect(() => {
    fetch("http://roll.diceapi.com/json/d6")
      .then((resp) => resp.json())
      .then((resp) => setHistory([...history, resp]));
    /// game mechanics
    if (history.length > 1) {
      if (
        (bet === "higher" &&
          history[history.length - 1]?.dice[0].value >=
            history[history.length - 2]?.dice[0].value) ||
        (bet === "lower" &&
          history[history.length - 1]?.dice[0].value <=
            history[history.length - 2]?.dice[0].value)
      ) {
        winning();
      } else setOutcome("You lost");
    }
    /// setting previous games history
    setGameHistory([...gameHistory, { result: outcome, round: counter - 3 }]);
    /// game state saving on unmount for future resume
    if (history.length <= 31 && history.length > 2) {
      return () => {
        localStorage.setItem(
          "gameState",
          JSON.stringify({
            history: history,
            gameHistory: gameHistory,
            counter: counter,
            bet: bet,
            outcome: outcome,
            points: points,
          })
        );
      };
    }
  }, [counter]);

  const winning = () => {
    setOutcome("You won");
    setPoints((prev) => prev + 0.1);
  };

  const resumeGame = () => {
    const gameState = JSON.parse(localStorage.gameState);
    setHistory(gameState.history);
    setGameHistory(gameState.gameHistory);
    setCounter(gameState.counter);
    setBet(gameState.bet);
    setOutcome(gameState.outcome);
    setPoints(gameState.points);
  };

  const higher = () => {
    setBet("higher");
  };

  const lower = () => {
    setBet("lower");
  };

  const check = () => {
    setCounter((prev) => prev + 1);
  };

  const playAgain = () => {
    setGameOver("Game Over");
    setHistory([]);
    setGameHistory([]);
    setCounter(1);
    setBet("");
    setOutcome("");
    setPoints(0);
  };

  return history.length > 1 ? (
    history.length <= 31 ? (
      <div>
        <PointsAndRounds counter={counter} points={points} />
        <DiceImage history={history} />
        <GameInterface
          higher={higher}
          lower={lower}
          check={check}
          outcome={outcome}
          bet={bet}
        />
        <History gameHistory={gameHistory} />
      </div>
    ) : (
      <GameOver points={points} playAgain={playAgain} />
    )
  ) : localStorage.gameState && gameOver !== "Game Over" ? (
    <ResumeGame resumeGame={resumeGame} check={check} />
  ) : (
    <div>
      <button onClick={check}>START GAME</button>
    </div>
  );
}

export default Game;
