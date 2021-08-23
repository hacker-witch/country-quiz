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

export const App = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [status, setStatus] = useState(RequestStatus.Loading);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllCountries({ fields: ["name", "capital", "flag"] })
      .then((countries) => {
        setCountries(countries);
        setStatus(RequestStatus.Complete);
      })
      .catch((error) => {
        setStatus(RequestStatus.Error);
        setError(error.message);
      });
  }, []);

  switch (status) {
    case RequestStatus.Loading:
      return <LoadingPage />;
    case RequestStatus.Error:
      return <ErrorPage error={error!} />;
    case RequestStatus.Complete:
      return null;
  }
};
