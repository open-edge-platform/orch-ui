/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */
/** These functions are used within the E2E testfiles */
export const testingBaseURL = "/";

/**
 * @deprecated
 */
export const cyGet = (selector: string) => cy.get(`[data-cy='${selector}']`);

/**
 * @deprecated
 */
export const cyGetClass = (className: string) =>
  cy.get(`*[class^=${className}]`);

/**
 * @deprecated
 */
export const interceptWithStaticMock = ({
  method = "GET",
  url,
  statusCode,
  body = {},
  alias,
  delay = 0,
}: {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  statusCode: number;
  body?: any;
  alias: string;
  delay?: number;
}) =>
  cy
    .intercept(method, url, {
      statusCode,
      body,
      delay,
    })
    .as(alias);

/**
 * @deprecated
 */
export const interceptWithFixtureMock = ({
  url,
  statusCode,
  fixture,
  alias,
  delay = 0,
}: {
  url: string;
  statusCode: number;
  fixture?: any;
  alias: string;
  delay?: number;
}) =>
  cy
    .intercept(url, {
      statusCode,
      fixture,
      delay,
    })
    .as(alias);
