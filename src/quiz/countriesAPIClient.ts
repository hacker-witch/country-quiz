import { UnexpectedError } from "errors";

const baseURL = "https://restcountries.eu/rest/v2";

type Field = "name" | "flag" | "capital";

interface fetchAllOptions {
  fields: Field[];
}

export const fetchAllCountries = async ({ fields }: fetchAllOptions) => {
  const url = fields.reduce(
    (url, field) => url + field + ";",
    `${baseURL}/all/?fields=`
  );
  const response = await fetch(url);

  if (!response.ok) {
    throw new UnexpectedError();
  }

  const countries = await response.json();
  return countries;
};
