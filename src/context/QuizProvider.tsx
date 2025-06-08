import { useEffect, useReducer } from "react";
import type { Action, QuizState } from "../types";
import { QuizContext } from "./QuizContext";

const initialState: QuizState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: 0,
};

const SECONDS_PER_QUESTION = 15;

function reducer(state: QuizState, action: Action): QuizState {
  switch (action.type) {
    case "dataRecieved":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECONDS_PER_QUESTION,
      };
    case "newAnswer": {
      const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption ? state.points + question.points : state.points,
      };
    }
    case "nextQuestion": {
      return { ...state, index: state.index + 1, answer: null };
    }
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore: state.points > state.highScore ? state.points : state.highScore,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highScore: state.highScore,
      };
  }
}

function QuizProvider({ children }: { children: React.ReactNode }) {
  const [{ questions, status, index, answer, points, highScore, secondsRemaining }, dispatch] =
    useReducer(reducer, initialState);

  useEffect(
    function () {
      async function fetchData() {
        try {
          // Simulate API delay before even calling fetch
          await new Promise((resolve) => setTimeout(resolve, 1500));
          // const res = await fetch("http://localhost:8000/questions");
          const res = await fetch("./questions.json");
          const data = await res.json();

          dispatch({ type: "dataRecieved", payload: data });
        } catch (error) {
          dispatch({ type: "dataFailed" });
          console.error("Failed to fetch questions:", error);
        }
      }

      fetchData();
    },
    [dispatch]
  );

  const numQuestions = questions.length;

  const maxPossiblePoints = questions.reduce((acc, q) => {
    return acc + q.points;
  }, 0);

  return (
    <QuizContext.Provider
      value={{
        numQuestions,
        maxPossiblePoints,
        questions,
        status,
        index,
        answer,
        points,
        highScore,
        secondsRemaining,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export { QuizProvider };
