import type { Action } from "../types";

type FinishScreenProps = {
  points: number;
  maxPoints: number;
  highScore: number;
  dispatch: React.ActionDispatch<[action: Action]>;
};

function FinishScreen({ maxPoints, points, highScore, dispatch }: FinishScreenProps) {
  const percentage = Math.ceil((points / maxPoints) * 100);

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
        <span>{emoji}</span> Your scored <strong>{points}</strong> out of {maxPoints} ({percentage}
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
