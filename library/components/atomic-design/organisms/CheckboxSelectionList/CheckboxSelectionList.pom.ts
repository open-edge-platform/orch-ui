/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";
import { dataCy } from "./CheckboxSelectionList";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

export class CheckboxSelectionListPom extends CyPom<Selectors> {
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors]);
  }
  getLabel(id: string) {
    return this.root.find(`[data-cy='label${id}']`);
  }
  getCheckbox(id: string) {
    return this.getLabel(id).find(".spark-checkbox .spark-fieldlabel").first();
  }
}
