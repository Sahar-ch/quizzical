import React, { useState } from "react";
import Main from "./Main";
import Quiz from "./Quiz";

const App = () => {
  const [startQuiz, setStartQuiz] = useState(false);

  const clickHandler = () => {
    setStartQuiz(true);
  };

  return (
    <div>{startQuiz ? <Quiz /> : <Main onClickHandler={clickHandler} />}</div>
  );
};

export default App;
