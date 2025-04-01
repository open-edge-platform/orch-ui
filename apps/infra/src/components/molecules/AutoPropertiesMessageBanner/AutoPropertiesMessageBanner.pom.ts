/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

class AutoPropertiesMessageBannerPom extends CyPom<Selectors> {
  constructor(public rootCy: string = "autoPropertiesMessageBanner") {
    super(rootCy, [...dataCySelectors]);
  }
}
export default AutoPropertiesMessageBannerPom;
