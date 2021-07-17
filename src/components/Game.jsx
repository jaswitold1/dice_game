import React, { useState, useEffect } from "react";

function Game() {
  //   const [dice, setDice] = useState({});
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch("http://roll.diceapi.com/json/d6")
      .then((resp) => resp.json())
      .then((resp) => setHistory([...history, resp]));
  }, []);
  console.log(history);
  ///// czy nastepna bedzie wyzsza czy nizsza ? obecna wrzuc do historii i porownuj nowa z historia ostatnia

  return (
    <div>
      <img
        alt={`http://roll.diceapi.com/images/poorly-drawn/d6/${
          history[history.length - 1].dice[0].value
        }.png`}
        src={`http://roll.diceapi.com/images/poorly-drawn/d6/${
          history[history.length - 1].dice[0].value
        }.png`}
      />
      <p>Will the next value be higher or lower ?</p>
      <button>higher</button>
      <button>lower</button>
    </div>
  );
}

export default Game;
