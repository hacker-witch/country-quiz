import { z } from "zod";
import { UnexpectedError } from "errors";
import { RequestResult, Country } from "types";

export type CountryResults = RequestResult<Country[]>;

const responseSchema = z
  .object({
    name: z.object({
      common: z.string().min(1),
    }),
    flags: z.object({
      svg: z.string().url(),
    }),
    capital: z.string().array().optional(),
  })
  .array();

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

  const countries = responseSchema.parse(await response.json());
  return countries.map((country) => ({
    ...country,
    flag: country.flags.svg,
    name: country.name.common,
    capital: country.capital !== undefined ? country.capital[0] : undefined,
  }));
};

const addFieldsToUrl = (baseURL: string, fields: Field[]) =>
  fields.reduce((url, field) => url + field + ",", `${baseURL}?fields=`);
