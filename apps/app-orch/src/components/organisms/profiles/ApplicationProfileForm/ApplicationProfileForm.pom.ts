/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog } from "@orch-ui/apis";
import { CyPom } from "@orch-ui/tests";
import { dataCy } from "./ApplicationProfileForm";

const dataCySelectors = [
  "nameInput",
  "descriptionInput",
  "chartValuesInput",
] as const;
type Selectors = (typeof dataCySelectors)[number];

class ProfilleFormPom extends CyPom<Selectors> {
  constructor(public rootCy = dataCy) {
    super(rootCy, [...dataCySelectors]);
  }

  public fillProfileForm(profile: Partial<catalog.Profile>): void {
    // TODO: This needs to be forced! Reason: the component Toast is seen on top of the input within the test window size.
    this.el.nameInput.type(profile.name!, { force: true });

    this.el.descriptionInput
      .first()
      .find("textarea")

      .type(profile.description ?? "");
    this.el.chartValuesInput
      .first()
      .find("textarea")
      .type(profile.chartValues ?? "");
  }
}

export default ProfilleFormPom;
