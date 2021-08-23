import { fetchAllCountries } from "./countriesAPIClient";
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

interface Question {
  title: string;
  flag?: string;
  answerOptions: string[];
  correctAnswer: string;
}

export const generateQuestion = async (): Promise<Question> => {
  const questionType = chooseItem(allQuestionTypes);

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
  const countries = await fetchAllCountries({ fields: ["name", "flag"] });
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
  const countries = await fetchAllCountries({ fields: ["name", "capital"] });
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
