/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

// App Orch errors
export const orchAppOrchError = {
  status: 400,
  data: {
    code: 400,
    message: "appOrch error example message",
    details: "appOrch error example details",
  },
};

// CM errors
export const orchECMError = {
  status: 400,
  data: {
    code: 400,
    message: "cm error example message",
  },
};

// EIM errors
export const orchEIMError = {
  status: 400,
  data: {
    status: "UNKNOW_ERROR",
    detail: "UNKNOW_ERROR. Please contact the administrator.",
  },
};
export const miMessageError = {
  status: 500,
  data: {
    message: "eim error example details",
  },
};

// Auth error
export const authenticatedError = {
  status: 401,
  data: {
    status: "UNKNOW_ERROR",
    detail: "auth error example",
  },
};
export const authorizationError = {
  status: 403,
  data: {
    status: "UNKNOW_ERROR",
    detail: "authorization error example",
  },
};

// Others
export const unknowError = {
  status: 500,
  data: {
    content: "unknown error example message",
    status: 500,
  },
};
export const detailError = {
  status: 500,
  data: {
    status: 500,
    data: {
      detail: "error example with detail",
    },
  },
};
export const fetchBaseError = {
  status: "FETCH_ERROR",
  data: {
    status: "FETCH_ERROR",
    data: "fetch base error example message",
  },
  error: "error content",
};
