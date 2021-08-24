import { chooseUniqueItems, chooseIndex, chooseItem } from "utils";
import { Country } from "types";

const chooseCountries = (countries: Country[]) => {
  const numberOfAnswerOptions = 4;
  return chooseUniqueItems(countries, numberOfAnswerOptions);
};

enum QuestionTheme {
  Flag = "FLAG",
  Capital = "CAPITAL",
}

const allQuestionThemes = Object.values(QuestionTheme);

export interface Question {
  title: string;
  flag?: string;
  answerOptions: string[];
  correctAnswer: string;
}

export const generateQuestionFromCountryList = (countries: Country[]) => {
  const questionTheme = chooseItem(allQuestionThemes);
  const randomCountries = chooseCountries(countries);
  const countryNames = randomCountries.map((country) => country.name);
  const correctCountry = randomCountries[chooseIndex(randomCountries)];

  const question = {
    flag:
      questionTheme === QuestionTheme.Capital ? undefined : correctCountry.flag,
    answerOptions: countryNames,
    title:
      questionTheme === QuestionTheme.Capital
        ? `${correctCountry.capital} is the capital of`
        : "Which country does this flag belong to?",
    correctAnswer: correctCountry.name,
  };
  return question;
};
