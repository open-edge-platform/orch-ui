/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { CyHttpMessages, Interception } from "cypress/types/net-stubbing";

interface CyLogMessage {
  message: string;
  args?: any;
}

export type CyRequest = CyHttpMessages.IncomingRequest;

import { CyPom } from "./cyBase";

export class CyLog {
  private static _logs: CyLogMessage[];
  public static get logs(): CyLogMessage[] {
    if (!CyLog._logs) {
      CyLog._logs = [];
    }
    return CyLog._logs;
  }
  public static set logs(value: CyLogMessage[]) {
    this._logs = [];
  }

  public static clear() {
    this.logs = [];
  }
  public static message(message: string, args: any) {
    this.logs.push({
      message,
      args,
    });
  }

  public static startupInfo(category: string, uiUrl: string) {
    CyLog.logs.push({
      message: "Starting urls",
      args: {
        uiUrl,
        category,
        dataFile: CyPom.dataFile,
      },
    });
  }

  public static request(alias: string, request: CyRequest) {
    CyLog.logs.push({
      message: `API request: @${alias}`,
      args: {
        url: request.url,
        method: request.method,
        query: request.query,
        body: request.body,
      },
    });
  }

  public static response(alias: string, intercept: Interception) {
    CyLog.logs.push({
      message: `API response: ${alias}`,
      args: {
        statusCode: intercept.response?.statusCode,
        response: intercept.response?.body,
      },
    });
  }

  public static error(errorInfo: string) {
    CyLog.logs.push({
      message: "Error encountered",
      args: errorInfo,
    });
  }
}
