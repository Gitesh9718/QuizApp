import React, { useState, useEffect } from "react";
import { questionData } from "../Data/data";
import QuizResult from "../components/QuizScore";
import "../components/quiz.css";

const Game = () => {
  const [CurrentQuestion, SetQuestion] = useState(0);
  const [CurrentScore, SetScore] = useState(0);
  const [ClickOption, SetClickOption] = useState(0);
  const [ShowResult, SetShowResult] = useState(false);
  const [Submit, SetSubmit] = useState(false);
  const [Previous, SetPrevious] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [Test, SetTest] = useState(false);
  const [Name, SetName] = useState("");
  const [Email, SetEmail] = useState("");
  const [Phone, SetPhone] = useState("");
  const [NameError, SetNameError] = useState("");
  const [EmailError, SetEmailError] = useState("");
  const [PhoneError, SetPhoneError] = useState("");
  const [questionData, setQuestionData] = useState([]);
  const [seconds, setSeconds] = useState(60);
  const [minutes, setMinutes] = useState(3);
  const [color , setcolor] = useState("white")
  const final = questionData[CurrentQuestion]?.incorrect_answers.concat(questionData[CurrentQuestion]?.correct_answer)
  


  const ChangeQuestion = () => {
    UpdateScore();
    if (CurrentQuestion < questionData.length - 1) {
      setSelectedOptions((prevOptions) => {
        const updatedOptions = [...prevOptions];
        updatedOptions[CurrentQuestion] = ClickOption;
        return updatedOptions;
      });
      SetQuestion(CurrentQuestion + 1);
      SetClickOption(selectedOptions[CurrentQuestion + 1] || 0);
    } else {
      SetShowResult(true);
      SetSubmit(true);
    }
  };
  const show = () =>{
    SetQuestion(1)
    if (CurrentQuestion < questionData.length - 1){
      SetQuestion(CurrentQuestion + 1);
    }
  }

  console.log("selectedOption",selectedOptions,"updated",questionData)
  const UpdateScore = () => {
    if (ClickOption === questionData[CurrentQuestion]?.correct_answer) {
      console.log("Updating score");
      SetScore(CurrentScore + 1);
    }
  };
  
  const PreviousQuestion = () => {
    if (CurrentQuestion >= 1) {
      SetQuestion(CurrentQuestion - 1);
      SetClickOption(selectedOptions[CurrentQuestion - 1] || 0);
    }
  };

  const handleOptionClick = (optionIndex) => {
    console.log("Clicked option index:", optionIndex);
    
    SetClickOption(optionIndex);
    
    console.log("ClickOption state after update:", ClickOption);
    
    setSelectedOptions((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[CurrentQuestion] = optionIndex;
      return updatedOptions;
    });
  };
    const onValidate = () => {
    let isValid = true;
    if (Name === "") {
      alert("Name is Required");
      isValid = false;
    } else {
      SetNameError("");
    }
    if (Email === "") {
      alert("Email is not valid");
      isValid = false;
    } else {
      SetEmailError("");
    }
    if (Phone === "") {
      alert("Phone is not valid");
      isValid = false;
    } else {
      SetPhoneError("");
    }
    return isValid;
  };
  // const AnswerKey = () =>{
  //   SetShowResult(false)
  //   setMinutes(0)
  //   setSeconds(0)
  //   SetSubmit(false)
  //   show()
  //   if(ClickOption === questionData[CurrentQuestion]?.correct_answer){
  //     setcolor("orange")
  //   }else{
  //     setcolor("red")
  //   }
  // }
  const StartTest = () => {
    if (onValidate()) {
      SetTest(true);
    }
  };
  const Result = () => {
    if (minutes === 0 && seconds === 0) {
      SetShowResult(true);
    }
  };
  async function fetchQuestions() {
    try {
      const url =
        "https://opentdb.com/api.php?amount=50&category=9&difficulty=hard&type=multiple";
      const response = await fetch(url);
      const data = await response.json();
      if (data.results) {
        const randomQuestions = data.results
          .sort(() => 0.5 - Math.random())
          .slice(0, 10);
        setQuestionData(randomQuestions);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  }

  useEffect(() => {
    fetchQuestions();
  }, []);
  useEffect(() => {
    if (Test) {
      const timer = setInterval(() => {
        setSeconds(seconds - 1);
        if (seconds === 0) {
          setMinutes(minutes - 1);
          setSeconds(60);
          Result();
        }
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [Test, seconds, minutes]);

  return (
    <section className="flex justify-center items-center ">
      <div className="border-2  w-96   rounded-lg bg-gray-100 shadow-2xl shadow-spread items-center m-auto mt-14">
        {Test ? (
          ShowResult ? (
            <QuizResult
              score={CurrentScore}
              totalScore={questionData.length}
              // rang = {AnswerKey}
              name={Name}
            />

          ) : (
            <>
              <h1 className="text-center  text-3xl font-bold  mt-6 font-serif">
                Quiz Triumph
              </h1>
              <div className="border-2  rounded-lg p-2 pt-1 text-center mt-2 ml-64 font-sans font-bold shadow-lg bg-cyan-200 shadow-spread  w-24   h-10">
                <span>{minutes < 10 ? "0" + minutes : minutes} :</span>{" "}
                <span>{seconds < 10 ? "0" + seconds : seconds}</span>
              </div>
              <div className="border-2 gap-2  xl:w-80 xl:px-2 xl:h-auto h-auto rounded-lg shadow-lg shadow-spread items-center m-auto mt-2">
                <div className="flex items-start">
                  <span className="text-lg font-bold mr-2">
                    {CurrentQuestion + 1}
                  </span>
                  <div
                    className="text-md font-semibold font-serif"
                    dangerouslySetInnerHTML={{
                      __html: questionData[CurrentQuestion]?.question,
                    }}
                  />
                </div>
              </div>
              <div className="">
                {final.sort().map(
                  (option, i) => (
                    <button
                      className={`border-2 hover:bg-green-500 font-medium text-lg font-serif w-80 h-12 shadow-lg shadow-spread hover:shadow-none rounded-lg hover:shadow-none mt-4 flex justify-center items-center m-auto ${
                        ClickOption === option ? "selected-option" : ""
                      }`}
                      key={i}
                      onClick={() => handleOptionClick(option)}
                    >
                      <span dangerouslySetInnerHTML={{ __html: option }} />
                    </button>
                  )
                )}
              </div>
              <div className="flex flex-row-reverse">
                {Submit ? (
                  <button
                    className="border-2 bg-gray-400 hover:bg-gray-500 font-serif font-bold text-lg w-32 h-14 mb-4 m-auto mt-4 p-3 shadow-xl shadow-spread hover:shadow-none rounded-lg text-center flex justify-center"
                    onClick={() => SetShowResult(true)}
                  >
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
                {Previous ? (
                  <button
                    className="border-2 bg-gray-400 hover:bg-gray-500 font-serif font-bold text-lg w-32 h-14 mb-4 m-auto mt-4 p-3 shadow-xl shadow-spread hover:shadow-none rounded-lg text-center flex justify-center"
                    onClick={PreviousQuestion}
                  >
                    Previous
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
              </div>
            </>
          )
        ) : (
          <>
          <div className="w-96 p-4">
            <h1 className="text-center text-3xl font-bold mt-4 font-serif">
              Quiz Triumph
            </h1>
            <form className="items-center  text-center pt-4 flex flex-col gap-6  outline-none ">
              <input
                type="text"
                name="Name"
                placeholder="Your Name"
                className="p-2 w-80 shadow-xl shadow-spread text-xl border-2 rounded-xl outline-none"
                onChange={(e) => SetName(e.target.value)}
              />
              {NameError && <p className="text-red-500">{NameError}</p>}

              <input
                type="text"
                name="Exam"
                placeholder="Exam You Are Preparing"
                className="p-2 w-80 shadow-xl shadow-spread text-xl border-2 rounded-xl outline-none"
              />
              <input
                type="email"
                name="Email"
                placeholder="Email"
                className="p-2 w-80 shadow-xl shadow-spread text-xl border-2 rounded-xl outline-none"
                onChange={(e) => SetEmail(e.target.value)}
              />
              {EmailError && <p className="text-red-500">{EmailError}</p>}
              <select className="p-2 w-80 shadow-xl outline-none shadow-spread xl:text-xl text-lg border-2 rounded-xl">
                <option className="text-gray-400 text-lg">Gender</option>
                <option className="text-lg">Male</option>
                <option className="text-lg">Female</option>
                <option className="text-lg">Other</option>
              </select>
              <input
                type="text"
                name="Mobile"
                placeholder="Phone NO"
                className="p-2 w-80 shadow-xl shadow-spread text-xl border-2 rounded-xl outline-none"
                onChange={(e) => SetPhone(e.target.value)}
              />
              {PhoneError && <p className="text-red-500">{PhoneError}</p>}

              <div className="flex gap-6">
                <button
                  className=" flex justify-center text-center m-auto bg-cyan-500 hover:shadow-none hover:bg-green-500  mb-4 p-2 w-32 shadow-xl shadow-spread text-xl border-2 rounded-xl"
                  onClick={StartTest}
                >
                  Start Test
                </button>
                <button
                  className=" flex justify-center text-center m-auto bg-cyan-500 hover:shadow-none hover:bg-green-500  mb-4 p-2 w-32 shadow-xl shadow-spread text-xl border-2 rounded-xl"
                  type="reset"
                >
                  Reset
                </button>
              </div>
            </form>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Game;
