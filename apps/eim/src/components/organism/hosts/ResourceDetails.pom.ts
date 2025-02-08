/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { SiTablePom } from "@orch-ui/poms";
import { CyPom } from "@orch-ui/tests";

const dataCySelectors = [
  "cpu",
  "memory",
  "storage",
  "gpu",
  "interface",
  "qat",
] as const;
type Selectors = (typeof dataCySelectors)[number];

class ResourceDetailsPom extends CyPom<Selectors> {
  public table: SiTablePom;
  constructor(
    public rootCy: string = "resourceDetails",
    public tableCy?: string,
  ) {
    super(rootCy, [...dataCySelectors]);
    this.table = new SiTablePom(tableCy);
  }
}

export default ResourceDetailsPom;
