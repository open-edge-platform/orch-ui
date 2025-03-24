/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { InternalError, parseError } from "@orch-ui/utils";
import { MessageBanner } from "@spark-design/react";
import { AlertVariant } from "@spark-design/tokens";
import "./ApiError.scss";

/*
 * An component to show error information specific for API call.
 * In terms of different types of error, a narrow should be implemented.
 * See `https://redux-toolkit.js.org/rtk-query/usage-with-typescript#type-safe-error-handling`
 * Props:
 *  @param {unknown} error required; the error thrown out by RTK Query.
 */
interface ApiErrorProps {
  error: unknown;
}
const errorMapping = (lpError: InternalError) => {
  switch (lpError?.status) {
    case 7:
    case 403:
      return {
        title: "Additional Permissions Needed",
        variant: "info",
        closable: false,
        message:
          "Only user accounts with read/write permissions can access this data. Contact your system administrator to request read/write access.",
      };
    case 16:
    case 401:
      return {
        title: "Additional Permissions Needed",
        variant: "info",
        closable: false,
        message: lpError.data,
      };

    case 14:
    case 503:
      return {
        title: "Service Unavailable",
        variant: "error",
        closable: false,
        message: lpError.data,
      };

    default:
      return {
        title: "Unfortunately an error occurred",
        variant: "error",
        closable: true,
        message: lpError.data,
      };
  }
};
/**
 * Handles ApiErrors
 */
export const ApiError = ({ error }: ApiErrorProps) => {
  const apiError = errorMapping(parseError(error));
  return (
    <div data-cy="apiError" className="api-error">
      <MessageBanner
        showIcon
        showClose={apiError.closable}
        variant={(apiError.variant as AlertVariant) ?? "error"}
        messageTitle={apiError.title}
        messageBody={apiError.message}
        outlined
      />
    </div>
  );
};
