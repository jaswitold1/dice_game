import React from "react";

function ResumeGame({ check, resumeGame }) {
  return (
    <div>
      <p>Do You want to resume previous game ?</p>
      <button onClick={check}>NO</button>
      <button onClick={resumeGame}>YES</button>
    </div>
  );
}

export default ResumeGame;
