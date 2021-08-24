import { LoadingPage, ErrorPage, Quiz } from "components";
import { useFetchCountries } from "hooks";

export const App = () => {
  const { countryResults, RequestStatus } = useFetchCountries();

  switch (countryResults.status) {
    case RequestStatus.Loading:
      return <LoadingPage />;

    case RequestStatus.Error:
      return <ErrorPage error={countryResults.error} />;

    case RequestStatus.Complete:
      return <Quiz countries={countryResults.data} />;
  }
};
