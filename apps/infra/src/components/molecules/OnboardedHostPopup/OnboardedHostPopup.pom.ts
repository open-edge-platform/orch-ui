/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";
import GenericHostPopupPom from "../../atom/GenericHostPopup/GenericHostPopup.pom";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

class OnboardedHostPopupPom extends CyPom<Selectors> {
  hostPopupPom: GenericHostPopupPom;
  constructor(public rootCy = "onboardedHostPopup") {
    super(rootCy, [...dataCySelectors]);
    this.hostPopupPom = new GenericHostPopupPom();
  }
}

export default OnboardedHostPopupPom;
