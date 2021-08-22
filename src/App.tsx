import {
  Quiz,
  QuestionResults,
  QuizResults,
  LoadingPage,
  ErrorPage,
} from "components";
import { useQuiz } from "hooks";

export const App = () => {
  const {
    isLoading,
    error,
    currentQuestion,
    flag,
    answerOptions,
    correctAnswer,
    chosenAnswer,
    correctAnswers,
    quizStatus,
    finishQuiz,
    continueQuiz,
    resetQuiz,
    answerQuestion,
    QuizStatus,
  } = useQuiz();

  if (isLoading) return <LoadingPage />;

  if (error) return <ErrorPage error={error} />;

  switch (quizStatus) {
    case QuizStatus.Answering:
      return (
        <Quiz
          question={currentQuestion!}
          flag={flag ? flag : undefined}
          answerOptions={answerOptions}
          chosenAnswer={chosenAnswer!}
          onSubmit={answerQuestion}
        />
      );

    case QuizStatus.ViewingQuestionResults:
      return (
        <QuestionResults
          question={currentQuestion!}
          flag={flag ? flag : undefined}
          answerOptions={answerOptions}
          chosenAnswer={chosenAnswer!}
          correctAnswer={correctAnswer!}
          finishQuiz={finishQuiz}
          continueQuiz={continueQuiz}
        />
      );

    case QuizStatus.GameOver:
      return (
        <QuizResults correctAnswers={correctAnswers} resetQuiz={resetQuiz} />
      );

    default:
      return null;
  }
};
