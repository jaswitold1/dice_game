import React from "react";

function History({ gameHistory }) {
  const splicedHistory = gameHistory.filter((element) => {
    return element.round > 0;
  });

  return (
    <div>
      {splicedHistory?.map((element) => {
        return (
          <li key={element.round}>
            round {element.round} {element.result}
          </li>
        );
      })}
    </div>
  );
}

export default History;
