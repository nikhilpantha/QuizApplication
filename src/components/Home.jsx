import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Home() {
  const [questionArray, setquestionArray] = useState([
    {
      ques: "Which is the Largest Planet?",
      answer: [
        { option: "Earth", correct: false },
        { option: "Mars", correct: false },
        { option: "Jupiter", correct: true },
        { option: "Venus", correct: false },
      ],
    },
    {
      ques: "Which Planet is Known as Evening star?",
      answer: [
        { option: "Earth", correct: false },
        { option: "Mars", correct: false },
        { option: "Jupiter", correct: false },
        { option: "Venus", correct: true },
      ],
    },
    {
      ques: "Which is the coldest planet?",
      answer: [
        { option: "Earth", correct: false },
        { option: "Neptune", correct: true },
        { option: "Saturn", correct: false },
        { option: "Venus", correct: false },
      ],
    },
    {
      ques: "Which planet is known as red planet?",
      answer: [
        { option: "Earth", correct: false },
        { option: "Mars", correct: true },
        { option: "Jupiter", correct: false },
        { option: "Venus", correct: false },
      ],
    },
    {
      ques: "Which planet is nearest to the sun?",
      answer: [
        { option: "Mercury", correct: true },
        { option: "Mars", correct: false },
        { option: "Neptune", correct: false },
        { option: "Venus", correct: false },
      ],
    },
    {
      ques: "How long does the earth takes to complete one rotation?",
      answer: [
        { option: "29 days", correct: false },
        { option: "365 days", correct: false },
        { option: "36 hours", correct: false },
        { option: "24 hours", correct: true },
      ],
    },
    {
      ques: "Which planet takes the longest time to revolve around the sun?",
      answer: [
        { option: "Earth", correct: false },
        { option: "Neptune", correct: true },
        { option: "Jupiter", correct: false },
        { option: "uranus", correct: false },
      ],
    },
    {
      ques: "Which planet has the highest number of sattelites?",
      answer: [
        { option: "Earth", correct: false },
        { option: "Saturn", correct: true },
        { option: "Jupiter", correct: false },
        { option: "Venus", correct: false },
      ],
    },
    {
      ques: "Which planet is known as ring planet?",
      answer: [
        { option: "Uranus", correct: false },
        { option: "Mars", correct: false },
        { option: "Saturn", correct: true },
        { option: "Neptune", correct: false },
      ],
    },
    {
      ques: "Which planet is known as home Planet?",
      answer: [
        { option: "Earth", correct: true },
        { option: "Mars", correct: false },
        { option: "neptune", correct: false },
        { option: "Venus", correct: false },
      ],
    },
  ]);
  const [qusIndex, setQusIndex] = useState(0);
  const [clickedAns, setClickedAns] = useState(null);
  const [totalScore, setTotalScore] = useState(0);
  const [submitAns, setSubmitAns] = useState(false);
  const [mustClickOneOption, setMustClickOneOption] = useState(false);
  let qns = questionArray[qusIndex];
  const history = useHistory();
  function answerClicked(ans) {
    setClickedAns(ans);
    setMustClickOneOption(true);
  }
  function checkAns() {
    setSubmitAns(true);
    if (clickedAns.correct) {
      setTotalScore(totalScore + 1);
    }
  }
  function nextQns() {
    setSubmitAns(false);
    setQusIndex(qusIndex + 1);
    setMustClickOneOption(false);
    setClickedAns(null);
  }
  function shuffle(array) {
    var i = array.length,
      j = 0,
      temp;
    while (i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
  function reset() {
    setQusIndex(0);
    let ssquestionArray = shuffle(questionArray);
    setquestionArray(ssquestionArray);
  }
  function loggout() {
    window.localStorage.removeItem("loggedIn");
    history.push("/login");
  }

  return (
    <>
      <button
        type="button"
        className="absolute right-5 top-5 p-3 font-semibold bg-red-600 text-white rounded-md"
        onClick={() => loggout()}
      >
        Log Out
      </button>
      <div className="flex flex-col justify-center items-center h-screen w-full bg-gray-200">
        <p className="capitalize">Hello, {localStorage.getItem("name")}</p>
        {qusIndex < 10 ? (
          <div className="w-full sm:w-96 bg-green-50 flex flex-col p-5 rounded-md shadow">
            {qns && (
              <div className="p-5 space-y-3">
                <div className="text-xl">{qns.ques}</div>
                <ul className="list-none space-y-2">
                  {qns.answer.map((ans, index) => (
                    <li
                      key={index}
                      className={`${
                        clickedAns && clickedAns.option === ans.option
                          ? "bg-gray-300"
                          : null
                      } ${
                        submitAns
                          ? `${ans.correct ? "bg-green-300" : "bg-red-300"}`
                          : null
                      }

                  p-3 w-56 text-left border-2 border-gray-200 rounded-md`}
                      onClick={() => answerClicked(ans)}
                    >
                      {ans.option}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className=" flex items-center justify-end">
              {submitAns ? (
                <button
                  type="button"
                  className="border bg-red-600 text-white p-2 font-semibold rounded-md w-36"
                  onClick={() => nextQns()}
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  disabled={!mustClickOneOption ? true : false}
                  className={`${
                    !mustClickOneOption
                      ? "cursor-not-allowed bg-gray-300 border border-gray-400"
                      : "bg-blue-600 text-white shadow"
                  }    p-2 font-semibold rounded-md w-36`}
                  onClick={() => checkAns()}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="w-full sm:w-96 bg-green-50 space-y-10 flex flex-col items-center p-5 rounded-md shadow">
            <div
              className={`${
                totalScore < 5 ? "bg-red-300" : "bg-green-300"
              } flex flex-col justify-center items-center rounded-full w-36 h-36`}
            >
              <h1 className="text-xl">score</h1>
              <p className="text-7xl">{totalScore}</p>
            </div>
            <button
              className="p-3 bg-blue-600 text-white rounded-md"
              onClick={() => reset()}
            >
              Replay
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
