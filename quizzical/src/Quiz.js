import React, { useEffect, useState } from "react";
import Question from "./Question";
import "./Quiz.css";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [token, setToken] = useState("");
  const [checkAnswer, setCheckAnswer] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [playAgain, setPlayAgain] = useState(false);

  //retrieve token from opentdb.com api
  useEffect(() => {
    fetch("https://opentdb.com/api_token.php?command=request")
      .then((res) => res.json())
      .then((data) => setToken(data.token));
  }, []);

  //concat token to api request in order to manage a session to not get repetitive questions
  useEffect(() => {
    fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then((res) => res.json())
      .then((data) => {
        let temp = data.results.map((item) => {
          let arrayTemp = item.incorrect_answers.map((element) => ({
            selected: false,
            correct: false,
            text: element,
          }));
          arrayTemp.push({
            selected: false,
            correct: true,
            text: item.correct_answer,
          });

          return {
            question: item.question,
            answers: shuffle(arrayTemp),
          };
        });
        return setQuestions(temp);
      });
  }, [playAgain]);

  const clickHandler = (answer, questionId) => {
    setQuestions((prevState) => {
      return prevState.map((item, index) => {
        return index !== questionId
          ? item
          : {
              ...item,
              answers: item.answers.map((element) => {
                return element.text === answer
                  ? { ...element, selected: true }
                  : { ...element, selected: false };
              }),
            };
      });
    });
  };

  useEffect(() => {
    let count = 0;
    questions.map((question) =>
      question.answers.map((answer) => {
        return answer.correct && answer.selected && count++;
      })
    );
    setCorrectCount(count);
  }, [questions]);

  const checkAnswersHandler = () => {
    setCheckAnswer((prevState) => !prevState);
  };

  const playAgainHandler = () => {
    setPlayAgain((prevState) => !prevState);
    checkAnswersHandler();
  };

  const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  let key = 0;
  const questionArray = questions.map((apiQuestion) => {
    return (
      <Question
        key={key++}
        id={key}
        question={apiQuestion.question}
        answers={apiQuestion.answers}
        onClickHandler={clickHandler}
        checkQuizAnswer={checkAnswer}
      />
    );
  });

  return (
    <div className="quiz-container">
      <div className="quiz">
        {questionArray}
        {!checkAnswer ? (
          <button className="play_again" onClick={checkAnswersHandler}>
            check answers
          </button>
        ) : (
          <button className="play_again" onClick={playAgainHandler}>
            play again
          </button>
        )}
        {checkAnswer && <h3>correct answers:{correctCount}/5</h3>}
      </div>
    </div>
  );
};

export default Quiz;
