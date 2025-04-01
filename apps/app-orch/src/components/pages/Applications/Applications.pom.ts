/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";
import ApplicationTabsPom from "../../organisms/applications/ApplicationTabs/ApplicationTabs.pom";

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
  constructor(public rootCy = "appPage") {
    super(rootCy, [...dataCySelectors]);
    this.tabs = new ApplicationTabsPom();
  }

  public search(searchText: string) {
    this.el.applicationSearch.within(() => {
      // we might be re-rendering the search input,
      // for now let's try the workaround in this issue
      // https://github.com/cypress-io/cypress/issues/5830
      cy.get("input").type(searchText, { force: true });
    });
  }
}

export default ApplicationsPom;
