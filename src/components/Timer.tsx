import { useEffect, useState } from "react";

import { useQuiz } from "../context/useQuiz";

function Question() {
  const { secondsRemaining, dispatch } = useQuiz();
  const [time, setTime] = useState(secondsRemaining);

  useEffect(() => {
    const intervalID = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0) {
          dispatch({ type: "finish" });
          clearInterval(intervalID);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(intervalID);
  }, [dispatch]);

  const min = Math.floor(time / 60);
  const sec = time % 60;

  return (
    <div className="timer">
      {min.toString().padStart(2, "0")}:{sec.toString().padStart(2, "0")}
    </div>
  );
}

export default Question;
