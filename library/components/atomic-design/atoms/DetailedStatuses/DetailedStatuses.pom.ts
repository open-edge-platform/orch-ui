/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

class DetailedStatusesPom extends CyPom<Selectors> {
  constructor(public rootCy: string = "detailedStatuses") {
    super(rootCy, [...dataCySelectors]);
  }

  label(key: string) {
    return this.root.get(`[data-cy='label-${key}']`);
  }

  icon(key: string) {
    return this.root.get(`[data-cy='icon-${key}']`);
  }
}
export default DetailedStatusesPom;
