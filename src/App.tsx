import { useState, useEffect } from "react";
import { Quiz, QuestionResults, QuizResults } from "components";
import { chooseIndex } from "utils";

enum QuizStatus {
  Answering = "ANSWERING",
  ViewingQuestionResults = "VIEWING_QUESTION_RESULTS",
  GameOver = "GAME_OVER",
}

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [answerOptions, setAnswerOptions] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
  const [chosenAnswer, setChosenAnswer] = useState<string | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizStatus, setQuizStatus] = useState(QuizStatus.Answering);

  const generateQuestion = async () => {
    const baseURL = "https://restcountries.eu/rest/v2";

    const response = await fetch(`${baseURL}/all/?fields=name;capital`);
    const countries = await response.json();

    const randomCountries = Array.from(
      { length: 4 },
      () => countries[chooseIndex(countries)]
    );

    const countryNames = randomCountries.map((country) => country.name);

    const correctCountry = randomCountries[chooseIndex(randomCountries)];

    const question = {
      answerOptions: countryNames,
      title: `${correctCountry.capital} is the capital of`,
      correctAnswer: correctCountry.name,
    };

    return question;
  };

  useEffect(() => {
    if (quizStatus === QuizStatus.Answering) {
      setIsLoading(true);

      startQuiz().then(() => setIsLoading(false));
    }
  }, [quizStatus]);

  const startQuiz = async () => {
    const question = await generateQuestion();
    setAnswerOptions(question.answerOptions);
    setCurrentQuestion(question.title);
    setCorrectAnswer(question.correctAnswer);
  };

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

  if (isLoading) return null;

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
