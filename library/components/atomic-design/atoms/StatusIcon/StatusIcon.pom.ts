/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";
import { dataCy } from "./StatusIcon";

const dataCySelectors = ["sparkIcon"] as const;
type Selectors = (typeof dataCySelectors)[number];

export class StatusIconPom extends CyPom<Selectors> {
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors]);
  }

  get icon() {
    return (
      this.root
        .get(".icon")
        // prevent previous line assertion from triggering
        .should(() => {})
        .then(($el) => {
          if (($el || []).length === 0) {
            return this.root.find(".spark-icon");
          } else {
            return this.root.find(".icon");
          }
        })
    );
  }
}
