/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { CyPom } from "@orch-ui/tests";
import GenericHostPopupPom from "../../atom/GenericHostPopup/GenericHostPopup.pom";
import { dataCy } from "./RegisteredHostPopup";

const dataCySelectors = ["hostRegisterErrorDrawer", "footerOkButton"] as const;
type Selectors = (typeof dataCySelectors)[number];

class RegisteredHostPopupPom extends CyPom<Selectors> {
  hostPopupPom: GenericHostPopupPom;
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors]);
    this.hostPopupPom = new GenericHostPopupPom();
  }
}

export default RegisteredHostPopupPom;
