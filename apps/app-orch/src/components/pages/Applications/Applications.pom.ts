/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";
import ApplicationTabsPom from "../../organisms/applications/ApplicationTabs/ApplicationTabs.pom";
import { dataCy } from "./Applications";

const dataCySelectors = [
  "introTitle",
  "introContent",
  "applicationSearch",
  "searchTooltip",
  "search",
  "addApplicationButton",
  "addRegistryButton",
  "empty",
] as const;
type Selectors = (typeof dataCySelectors)[number];

class ApplicationsPom extends CyPom<Selectors> {
  public tabs: ApplicationTabsPom;
  constructor(public rootCy = dataCy) {
    super(rootCy, [...dataCySelectors]);
    this.tabs = new ApplicationTabsPom();
  }
}

export default ApplicationsPom;
