import type { Action } from "../types";

type StartScreenProps = {
  numQuestions: number;
  dispatch: React.ActionDispatch<[action: Action]>;
};

function StartScreen({ numQuestions, dispatch }: StartScreenProps) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} questions to test your React knowledge</h3>
      <button className="btn btn-ui" onClick={() => dispatch({ type: "start" })}>
        Let's start!
      </button>
    </div>
  );
}

export default StartScreen;
