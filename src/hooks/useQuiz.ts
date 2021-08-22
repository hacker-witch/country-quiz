import { useState, useEffect } from "react";
import { chooseIndex, chooseUniqueItems } from "utils";
import { ApplicationError, NetworkError, UnexpectedError } from "errors";

const baseURL = "https://restcountries.eu/rest/v2";

enum QuestionType {
  Flag = "FLAG",
  Capital = "CAPITAL",
}

interface Question {
  title: string;
  flag?: string;
  answerOptions: string[];
  correctAnswer: string;
}

interface Country {
  name: string;
  capital?: string;
  flag?: string;
}

const chooseCountries = (countries: Country[]) => {
  const numberOfAnswerOptions = 4;
  return chooseUniqueItems(countries, numberOfAnswerOptions);
};

const generateQuestion = async (): Promise<Question> => {
  const questionType =
    Math.floor(Math.random() * 2) === 0
      ? QuestionType.Flag
      : QuestionType.Capital;

  switch (questionType) {
    case QuestionType.Flag:
      try {
        return await generateFlagQuestion();
      } catch (error) {
        if (error instanceof ApplicationError) {
          throw error;
        }

        throw new NetworkError();
      }

    case QuestionType.Capital:
      try {
        return await generateCapitalQuestion();
      } catch (error) {
        if (error instanceof ApplicationError) {
          throw error;
        }

        throw new NetworkError();
      }
  }
};

const generateFlagQuestion = async () => {
  const response = await fetch(`${baseURL}/all/?fields=name;flag`);

  if (!response.ok) {
    throw new UnexpectedError();
  }

  const countries = await response.json();

  const randomCountries = chooseCountries(countries);

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
    throw new UnexpectedError();
  }

  const countries = await response.json();

  const randomCountries = chooseCountries(countries);

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

export const useQuiz = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
  const [flag, setFlag] = useState<string | null>(null);
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
      setChosenAnswer(question.answerOptions[0]);
      question.flag ? setFlag(question.flag) : setFlag(null);
    } catch (error) {
      setError(error.message);
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

  return {
    isLoading,
    error,
    currentQuestion,
    flag,
    answerOptions,
    correctAnswer,
    chosenAnswer,
    correctAnswers,
    quizStatus,
    QuizStatus,
    startQuiz,
    finishQuiz,
    continueQuiz,
    resetQuiz,
    answerQuestion,
  };
};
