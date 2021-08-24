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

export const generateQuestionFromCountryList = (
  countries: Country[],
  pastQuestionTitles: string[]
) => {
  let question;
  do {
    const questionTheme = chooseItem(allQuestionThemes);
    const randomCountries = chooseCountries(countries);
    const countryNames = randomCountries.map((country) => country.name);
    const correctCountry = randomCountries[chooseIndex(randomCountries)];

    question = makeQuestion({
      questionTheme,
      country: correctCountry,
      answerOptions: countryNames,
    });
  } while (pastQuestionTitles.includes(question.title));

  return question;
};

interface MakeQuestionOptions {
  questionTheme: QuestionTheme;
  country: Country;
  answerOptions: string[];
}

const makeQuestion = ({
  questionTheme,
  country,
  answerOptions,
}: MakeQuestionOptions) => ({
  flag: questionTheme === QuestionTheme.Capital ? undefined : country.flag,
  answerOptions,
  title:
    questionTheme === QuestionTheme.Capital
      ? `${country.capital} is the capital of`
      : "Which country does this flag belong to?",
  correctAnswer: country.name,
});
