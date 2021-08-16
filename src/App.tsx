import { useState } from "react";
import { QuestionForm, QuestionResults } from "components";

const data = {
  question: "Kuala Lumpur is the capital of",
  answerOptions: ["vietnam", "malaysia", "sweden", "austria"],
  correctAnswer: "malaysia",
};

export const App = () => {
  const [chosenAnswer, setChosenAnswer] = useState<string | null>(null);
  const [quizStatus, setQuizStatus] = useState("ANSWERING");

  switch (quizStatus) {
    case "ANSWERING":
      return (
        <QuestionForm
          question={data.question}
          answerOptions={data.answerOptions}
          onSubmit={(answer) => setChosenAnswer(answer)}
        />
      );

    case "VIEWING_RESULTS":
      return (
        <QuestionResults
          question={data.question}
          answerOptions={data.answerOptions}
          chosenAnswer={chosenAnswer!}
          correctAnswer={data.correctAnswer}
        />
      );

    default:
      return null;
  }
};
