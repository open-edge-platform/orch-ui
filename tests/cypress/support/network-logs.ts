/*
* SPDX-FileCopyrightText: (C) 2023 Intel Corporation
* SPDX-License-Identifier: Apache-2.0
*/

import { CyHttpMessages } from "cypress/types/net-stubbing";
import * as path from "path";
import { LogFolder } from "./index";
import IncomingHttpResponse = CyHttpMessages.IncomingHttpResponse;
import IncomingHttpRequest = CyHttpMessages.IncomingHttpRequest;

interface NetworkLogMessage {
  url: string;
  request: {
    headers?: { [p: string]: string | string[] };
    method: string;
    query?: Record<string, string | number>;
    body?: string;
  };
  response: {
    statusCode: number;
    headers?: { [p: string]: string | string[] };
    body?: string;
  };
}

export class NetworkLog {
  private _logs: NetworkLogMessage[] = [];

  public intercept(url: string = "**/v1/**") {
    cy.intercept({ url }, (req) => {
      req.on("response", (res) => {
        this.log(req, res);
      });
    }).as("api");
  }

  public interceptAll(urls: string[]) {
    urls.forEach((url) => this.intercept(url));
  }

  public get logs(): NetworkLogMessage[] {
    if (!this._logs) {
      this._logs = [];
    }
    return this._logs;
  }

  public clear() {
    this._logs = [];
  }

  public log(request: IncomingHttpRequest, response: IncomingHttpResponse) {
    this.logs.push({
      url: request.url,
      request: {
        method: request.method,
        headers: request.headers,
        query: request.query,
        body: request.body,
      },
      response: {
        statusCode: response.statusCode,
        headers: response.headers,
        body: response.body,
      },
    });
  }

  public save(fileName: string = Cypress.currentTest.titlePath.join("_")) {
    const fn = fileName.replace(/\s/g, "_").replace(":", "").toLowerCase();
    const file = path.join(LogFolder, `${fn}_network_logs.json`);
    cy.writeFile(file, this.logs);
  }
}
