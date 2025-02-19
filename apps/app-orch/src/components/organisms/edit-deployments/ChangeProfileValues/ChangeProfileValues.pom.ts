/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { CyPom } from "@maestro-ui/tests";
import { dataCy } from "./ChangeProfileValues";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

class ChangeProfileValuesPom extends CyPom<Selectors> {
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors]);
  }
}
export default ChangeProfileValuesPom;
