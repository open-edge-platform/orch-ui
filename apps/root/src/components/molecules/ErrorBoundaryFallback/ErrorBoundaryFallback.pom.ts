/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";

const dataCySelectors = ["reloadBtn", "copyBtn"] as const;
type Selectors = (typeof dataCySelectors)[number];

class ErrorBoundaryFallbackPom extends CyPom<Selectors> {
  public SAMPLE_ERROR_MESSAGE = "sample error message";
  public SAMPLE_STACKTRACE = "sample stacktrace";

  constructor(public rootCy: string = "errorBoundaryFallback") {
    super(rootCy, [...dataCySelectors]);
  }
}
export default ErrorBoundaryFallbackPom;
