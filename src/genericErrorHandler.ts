import { ZodError } from "zod";
import { Error as MongooseError } from "mongoose";

interface GenericErrorResponse {
  message: string;
  success: boolean;
  error: any;
}

export function handleError(error: unknown): GenericErrorResponse {
  let response: GenericErrorResponse = {
    message: "An error occurred",
    success: false,
    error: {},
  };

  // Zod validation error
  if (error instanceof ZodError) {
    const formattedErrors: Record<string, any> = {};
    error.errors.forEach((err) => {
      formattedErrors[err.path[0] as string] = {
        message: err.message,
        name: "ValidatorError",
        properties: {
          message: err.message,
          type: "validation",
        },
        kind: "validation",
        path: err.path[0],
        value: undefined,
      };
    });

    response.message = "Validation failed";
    response.error = {
      name: "ValidationError",
      errors: formattedErrors,
    };
  } else if (error instanceof MongooseError.ValidationError) {
    const formattedErrors: Record<string, any> = {};
    for (const field in error.errors) {
      const fieldError = error.errors[field] as any;
      formattedErrors[field] = {
        message: fieldError.message,
        name: fieldError.name,
        properties: fieldError.properties,
        kind: fieldError.kind,
        path: fieldError.path,
        value: fieldError.value,
      };
    }

    response.message = "Validation failed";
    response.error = {
      name: "ValidationError",
      errors: formattedErrors,
    };
  }

  // Other unknown error
  else if (error instanceof Error) {
    response.message = error.message || "An unexpected error occurred";
    response.error = {
      name: "UnknownError",
      message: error.message,
      stack: error.stack,
    };
  }

  return response;
}
