import { useState, useEffect } from "react";
import { LoadingPage, ErrorPage } from "components";
import { fetchAllCountries, CountryResults, RequestStatus } from "data";

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
