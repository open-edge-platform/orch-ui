/*
 * SPDX-FileCopyrightText: (C) 2024 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { ProjectsPom } from "@orch-ui/admin-poms";
import { CyPom } from "@orch-ui/tests";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

class AdminPom extends CyPom<Selectors> {
  public projectsPom: ProjectsPom;
  constructor(public rootCy: string) {
    super(rootCy, [...dataCySelectors]);
    this.projectsPom = new ProjectsPom();
  }
}

export default AdminPom;
