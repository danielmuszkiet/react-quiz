// Only exports the context (NOT a React component)
import { createContext } from "react";

import type { Action, QuizState } from "../types";

type QuizContextType = QuizState & {
  dispatch: React.Dispatch<Action>;
  numQuestions: number;
  maxPossiblePoints: number;
};

export const QuizContext = createContext<QuizContextType | null>(null);
