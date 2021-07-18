import React from "react";

function GameOver({ points, playAgain }) {
  return (
    <div>
      <h1>GAME OVER</h1>
      <p>Your score: {points.toFixed(1)}</p>
      <button onClick={playAgain}>PLAY AGAIN</button>
    </div>
  );
}

export default GameOver;
