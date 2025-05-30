type ProgressProps = {
  index: number;
  numQuestions: number;
  points: number;
  maxPoints: number;
  answer: null | number;
};

function Progress({ index, numQuestions, points, maxPoints, answer }: ProgressProps) {
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPoints} points
      </p>
    </header>
  );
}

export default Progress;
