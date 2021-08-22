import { chooseUniqueItems } from "utils";

interface Country {
  name: string;
  capital?: string;
  flag?: string;
}

export const chooseCountries = (countries: Country[]) => {
  const numberOfAnswerOptions = 4;
  return chooseUniqueItems(countries, numberOfAnswerOptions);
};
