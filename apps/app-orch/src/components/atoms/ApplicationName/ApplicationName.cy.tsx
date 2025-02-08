/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { catalog } from "@orch-ui/apis";
import { applicationOne } from "@orch-ui/utils";
import ApplicationName from "./ApplicationName";
import ApplicationNamePom from "./ApplicationName.pom";

const pom = new ApplicationNamePom();

describe("<ApplicationName/>", () => {
  const appRef: catalog.ApplicationReference = {
    name: "app-name",
    version: "0.0.0",
  };

  it("should render the name", () => {
    pom.interceptApis([pom.api.application]);
    cy.mount(<ApplicationName applicationReference={appRef} />);
    pom.waitForApis();
    pom.root.should("contain.text", applicationOne.displayName);
  });

  it("should render an error message", () => {
    pom.interceptApis([pom.api.applicationError]);
    cy.mount(<ApplicationName applicationReference={appRef} />);
    pom.waitForApis();
    pom.root.should(
      "contain.text",
      `Could Not load Application for ${appRef.name}`,
    );
  });
});
