import { useState, useEffect } from "react";
import { fetchAllCountries, CountryResults } from "./fetchAllCountries";
import { RequestStatus } from "types";
import { ApplicationError, NetworkError } from "errors";

export const useFetchCountries = () => {
  const [countryResults, setCountryResults] = useState<CountryResults>({
    status: RequestStatus.Loading,
  });

  useEffect(() => {
    fetchAllCountries({ fields: ["name", "capital", "flag"] })
      .then((countries) => {
        setCountryResults({ data: countries, status: RequestStatus.Complete });
      })
      .catch((error) => {
        const errorMessage =
          error instanceof ApplicationError
            ? error.message
            : new NetworkError().message;

        setCountryResults({
          error: errorMessage,
          status: RequestStatus.Error,
        });
      });
  }, []);

  return countryResults;
};
