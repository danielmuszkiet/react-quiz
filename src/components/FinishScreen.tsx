import { useQuiz } from "../context/useQuiz";

function FinishScreen() {
  const { maxPossiblePoints, points, highScore, dispatch } = useQuiz();

  const percentage = Math.ceil((points / maxPossiblePoints) * 100);

  let emoji;
  if (percentage === 100) {
    emoji = "🏆";
  } else if (percentage >= 80) {
    emoji = "🎉";
  } else if (percentage >= 50) {
    emoji = "😊";
  } else if (percentage > 0) {
    emoji = "😢";
  } else {
    emoji = "🤦";
  }

  return (
    <>
      <p className="result">
        <span>{emoji}</span> Your scored <strong>{points}</strong> out of {maxPossiblePoints} (
        {percentage}
        %)
      </p>
      <p className="highscore">(Highscore: {highScore} points)</p>
      <button className="btn btn-ui" onClick={() => dispatch({ type: "restart" })}>
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
