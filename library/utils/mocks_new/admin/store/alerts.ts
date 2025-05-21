/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { omApi } from "@orch-ui/apis";
import {
  alertEight,
  alertFive,
  alertFour,
  alertNine,
  alertOne,
  alertSeven,
  alertSix,
  alertTen,
  alertThree,
  alertTwo,
} from "../data/alerts";

const multipleAlerts: omApi.Alert[] = [
  alertOne,
  alertTwo,
  alertThree,
  alertFour,
  alertFive,
  alertSix,
  alertSeven,
  alertEight,
  alertNine,
  alertTen,
];

export default class AlertStore {
  alerts: omApi.Alert[];
  constructor() {
    this.alerts = multipleAlerts;
  }

  list(): omApi.Alert[] {
    return this.alerts;
  }

  get(id: string): omApi.Alert | undefined {
    return this.alerts.find((a) => a.alertDefinitionId === id);
  }
}
