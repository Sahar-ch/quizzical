import React, { useEffect } from "react";
import { decode } from "html-entities";
import "./Question.css";

const Question = (props) => {
  // questions are encoded to decode them (npm install html-entities)
  // then import decode from html-entities and use it as below
  let key = 0;
  const buttons = props.answers.map((answer) => {
    return (
      <button
        key={key++}
        className={`answer_button ${
          props.checkQuizAnswer
            ? answer.correct
              ? "correct"
              : answer.selected && "incorrect"
            : answer.selected && "selected"
        }`}
        onClick={(event) => props.onClickHandler(answer.text, props.id)}
      >
        {decode(answer.text)}
      </button>
    );
  });

  return (
    <div>
      <p>{decode(props.question)}</p>
      <div className="buttons">{buttons}</div>

      <hr />
    </div>
  );
};

export default Question;
