import { useState, useEffect } from "react";
import { LoadingPage, ErrorPage } from "components";
import { fetchAllCountries } from "data";

interface Country {
  name: string;
  flag: string;
  capital: string;
}

enum RequestStatus {
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

type CountryResults = RequestResult<Country[]>;

export const App = () => {
  const [countryResults, setCountryResults] = useState<CountryResults>({
    status: RequestStatus.Loading,
  });

  useEffect(() => {
    fetchAllCountries({ fields: ["name", "capital", "flag"] })
      .then((countries) => {
        setCountryResults({ data: countries, status: RequestStatus.Complete });
      })
      .catch((error) => {
        setCountryResults({
          error: error.message,
          status: RequestStatus.Error,
        });
      });
  }, []);

  switch (countryResults.status) {
    case RequestStatus.Loading:
      return <LoadingPage />;

    case RequestStatus.Error:
      return <ErrorPage error={countryResults.error} />;

    case RequestStatus.Complete:
      return null;
  }
};
