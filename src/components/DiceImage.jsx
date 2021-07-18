import React from "react";

function DiceImage({ history }) {
  return (
    <img
      alt={`http://roll.diceapi.com/images/poorly-drawn/d6/${
        history[history.length - 2]?.dice[0].value
      }.png`}
      src={`http://roll.diceapi.com/images/poorly-drawn/d6/${
        history[history.length - 2]?.dice[0].value
      }.png`}
    />
  );
}

export default DiceImage;
