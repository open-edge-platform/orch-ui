/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog } from "@orch-ui/apis";
import { CyPom } from "@orch-ui/tests";

const dataCySelectors = [
  "nameInput",
  "versionInput",
  "descriptionInput",
] as const;
type Selectors = (typeof dataCySelectors)[number];

class ApplicationFormPom extends CyPom<Selectors> {
  constructor(public rootCy: string) {
    super(rootCy, [...dataCySelectors]);
  }

  fillApplicationBasicInfo(application: Partial<catalog.Application>) {
    this.el.nameInput.type(application.name!);
    this.el.versionInput.type(application.version!);
  }
}

export default ApplicationFormPom;
