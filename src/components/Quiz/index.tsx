import { Page } from "../Page";
import { QuizForm } from "../QuizForm";
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
    answerQuestion,
    QuizStatus,
  } = useQuiz(countries);

  switch (quizStatus) {
    case QuizStatus.Answering:
      return (
        <Page>
          <QuizForm
            flag={currentQuestion.flag}
            question={currentQuestion.title}
            answerOptions={currentQuestion.answerOptions}
            chosenAnswer={chosenAnswer}
            answerQuestion={answerQuestion}
          />
        </Page>
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
