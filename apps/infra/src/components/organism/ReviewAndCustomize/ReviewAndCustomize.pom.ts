/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

class ReviewAndCustomizePom extends CyPom<Selectors> {
  constructor(public rootCy: string = "reviewAndCustomize") {
    super(rootCy, [...dataCySelectors]);
  }
}
export default ReviewAndCustomizePom;
