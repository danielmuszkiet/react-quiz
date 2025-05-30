import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

import type { Action, QuizState } from "./types";

const SECONDS_PER_QUESTION = 15;

const initalState: QuizState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: 0,
};

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
        ...initalState,
        questions: state.questions,
        status: "ready",
        highScore: state.highScore,
      };
  }
}

function App() {
  const [{ questions, status, index, answer, points, highScore, secondsRemaining }, dispatch] =
    useReducer(reducer, initalState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((acc, q) => {
    return acc + q.points;
  }, 0);

  useEffect(function () {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
        dispatch({ type: "dataRecieved", payload: data });
      } catch (error) {
        dispatch({ type: "dataFailed" });
        console.error("Failed to fetch questions:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPoints={maxPossiblePoints}
              answer={answer}
            />
            <Question question={questions[index]} dispatch={dispatch} answer={answer} />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPoints={maxPossiblePoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
export default App;
