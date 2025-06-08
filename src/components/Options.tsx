import { useQuiz } from "../context/useQuiz";

function Options() {
  const { questions, index, answer, dispatch } = useQuiz();

  const question = questions[index];

  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {question.options.map((option, i) => {
        const isSelected = i === answer;
        const isCorrect = i === question.correctOption;

        let statusClass = "";
        if (hasAnswered) {
          statusClass = isCorrect ? "correct" : "wrong";
        }

        const answerClass = isSelected ? "answer" : "";

        return (
          <button
            disabled={hasAnswered}
            key={question.id + "-" + i}
            className={`btn btn-option ${statusClass} ${answerClass}`}
            onClick={() => dispatch({ type: "newAnswer", payload: i })}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default Options;
