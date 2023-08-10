import React, { useState } from "react";
import { QuizData } from "../Data/data";
import QuizResult from "../components/QuizScore";
import "../components/quiz.css"

const Game = () => {
  const [CurrentQuestion, SetQuestion] = useState(0);
  const [CurrentScore, SetScore] = useState(0);
  const [ClickOption, SetClickOption] = useState(0);
  const [ShowResult, SetShowResult] = useState(false);
  const [Submit, SetSubmit] = useState(false);

  const ChangeQuestion = () => {
    UpdateScore();
    if (CurrentQuestion < QuizData.length - 1) {
      SetQuestion(CurrentQuestion + 1);
      SetClickOption(0);
    } else {
      SetSubmit(true);
      SetShowResult(true);
    }
  };

  const UpdateScore = () => {
    if (ClickOption === QuizData[CurrentQuestion].answer) {
      SetScore(CurrentScore + 1);
    } else {
      SetScore(CurrentScore + 0);
    }
  };

  return (
    <section>
      <div className="border-2 w-96 h-full rounded-lg bg-gray-100 shadow-2xl shadow-spread items-center m-auto mt-14">
        {ShowResult ? (
          <QuizResult score={CurrentScore} totalScore={QuizData.length} />
        ) : (
          <>
            <h1 className="text-center text-3xl font-bold mt-4 font-serif">
              Quiz Triumph
            </h1>
            <div className="border-2 gap-2 p-4 w-80 h-auto rounded-lg shadow-lg shadow-spread items-center m-auto mt-4">
              <div className="flex items-start">
                <span className="text-lg font-bold mr-2">
                  {CurrentQuestion + 1}.
                </span>
                <span className="text-md font-semibold font-serif">
                  {QuizData[CurrentQuestion].question}
                </span>
              </div>
            </div>
            <div className="">
              {QuizData[CurrentQuestion].options.map((options, i) => {
                return (
                  <button
                    className={`border-2 hover:bg-green-500 font-medium text-lg font-serif w-80 h-12 shadow-lg shadow-spread hover:shadow-none rounded-lg hover:shadow-none mt-4 flex justify-center items-center m-auto ${
                      ClickOption === i + 1 ? "selected-option" : ""
                    }`}
                    key={i}
                    onClick={() => SetClickOption(i + 1)}
                  >
                    {options}
                  </button>
                );
              })}
            </div>
            {Submit ? (
              <button className="border-2 bg-gray-400 hover:bg-gray-500 font-serif font-bold text-lg w-32 h-14 mb-4 m-auto mt-4 p-3 shadow-xl shadow-spread hover:shadow-none rounded-lg text-center flex justify-center">
                Submit
              </button>
            ) : (
              <>
                <button
                  className="border-2 bg-gray-400 hover:bg-gray-500 font-serif font-bold text-lg w-32 h-14 mb-4 m-auto mt-4 p-3 shadow-xl shadow-spread hover:shadow-none rounded-lg text-center flex justify-center"
                  onClick={ChangeQuestion}
                >
                  Next
                </button>
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Game;
