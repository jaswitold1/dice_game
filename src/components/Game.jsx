import React, { useState, useEffect } from "react";
import History from "./History";

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
        <p>points: {points.toFixed(1)}</p>
        <p>rounds remaining {30 - (counter - 2)} </p>
        <img
          alt={`http://roll.diceapi.com/images/poorly-drawn/d6/${
            history[history.length - 2]?.dice[0].value
          }.png`}
          src={`http://roll.diceapi.com/images/poorly-drawn/d6/${
            history[history.length - 2]?.dice[0].value
          }.png`}
        />
        <p>Will the next value be higher or lower ?</p>
        <button onClick={higher}>higher</button>
        <button onClick={lower}>lower</button>
        <button disabled={bet === "" ? true : false} onClick={check}>
          check
        </button>
        <h1>{outcome}</h1>
        <History gameHistory={gameHistory} />
      </div>
    ) : (
      <div>
        <h1>GAME OVER</h1>
        <p>Your score: {points.toFixed(1)}</p>

        <button onClick={playAgain}>PLAY AGAIN</button>
      </div>
    )
  ) : gameOver !== "Game Over" ? (
    <div>
      <p>Do You want to resume previous game ?</p>
      <button onClick={check}>NO</button>
      <button onClick={resumeGame}>YES</button>
    </div>
  ) : (
    <div>
      <button onClick={check}>START GAME</button>
    </div>
  );
}

export default Game;
