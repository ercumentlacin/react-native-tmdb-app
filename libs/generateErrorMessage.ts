import { isKnownError } from "@clerk/clerk-expo";

interface KnownError {
  errors: {
    message: string;
  }[];
}

export const generateErrorMessage = (error: unknown, init = "An error occurred") => {
  let message = init.concat("");
  if (isKnownError(error)) {
    message = (error as KnownError).errors[0].message;
  } else if (error instanceof Error) {
    message = error.message;
  }
  return message;
};
