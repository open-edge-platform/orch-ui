/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";

const dataCySelectors = [
  "nameValue",
  "descriptionValue",
  "defaultValue",
] as const;
type Selectors = (typeof dataCySelectors)[number];

class ProfilePackageDetailsPom extends CyPom<Selectors> {
  constructor(public rootCy: string = "profilePackageDetails") {
    super(rootCy, [...dataCySelectors]);
  }
}
export default ProfilePackageDetailsPom;
