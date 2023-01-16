import { UnexpectedError } from "errors";
import { RequestResult, Country } from "types";

export type CountryResults = RequestResult<Country[]>;

type Field = "name" | "flags" | "capital";

interface fetchAllCountriesOptions {
  fields: Field[];
}

const apiRoot = "https://restcountries.com/v3.1";

export const fetchAllCountries = async ({
  fields,
}: fetchAllCountriesOptions) => {
  const url = addFieldsToUrl(`${apiRoot}/all`, fields);
  const response = await fetch(url);

  if (!response.ok) {
    throw new UnexpectedError();
  }

  const countries = await response.json();
  return countries.map((country) => ({
    ...country,
    flag: country.flags.svg,
    name: country.name.common,
  }));
};

const addFieldsToUrl = (baseURL: string, fields: Field[]) =>
  fields.reduce((url, field) => url + field + ",", `${baseURL}?fields=`);
