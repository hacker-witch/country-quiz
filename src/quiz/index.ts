import { chooseUniqueItems, chooseIndex } from "utils";
import { ApplicationError, NetworkError, UnexpectedError } from "errors";

interface Country {
  name: string;
  capital?: string;
  flag?: string;
}

const chooseCountries = (countries: Country[]) => {
  const numberOfAnswerOptions = 4;
  return chooseUniqueItems(countries, numberOfAnswerOptions);
};

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

export const generateQuestion = async (): Promise<Question> => {
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
