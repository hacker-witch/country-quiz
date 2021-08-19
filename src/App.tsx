import { useState, useEffect } from "react";
import { Quiz, QuestionResults, QuizResults } from "components";
import { chooseIndex } from "utils";

const baseURL = "https://restcountries.eu/rest/v2";

enum QuestionType {
  Flag = "FLAG",
  Capital = "CAPITAL",
}

const generateQuestion = async () => {
  const questionType =
    Math.floor(Math.random() * 2) === 0
      ? QuestionType.Flag
      : QuestionType.Capital;

  switch (questionType) {
    case QuestionType.Flag:
      return await generateFlagQuestion();
    case QuestionType.Capital:
      return await generateCapitalQuestion();
  }
};

const generateFlagQuestion = async () => {
  const response = await fetch(`${baseURL}/all/?fields=name;flag`);

  if (!response.ok) {
    throw new Error("Response was not ok!");
  }

  const countries = await response.json();

  const randomCountries = Array.from(
    { length: 4 },
    () => countries[chooseIndex(countries)]
  );

  const countryNames = randomCountries.map((country) => country.name);

  const correctCountry = randomCountries[chooseIndex(randomCountries)];

  const question = {
    flag: correctCountry.flag,
    answerOptions: countryNames,
    title: "Which country does this flag belong to?",
    correctAnswer: correctCountry.name,
  };

  return question;
};

const generateCapitalQuestion = async () => {
  const response = await fetch(`${baseURL}/all/?fields=name;capital`);

  if (!response.ok) {
    throw new Error("Response was not ok!");
  }

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

enum QuizStatus {
  Answering = "ANSWERING",
  ViewingQuestionResults = "VIEWING_QUESTION_RESULTS",
  GameOver = "GAME_OVER",
}

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
  const [answerOptions, setAnswerOptions] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
  const [chosenAnswer, setChosenAnswer] = useState<string | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizStatus, setQuizStatus] = useState(QuizStatus.Answering);

  useEffect(() => {
    startQuiz();
  }, []);

  const startQuiz = async () => {
    setIsLoading(true);

    try {
      const question = await generateQuestion();
      setAnswerOptions(question.answerOptions);
      setCurrentQuestion(question.title);
      setCorrectAnswer(question.correctAnswer);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const finishQuiz = () => setQuizStatus(QuizStatus.GameOver);

  const continueQuiz = () => {
    setQuizStatus(QuizStatus.Answering);
    startQuiz();
  };

  const resetQuiz = () => {
    setChosenAnswer(null);
    setCorrectAnswers(0);
    setQuizStatus(QuizStatus.Answering);
    startQuiz();
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
          question={currentQuestion!}
          answerOptions={answerOptions}
          onSubmit={answerQuestion}
        />
      );

    case QuizStatus.ViewingQuestionResults:
      return (
        <QuestionResults
          question={currentQuestion!}
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
