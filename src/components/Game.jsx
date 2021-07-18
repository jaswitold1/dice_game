import React, { useState, useEffect } from "react";
import History from "./History";

function Game() {
  const [history, setHistory] = useState([]);
  const [gameHistory, setGameHistory] = useState([]);
  const [bet, setBet] = useState("");
  const [counter, setCounter] = useState(1);
  const [outcome, setOutcome] = useState("");
  const [points, setPoints] = useState(0);

  useEffect(() => {
    fetch("http://roll.diceapi.com/json/d6")
      .then((resp) => resp.json())
      .then((resp) => setHistory([...history, resp]));

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

    setGameHistory([...gameHistory, { result: outcome, round: counter - 3 }]);
  }, [counter]);

  const winning = () => {
    setOutcome("You won");
    setPoints((prev) => prev + 0.1);
  };

  console.log(history);
  console.log(outcome);
  console.log(gameHistory);
  const higher = () => {
    setBet("higher");
  };
  const lower = () => {
    setBet("lower");
  };
  const check = () => {
    setCounter((prev) => prev + 1);
  };

  return history.length > 1 ? (
    <div>
      <p>points: {points.toFixed(1)}</p>
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
      <button onClick={check}>check</button>
      <h1>
        {outcome}
        {history[history.length - 2]?.dice[0].value}
        {history[history.length - 3]?.dice[0].value}
      </h1>
      <History gameHistory={gameHistory} />
    </div>
  ) : (
    <div>
      <button onClick={check}>START GAME</button>
    </div>
  );
}

export default Game;
