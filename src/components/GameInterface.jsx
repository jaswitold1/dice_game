import React from "react";

function GameInterface({ higher, lower, bet, check, outcome }) {
  return (
    <div>
      <p>Will the next value be higher or lower ?</p>
      <button onClick={higher}>higher</button>
      <button onClick={lower}>lower</button>
      <button disabled={bet === "" ? true : false} onClick={check}>
        check
      </button>
      <h1>{outcome}</h1>
    </div>
  );
}

export default GameInterface;
