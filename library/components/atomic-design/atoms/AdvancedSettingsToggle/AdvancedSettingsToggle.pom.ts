/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { CyPom } from "@orch-ui/tests";
import { dataCy } from "./AdvancedSettingsToggle";

const dataCySelectors = ["advSettingsTrue", "advSettingsFalse"] as const;
type Selectors = (typeof dataCySelectors)[number];

export class AdvancedSettingsTogglePom extends CyPom<Selectors> {
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors]);
  }
}
