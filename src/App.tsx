import { useState } from "react";
import { Quiz, QuestionResults, QuizResults } from "components";

const data = {
  question: "Kuala Lumpur is the capital of",
  answerOptions: ["vietnam", "malaysia", "sweden", "austria"],
  correctAnswer: "malaysia",
};

enum QuizStatus {
  Answering = "ANSWERING",
  ViewingQuestionResults = "VIEWING_QUESTION_RESULTS",
  GameOver = "GAME_OVER",
}

export const App = () => {
  const [chosenAnswer, setChosenAnswer] = useState<string | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizStatus, setQuizStatus] = useState(QuizStatus.Answering);

  const finishQuiz = () => setQuizStatus(QuizStatus.GameOver);

  const continueQuiz = () => setQuizStatus(QuizStatus.Answering);

  const answerQuestion = (answer: string) => {
    setChosenAnswer(answer);
    setQuizStatus(QuizStatus.ViewingQuestionResults);

    if (answer === data.correctAnswer) {
      setCorrectAnswers(correctAnswers + 1);
    }
  };

  switch (quizStatus) {
    case QuizStatus.Answering:
      return (
        <Quiz
          question={data.question}
          answerOptions={data.answerOptions}
          onSubmit={answerQuestion}
        />
      );

    case QuizStatus.ViewingQuestionResults:
      return (
        <QuestionResults
          question={data.question}
          answerOptions={data.answerOptions}
          chosenAnswer={chosenAnswer!}
          correctAnswer={data.correctAnswer}
          finishQuiz={finishQuiz}
          continueQuiz={continueQuiz}
        />
      );

    case QuizStatus.GameOver:
      return <QuizResults />;

    default:
      return null;
  }
};
