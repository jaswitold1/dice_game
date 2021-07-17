import React, { useState, useEffect } from "react";

function Game() {
  const [history, setHistory] = useState([]);
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
        (bet === true &&
          history[history.length - 2]?.dice[0].value >
            history[history.length - 3]?.dice[0].value) ||
        (bet === false &&
          history[history.length - 2]?.dice[0].value <
            history[history.length - 3]?.dice[0].value)
      ) {
        setOutcome("You lost");
      } else winning();
    }
  }, [counter]);

  const winning = () => {
    setOutcome("You win");
    setPoints((prev) => prev + 0.1);
  };

  console.log(history);
  console.log(outcome);
  const higher = () => {
    setBet(true);
  };
  const lower = () => {
    setBet(false);
  };
  const check = () => {
    setCounter((prev) => prev + 1);
  };

  return history.length > 1 ? (
    <div>
      <p>points: {points}</p>
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
        {/* {history[history.length - 2]?.dice[0].value}
        {history[history.length - 3]?.dice[0].value} */}
      </h1>
    </div>
  ) : (
    <div>
      <button onClick={check}>START GAME</button>
    </div>
  );
}

export default Game;
