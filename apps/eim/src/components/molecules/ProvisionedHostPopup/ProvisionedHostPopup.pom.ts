/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { CyPom } from "@orch-ui/tests";
import GenericHostPopupPom from "../../atom/GenericHostPopup/GenericHostPopup.pom";
import { dataCy } from "./ProvisionedHostPopup";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

class ProvisionedHostPopupPom extends CyPom<Selectors> {
  hostPopupPom: GenericHostPopupPom;
  constructor(public rootCy = dataCy) {
    super(rootCy, [...dataCySelectors]);
    this.hostPopupPom = new GenericHostPopupPom();
  }
}

export default ProvisionedHostPopupPom;
