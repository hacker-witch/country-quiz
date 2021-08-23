import { chooseUniqueItems, chooseIndex, chooseItem } from "utils";
import { Country } from "data";

const chooseCountries = (countries: Country[]) => {
  const numberOfAnswerOptions = 4;
  return chooseUniqueItems(countries, numberOfAnswerOptions);
};

enum QuestionType {
  Flag = "FLAG",
  Capital = "CAPITAL",
}

const allQuestionTypes = Object.values(QuestionType);

export interface Question {
  title: string;
  flag?: string;
  answerOptions: string[];
  correctAnswer: string;
}

export const generateQuestionFromCountryList = (countries: Country[]) => {
  const questionType = chooseItem(allQuestionTypes);
  const randomCountries = chooseCountries(countries);
  const countryNames = randomCountries.map((country) => country.name);
  const correctCountry = randomCountries[chooseIndex(randomCountries)];

  const question = {
    flag:
      questionType === QuestionType.Capital ? undefined : correctCountry.flag,
    answerOptions: countryNames,
    title:
      questionType === QuestionType.Capital
        ? `${correctCountry.capital} is the capital of`
        : "Which country does this flag belong to?",
    correctAnswer: correctCountry.name,
  };
  return question;
};
