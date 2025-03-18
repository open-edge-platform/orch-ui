/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";

const dataCySelectors = ["orchVersion"] as const;
type Selectors = (typeof dataCySelectors)[number];

class VersionPom extends CyPom<Selectors> {
  constructor(public rootCy: string = "version") {
    super(rootCy, [...dataCySelectors]);
  }
  get orchVersionError() {
    return this.root.find("[data-testid='message-banner']");
  }
}
export default VersionPom;
