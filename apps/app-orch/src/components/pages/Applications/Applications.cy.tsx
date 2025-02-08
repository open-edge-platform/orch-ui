/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import Applications from "./Applications";
import ApplicationsPom from "./Applications.pom";

const pom = new ApplicationsPom("appPage");

describe("<Applications />", () => {
  it("reset page search to offset=0 with search term ", () => {
    pom.tabs.appTablePom.interceptApis([
      pom.tabs.appTablePom.api.appMultipleListPage1,
    ]);
    cy.mount(<Applications />);
    pom.waitForApis();

    pom.tabs.appTablePom.interceptApis([
      pom.tabs.appTablePom.api.appMultipleListPage2,
    ]);
    pom.tabs.appTablePom.table.getPageButton(2).click();
    pom.waitForApis();

    pom.tabs.appTablePom.interceptApis([
      pom.tabs.appTablePom.api.appMultipleWithFilter,
    ]);
    pom.el.search.type("test-search");
    pom.waitForApis();

    cy.get("#search").contains("offset=0");
  });
});
