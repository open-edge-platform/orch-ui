/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { CyPom } from "@orch-ui/tests";
import { dataCy } from "./ErrorBoundaryFallback";

const dataCySelectors = ["reloadBtn", "copyBtn"] as const;
type Selectors = (typeof dataCySelectors)[number];

class ErrorBoundaryFallbackPom extends CyPom<Selectors> {
  public SAMPLE_ERROR_MESSAGE = "sample error message";
  public SAMPLE_STACKTRACE = "sample stacktrace";

  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors]);
  }
}
export default ErrorBoundaryFallbackPom;
