/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

/*******************************/
// NOTE:  these types are to direct orch imports that were previously seen
// in this file in the 'shared' folder
type EimUIError = {
  message?: string;
};

export type GoogleProtobufAny = {
  "@type"?: string;
  [key: string]: any;
};
type AppOrchUIError = {
  code?: number;
  message?: string;
  details?: GoogleProtobufAny[];
};
type ClusterOrchError = {
  code?: number;
  message?: string;
};
/*******************************/

export interface InternalError {
  status:
    | number
    | "FETCH_ERROR"
    | "PARSING_ERROR"
    | "TIMEOUT_ERROR"
    | "CUSTOM_ERROR"
    | "UNKNOWN_ERROR";
  data: string;
}

export interface InfraUIMessageError {
  message: string;
}

const UNKNOWN_ERROR_MSG = "Unknown error. Please contact the administrator.";

/**
 * Given and error we make our best guesses to format it in a readable way
 * @param error
 */
export function parseError(error: unknown): InternalError {
  if (isFetchBaseQueryError(error)) {
    if (!isNaN(<number>error.status)) {
      if (isErrorWithDetail(error.data)) {
        return {
          status: error.status,
          data: error.data.data.detail || UNKNOWN_ERROR_MSG,
        };
      }
      if (isEimUIError(error.data)) {
        return {
          status: error.status || "UNKNOWN_ERROR",
          data: error.data.message || UNKNOWN_ERROR_MSG,
        };
      }
      if (isAppOrchUIError(error.data)) {
        return {
          status: error.data.code || "UNKNOWN_ERROR",
          data: error.data.message || UNKNOWN_ERROR_MSG,
        };
      }
      if (isClusterOrchError(error.data)) {
        return {
          status: error.data.code || "UNKNOWN_ERROR",
          data: error.data.message || UNKNOWN_ERROR_MSG,
        };
      }
      if (isEimUIMessageError(error.data)) {
        return {
          status: error.status || "UNKNOWN_ERROR",
          data: error.data.message || UNKNOWN_ERROR_MSG,
        };
      }
      return {
        status: error.status,
        data: UNKNOWN_ERROR_MSG,
      };
    }
    switch (error.status) {
      case "FETCH_ERROR":
        return {
          status: error.status,
          data: error.error,
        };
      case "PARSING_ERROR":
        return {
          status: error.originalStatus,
          data: error.data,
        };
    }
    return {
      status: error.status,
      data: UNKNOWN_ERROR_MSG,
    };
  }
  if (typeof error === "string" || error instanceof String) {
    return {
      status: "CUSTOM_ERROR",
      data: `${error}`,
    };
  }
  return {
    status: 400,
    data: UNKNOWN_ERROR_MSG,
  };
}

function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return (
    typeof error === "object" &&
    error != null &&
    "data" in error &&
    "status" in error
  );
}

export function isAppOrchUIError(error: unknown): error is AppOrchUIError {
  return (
    typeof error === "object" &&
    error != null &&
    "code" in error &&
    "message" in error &&
    "details" in error
  );
}

function isEimUIError(error: unknown): error is EimUIError {
  return (
    typeof error === "object" &&
    error != null &&
    "status" in error &&
    "detail" in error
  );
}

function isEimUIMessageError(error: unknown): error is InfraUIMessageError {
  return typeof error === "object" && error != null && "message" in error;
}

function isClusterOrchError(error: unknown): error is ClusterOrchError {
  return (
    typeof error === "object" &&
    error != null &&
    "code" in error &&
    "message" in error
  );
}

// Narrow error type to an object with string `detail`
function isErrorWithDetail(
  error: unknown,
): error is { data: { detail: string } } {
  if (typeof error === "object" && error != null && "data" in error) {
    const e = error as { data: object };
    return (
      typeof e.data === "object" &&
      e.data != null &&
      "detail" in e.data &&
      typeof (e.data as any).detail === "string"
    );
  }
  return false;
}

/**
 * Utility to log errors that don't need to be bubbled up to the user but we want to report
 * It is defined as a centralized utility as we might want to start collecting them sometime in the future
 */
export function logError(error: InternalError | unknown, message?: string) {
  // eslint-disable-next-line no-console
  return message ? console.error(message, error) : console.error(error);
}
