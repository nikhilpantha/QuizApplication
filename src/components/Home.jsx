import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Score from "./Score";
import { question } from "../data/question";

function Home() {
  const [questionArray, setQuestionArray] = useState(question);
  const [qusIndex, setQusIndex] = useState(0);
  const [clickedAns, setClickedAns] = useState(null);
  const [totalScore, setTotalScore] = useState(0);
  const [submitAns, setSubmitAns] = useState(false);
  const [mustClickOneOption, setMustClickOneOption] = useState(false);
  let qns = questionArray[qusIndex];
  const history = useHistory();

  const answerClicked = (ans) => {
    setClickedAns(ans);
    setMustClickOneOption(true);
  };

  const checkAns = () => {
    setSubmitAns(true);
    if (clickedAns.correct) {
      setTotalScore(totalScore + 1);
    }
  };

  const nextQns = () => {
    setSubmitAns(false);
    setQusIndex(qusIndex + 1);
    setMustClickOneOption(false);
    setClickedAns(null);
  };

  const loggout = () => {
    window.localStorage.removeItem("loggedIn");
    history.push("/login");
  };

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
          <div className="w-full sm:w-96 bg-white flex flex-col p-5 rounded-md shadow">
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
          <Score
            totalScore={totalScore}
            setQusIndex={setQusIndex}
            questionArray={questionArray}
            setQuestionArray={setQuestionArray}
          />
        )}
      </div>
    </>
  );
}

export default Home;
