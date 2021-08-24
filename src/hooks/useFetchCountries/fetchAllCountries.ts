import { UnexpectedError } from "errors";
import { RequestResult } from "types";

export interface Country {
  name: string;
  flag: string;
  capital: string;
}

export type CountryResults = RequestResult<Country[]>;

type Field = "name" | "flag" | "capital";

interface fetchAllCountriesOptions {
  fields: Field[];
}

const apiRoot = "https://restcountries.eu/rest/v2";

export const fetchAllCountries = async ({
  fields,
}: fetchAllCountriesOptions) => {
  const url = addFieldsToUrl(`${apiRoot}/all`, fields);
  const response = await fetch(url);

  if (!response.ok) {
    throw new UnexpectedError();
  }

  const countries = await response.json();
  return countries;
};

const addFieldsToUrl = (baseURL: string, fields: Field[]) =>
  fields.reduce((url, field) => url + field + ";", `${baseURL}?fields=`);
