/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { CyPom } from "@orch-ui/tests";
import { dataCy } from "./Version";

const dataCySelectors = ["orchVersion"] as const;
type Selectors = (typeof dataCySelectors)[number];

class VersionPom extends CyPom<Selectors> {
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors]);
  }
  get orchVersionError() {
    return this.root.find("[data-testid='message-banner']");
  }
}
export default VersionPom;
