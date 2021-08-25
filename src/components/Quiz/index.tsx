import { QuestionPage } from "../QuestionPage";
import { QuestionResults } from "../QuestionResults";
import { QuizResults } from "../QuizResults";
import { Country } from "types";
import { useQuiz } from "hooks";

interface QuizProps {
  countries: Country[];
}

export const Quiz = ({ countries }: QuizProps) => {
  const {
    currentQuestion,
    chosenAnswer,
    correctAnswers,
    quizStatus,
    finishQuiz,
    continueQuiz,
    resetQuiz,
    chooseAnswer,
    answerQuestion,
    QuizStatus,
  } = useQuiz(countries);

  switch (quizStatus) {
    case QuizStatus.Answering:
      return (
        <QuestionPage
          flag={currentQuestion.flag}
          question={currentQuestion.title}
          answerOptions={currentQuestion.answerOptions}
          chosenAnswer={chosenAnswer}
          chooseAnswer={chooseAnswer}
          answerQuestion={answerQuestion}
        />
      );

    case QuizStatus.ViewingQuestionResults:
      return (
        <QuestionResults
          question={currentQuestion}
          chosenAnswer={chosenAnswer}
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
