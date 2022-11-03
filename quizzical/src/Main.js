import React from "react";
import "./Main.css";

const Main = (props) => {
  return (
    <main>
      <h1 className="main-header">Quizzical</h1>
      <p>answer 5 questions to the best of your ability</p>
      <button onClick={props.onClickHandler}>Start</button>
    </main>
  );
};

export default Main;
