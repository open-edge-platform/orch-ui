/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";

const dataCySelectors = ["next"] as const;
type Selectors = (typeof dataCySelectors)[number];

class HostProvisionPom extends CyPom<Selectors> {
  constructor(public rootCy: string = "hostProvision") {
    super(rootCy, [...dataCySelectors]);
  }
}
export default HostProvisionPom;
