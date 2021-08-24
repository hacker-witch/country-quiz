import { useState } from "react";
import { Page } from "../Page";
import { QuizForm } from "../QuizForm";
import { QuestionResults } from "../QuestionResults";
import { QuizResults } from "../QuizResults";
import { Country } from "data";
import { generateQuestionFromCountryList } from "quiz";

enum QuizStatus {
  Answering = "ANSWERING",
  ViewingQuestionResults = "VIEWING_QUESTION_RESULTS",
  GameOver = "GAME_OVER",
}

interface QuizProps {
  countries: Country[];
}

export const Quiz = ({ countries }: QuizProps) => {
  const initialCurrentQuestion = generateQuestionFromCountryList(countries);
  const [currentQuestion, setCurrentQuestion] = useState(
    initialCurrentQuestion
  );
  const [chosenAnswer, setChosenAnswer] = useState(
    initialCurrentQuestion.answerOptions[0]
  );
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizStatus, setQuizStatus] = useState(QuizStatus.Answering);

  const loadNextQuestion = () => {
    const question = generateQuestionFromCountryList(countries);
    setCurrentQuestion(question);
    setChosenAnswer(question.answerOptions[0]);
  };

  const finishQuiz = () => setQuizStatus(QuizStatus.GameOver);

  const continueQuiz = () => {
    setQuizStatus(QuizStatus.Answering);
    loadNextQuestion();
  };

  const resetQuiz = () => {
    setCorrectAnswers(0);
    setQuizStatus(QuizStatus.Answering);
    loadNextQuestion();
  };

  const answerQuestion = (answer: string) => {
    setChosenAnswer(answer);
    setQuizStatus(QuizStatus.ViewingQuestionResults);

    if (answer === currentQuestion.correctAnswer) {
      setCorrectAnswers(correctAnswers + 1);
    }
  };

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
