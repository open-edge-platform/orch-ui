/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";

const dataCySelectors = ["code"] as const;
type Selectors = (typeof dataCySelectors)[number];

class CodeSamplePom extends CyPom<Selectors> {
  constructor(public rootCy: string = "codeSample") {
    super(rootCy, [...dataCySelectors]);
  }
}
export default CodeSamplePom;
