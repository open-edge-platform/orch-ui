/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { SiTablePom } from "@orch-ui/poms";
import { CyPom } from "@orch-ui/tests";

const dataCySelectors = ["gpuTable"] as const;
type Selectors = (typeof dataCySelectors)[number];

class GpuPom extends CyPom<Selectors> {
  public table: SiTablePom;
  constructor(public rootCy: string = "gpu") {
    super(rootCy, [...dataCySelectors]);
    this.table = new SiTablePom("gpuTable");
  }
}
export default GpuPom;
