import { useReducer } from "react";

type Action =
  | { type: "inc" | "dec" | "reset" }
  | { type: "setCount"; payload: number }
  | { type: "setStep"; payload: number };

type State = { count: number; step: number };

const initalState = { count: 0, step: 1 };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "dec":
      return { ...state, count: state.count - state.step };
    case "inc":
      return { ...state, count: state.count + state.step };
    case "setCount":
      return { ...state, count: action.payload };
    case "setStep":
      return { ...state, step: action.payload };
    case "reset":
      return initalState;
    default:
      throw new Error("Wrong Action Type");
  }
}

function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initalState);

  const { count, step } = state;

  // This mutates the date object.
  const date = new Date();
  date.setDate(date.getDate() + count);

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={(e) => dispatch({ type: "setStep", payload: Number(e.target.value) })}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={() => dispatch({ type: "dec" })}>-</button>
        <input
          value={count}
          onChange={(e) => dispatch({ type: "setCount", payload: Number(e.target.value) })}
        />
        <button onClick={() => dispatch({ type: "inc" })}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
