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

export type RequestResult<T> =
  | RequestLoading
  | RequestComplete<T>
  | RequestError;
