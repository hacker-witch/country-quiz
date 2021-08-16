import { useState } from "react";
import { Quiz, QuestionResults } from "components";

const data = {
  question: "Kuala Lumpur is the capital of",
  answerOptions: ["vietnam", "malaysia", "sweden", "austria"],
  correctAnswer: "malaysia",
};

export const App = () => {
  const [chosenAnswer, setChosenAnswer] = useState<string | null>(null);
  const [quizStatus, setQuizStatus] = useState("ANSWERING");

  const handleQuizSubmit = (answer: string) => {
    setChosenAnswer(answer);
    setQuizStatus("VIEWING_QUESTION_RESULTS");
  };

  switch (quizStatus) {
    case "ANSWERING":
      return (
        <Quiz
          question={data.question}
          answerOptions={data.answerOptions}
          onSubmit={handleQuizSubmit}
        />
      );

    case "VIEWING_QUESTION_RESULTS":
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
