import React from "react";

function PointsAndRounds({ points, counter }) {
  return (
    <div>
      <p>points: {points.toFixed(1)}</p>
      <p>rounds remaining {30 - (counter - 2)} </p>
    </div>
  );
}

export default PointsAndRounds;
