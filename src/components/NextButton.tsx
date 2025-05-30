import type { Action } from "../types";

type ButtonProps = {
  dispatch: React.ActionDispatch<[action: Action]>;
  answer: null | number;
  index: number;
  numQuestions: number;
};

function NextButton({ dispatch, answer, index, numQuestions }: ButtonProps) {
  if (answer === null) return null;
  console.log(numQuestions);

  if (index < numQuestions - 1)
    return (
      <button className="btn btn-ui" onClick={() => dispatch({ type: "nextQuestion" })}>
        Next
      </button>
    );
  else
    return (
      <button className="btn btn-ui" onClick={() => dispatch({ type: "finish" })}>
        Finish
      </button>
    );
}

export default NextButton;
