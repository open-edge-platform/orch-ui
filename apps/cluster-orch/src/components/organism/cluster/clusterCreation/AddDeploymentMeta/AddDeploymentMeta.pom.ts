/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { MetadataFormPom } from "@orch-ui/components";
import { CyPom } from "@orch-ui/tests";
import { dataCy } from "./AddDeploymentMeta";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

class AddDeploymentMetaPom extends CyPom<Selectors> {
  public metaformPom = new MetadataFormPom();

  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors]);
  }
}
export default AddDeploymentMetaPom;
