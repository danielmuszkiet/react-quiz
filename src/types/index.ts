export type TQuestion = {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
  id: string;
};

export type QuizState = {
  questions: TQuestion[];
  status: "loading" | "error" | "active" | "finished" | "ready";
  index: number;
  answer: null | number;
  points: number;
  highScore: number;
  secondsRemaining: number;
};

export type Action =
  | { type: "dataRecieved"; payload: TQuestion[] }
  | { type: "newAnswer"; payload: number }
  | { type: "dataFailed" | "start" }
  | { type: "nextQuestion" }
  | { type: "finish" }
  | { type: "restart" };
