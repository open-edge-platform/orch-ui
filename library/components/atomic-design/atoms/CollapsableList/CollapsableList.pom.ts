/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { CyPom } from "@orch-ui/tests";

const dataCySelectors = [
  "collapsibleItem",
  "foo",
  "bar",
  "bold",
  "indented",
  "noClick",
] as const;
type Selectors = (typeof dataCySelectors)[number];

export class CollapsableListPom extends CyPom<Selectors> {
  constructor(public rootCy: string = "collapsableList") {
    super(rootCy, [...dataCySelectors]);
  }
}
