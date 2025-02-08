/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { CyPom } from "@orch-ui/tests";

const dataCySelectors = ["title", "value"] as const;
type Selectors = (typeof dataCySelectors)[number];

class ResourceIndicatorPom extends CyPom<Selectors> {
  constructor(public rootCy: string = "resourceIndicator") {
    super(rootCy, [...dataCySelectors]);
  }
}

export default ResourceIndicatorPom;
