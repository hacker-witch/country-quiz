import { UnexpectedError } from "errors";

export interface Country {
  name: string;
  flag: string;
  capital: string;
}

export enum RequestStatus {
  Loading = "LOADING",
  Error = "ERROR",
  Complete = "COMPLETE",
}

interface RequestLoading {
  status: RequestStatus.Loading;
}

interface RequestError {
  status: RequestStatus.Error;
  error: string;
}

interface RequestComplete<T> {
  status: RequestStatus.Complete;
  data: T;
}

type RequestResult<T> = RequestLoading | RequestComplete<T> | RequestError;

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
