/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";

const dataCySelectors = [
  "alertDrawerBody",
  "alertLabel",
  "alertValue",
  "statusLabel",
  "statusValue",
  "severityLabel",
  "severityValue",
  "categoryLabel",
  "categoryValue",
  "sourceLabel",
  "sourceValue",
  "startLabel",
  "startValue",
  "modifiedLabel",
  "modifiedValue",
  "descriptionLabel",
  "descriptionValue",
] as const;
type Selectors = (typeof dataCySelectors)[number];

class AlertDrawerPom extends CyPom<Selectors> {
  constructor(public rootCy: string = "alertDrawer") {
    super(rootCy, [...dataCySelectors]);
  }
}
export default AlertDrawerPom;
