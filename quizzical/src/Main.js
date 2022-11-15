import React from "react";
import "./Main.css";

const Main = (props) => {
  return (
    <div className="main">
      <main>
        <h1 className="main-header">Quizzical</h1>
        <p>Answer 5 questions to the best of your knowledge</p>
        <button className="start-button" onClick={props.onClickHandler}>
          Start
        </button>
      </main>
    </div>
  );
};

export default Main;
