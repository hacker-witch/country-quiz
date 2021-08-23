import { useState, useEffect } from "react";
import { LoadingPage, ErrorPage, Quiz } from "components";
import { fetchAllCountries, CountryResults, RequestStatus } from "data";
import { ApplicationError, NetworkError } from "errors";

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
        if (error instanceof ApplicationError) {
          setCountryResults({
            error: error.message,
            status: RequestStatus.Error,
          });
          return;
        }

        setCountryResults({
          error: new NetworkError().message,
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
      return <Quiz countries={countryResults.data} />;
  }
};
