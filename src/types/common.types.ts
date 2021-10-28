export type ErrorType = {
  code: string;
  value: string;
};

export type HttpResponse<T> = {
  statusCode: number | undefined | null;
  succeeded: boolean | undefined | null;
  message: string | undefined | null;
  errors: ErrorType[] | undefined | null;
  payload: T | undefined | null;
};
