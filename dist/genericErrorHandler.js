"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = handleError;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
function handleError(error) {
    let response = {
        message: "An error occurred",
        success: false,
        error: {},
    };
    // Zod validation error
    if (error instanceof zod_1.ZodError) {
        const formattedErrors = {};
        error.errors.forEach((err) => {
            formattedErrors[err.path[0]] = {
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
    }
    else if (error instanceof mongoose_1.Error.ValidationError) {
        const formattedErrors = {};
        for (const field in error.errors) {
            const fieldError = error.errors[field];
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
