/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";

const dataCySelectors = ["metadataTag"] as const;
type Selectors = (typeof dataCySelectors)[number];

export class MetadataBadgePom extends CyPom<Selectors> {
  constructor(public rootCy: string = "metadataBadge") {
    super(rootCy, [...dataCySelectors]);
  }
}
