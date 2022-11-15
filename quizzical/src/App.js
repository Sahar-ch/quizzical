import React, { useState } from "react";
import Main from "./Main";
import Quiz from "./Quiz";

const App = () => {
  const [startQuiz, setStartQuiz] = useState(false);

  const start = () => {
    setStartQuiz(true);
  };

  return <div>{startQuiz ? <Quiz /> : <Main onClickHandler={start} />}</div>;
};

export default App;
