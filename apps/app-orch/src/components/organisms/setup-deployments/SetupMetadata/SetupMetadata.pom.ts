/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { MetadataFormPom } from "@orch-ui/components";
import { CyPom } from "@orch-ui/tests";

const dataCySelectors = [
  "name",
  "version",
  "description",
  "deploymentNameField",
  "metadataForm",
  "deploymentProfileField",
] as const;
type Selectors = (typeof dataCySelectors)[number];

class SetupMetadataPom extends CyPom<Selectors> {
  metadataFormPom: MetadataFormPom;

  constructor(public rootCy: string = "setupMetadata") {
    super(rootCy, [...dataCySelectors]);
    this.metadataFormPom = new MetadataFormPom();
  }

  get deploymentNameTextField() {
    return this.el.deploymentNameField.parentsUntil(
      ".spark-text-field-container",
    );
  }
  get deploymentNameTextFieldInvalidIndicator() {
    return this.deploymentNameTextField.find(
      ".spark-fieldtext-wrapper-is-invalid",
    );
  }
}

export default SetupMetadataPom;
