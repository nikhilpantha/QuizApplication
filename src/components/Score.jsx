import React from "react";

const Score = ({
  totalScore,
  setQusIndex,
  questionArray,
  setQuestionArray,
}) => {
  const shuffle = (array) => {
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
  };

  const reset = () => {
    setQusIndex(0);
    let shuffleQuestionArray = shuffle(questionArray);
    setQuestionArray(shuffleQuestionArray);
  };

  return (
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
  );
};

export default Score;
