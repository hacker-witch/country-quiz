import { useState, useEffect } from "react";
import { Quiz, QuestionResults, QuizResults } from "components";
import { chooseIndex } from "utils";

enum QuizStatus {
  Answering = "ANSWERING",
  ViewingQuestionResults = "VIEWING_QUESTION_RESULTS",
  GameOver = "GAME_OVER",
}

export const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [answerOptions, setAnswerOptions] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
  const [chosenAnswer, setChosenAnswer] = useState<string | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizStatus, setQuizStatus] = useState(QuizStatus.Answering);

  useEffect(() => {
    if (quizStatus === QuizStatus.Answering) {
      const baseURL = "https://restcountries.eu/rest/v2";
      fetch(`${baseURL}/all/?fields=name;capital`)
        .then((response) => response.json())
        .then((data) => {
          const randomCountries = Array.from(
            { length: 4 },
            () => data[chooseIndex(data)]
          );

          const countryNames = randomCountries.map((country) => country.name);
          setAnswerOptions(countryNames);

          const correctCountry = randomCountries[chooseIndex(randomCountries)];
          setCurrentQuestion(`${correctCountry.capital} is the capital of`);
          setCorrectAnswer(correctCountry.name);
        });
    }
  }, [quizStatus]);

  const finishQuiz = () => setQuizStatus(QuizStatus.GameOver);

  const continueQuiz = () => setQuizStatus(QuizStatus.Answering);

  const resetQuiz = () => {
    setChosenAnswer(null);
    setCorrectAnswers(0);
    setQuizStatus(QuizStatus.Answering);
  };

  const answerQuestion = (answer: string) => {
    setChosenAnswer(answer);
    setQuizStatus(QuizStatus.ViewingQuestionResults);

    if (answer === correctAnswer) {
      setCorrectAnswers(correctAnswers + 1);
    }
  };

  switch (quizStatus) {
    case QuizStatus.Answering:
      return (
        <Quiz
          question={currentQuestion}
          answerOptions={answerOptions}
          onSubmit={answerQuestion}
        />
      );

    case QuizStatus.ViewingQuestionResults:
      return (
        <QuestionResults
          question={currentQuestion}
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
