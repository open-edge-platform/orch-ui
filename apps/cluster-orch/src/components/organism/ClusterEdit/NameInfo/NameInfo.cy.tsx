/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { clusterOneName } from "@orch-ui/utils";
import NameInfo from "./NameInfo";
import NameInfoPom from "./NameInfo.pom";

const pom = new NameInfoPom();
describe("<NameInfo/> should", () => {
  beforeEach(() => {
    pom.clusterTemplateDropdownPom.interceptApis([
      pom.clusterTemplateDropdownPom.api.getTemplatesSuccess,
    ]);
    cy.mount(
      <NameInfo
        clusterName={clusterOneName}
        templateName="5G Template1"
        templateVersion="v1.0.1"
      />,
    );
  });

  it("render component", () => {
    pom.root.should("exist");

    pom.el.name
      .invoke("attr", "placeholder")
      .should("eq", "restaurant-portland");

    pom.clusterTemplateVersionDropdown
      .getDropdown("clusterTemplateDropdown")
      .should("have.text", "5G Template1");

    pom.clusterTemplateVersionDropdown
      .getDropdown("clusterTemplateVersionDropdown")
      .should("have.text", "v1.0.1");
  });

  it("select version from dropdown", () => {
    pom.root.should("exist");

    pom.clusterTemplateVersionDropdown.selectDropdownValue(
      pom.clusterTemplateVersionDropdown.root,
      "clusterTemplateVersionDropdown",
      "v1.0.1",
      "v1.0.1",
    );
  });
});
