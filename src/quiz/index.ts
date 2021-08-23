import { fetchAllCountries } from "data";
import { chooseUniqueItems, chooseIndex, chooseItem } from "utils";
import { ApplicationError, NetworkError } from "errors";

interface Country {
  name: string;
  capital?: string;
  flag?: string;
}

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

export const generateQuestion = async (): Promise<Question> => {
  try {
    const questionType = chooseItem(allQuestionTypes);
    const countries =
      questionType === QuestionType.Capital
        ? await fetchAllCountries({ fields: ["name", "capital"] })
        : await fetchAllCountries({ fields: ["name", "flag"] });
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
  } catch (error) {
    if (error instanceof ApplicationError) {
      throw error;
    }

    throw new NetworkError();
  }
};

export const generateQuestionFromCountryList = (
  countries: Required<Country>[]
) => {
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
