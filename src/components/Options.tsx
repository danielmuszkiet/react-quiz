import type { TQuestion, Action } from "../types";

type OptionProps = {
  question: TQuestion;
  dispatch: React.ActionDispatch<[action: Action]>;
  answer: null | number;
};

function Options({ question, dispatch, answer }: OptionProps) {
  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {question.options.map((option, i) => {
        return (
          <button
            disabled={hasAnswered}
            key={question.id + "-" + i}
            className={`btn btn-option  
              ${hasAnswered ? (i === question.correctOption ? "correct" : "wrong") : ""}
              ${i === answer ? "answer" : ""}`}
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
