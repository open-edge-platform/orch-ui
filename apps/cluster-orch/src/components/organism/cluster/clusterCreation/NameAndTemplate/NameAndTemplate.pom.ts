/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { SiDropdown } from "@orch-ui/poms";
import { CyPom } from "@orch-ui/tests";

const dataCySelectors = ["clusterName"] as const;
type Selectors = (typeof dataCySelectors)[number];

class NameAndTemplatePom extends CyPom<Selectors> {
  public clusterTemplateDropdown = new SiDropdown("clusterTemplateDropdown");
  public clusterTemplateVersionDropdown = new SiDropdown(
    "clusterTemplateVersionDropdown",
  );

  constructor(public rootCy: string = "NameAndTemplate") {
    super(rootCy, [...dataCySelectors]);
  }
}
export default NameAndTemplatePom;
