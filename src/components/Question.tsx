import type { TQuestion, Action } from "../types";
import Options from "./Options";

type QuestionProps = {
  question: TQuestion;
  dispatch: React.ActionDispatch<[action: Action]>;
  answer: null | number;
};

function Question({ question, dispatch, answer }: QuestionProps) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;
