/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { ApiErrorPom } from "@orch-ui/components";
import { clusterTemplateOneV1Info } from "@orch-ui/utils";
import { ClusterTemplateVersionsDropdown } from "./ClusterTemplateVersionsDropdown";
import ClusterTemplateVersionsDropdownPom from "./ClusterTemplateVersionsDropdown.pom";

const pom = new ClusterTemplateVersionsDropdownPom();
const apiErrorPom = new ApiErrorPom();
describe("<ClusterTemplateVersionsDropdown/>", () => {
  it("should render select of templates", () => {
    pom.interceptApis([pom.api.getTemplatesSuccess]);
    cy.mount(<ClusterTemplateVersionsDropdown templateName="5G Template1" />);
    pom.waitForApi([pom.api.getTemplatesSuccess]);
    pom.dropdown.openDropdown(pom.root);
    pom.dropdown.selectDropdownValue(
      pom.root,
      "clusterTemplateVersionDropdown",
      clusterTemplateOneV1Info.version,
      clusterTemplateOneV1Info.version,
    );
  });
  it("should handle 500 error", () => {
    pom.interceptApis([pom.api.getTemplatesError500]);
    cy.mount(<ClusterTemplateVersionsDropdown templateName="5G Template1" />);
    pom.waitForApis();
    apiErrorPom.root.should("be.visible");
  });
  it("should handle 404 error", () => {
    pom.interceptApis([pom.api.getTemplates404]);
    cy.mount(<ClusterTemplateVersionsDropdown templateName="5G Template1" />);
    pom.waitForApis();
    apiErrorPom.root.should("be.visible");
  });
  it("should handle empty response", () => {
    pom.interceptApis([pom.api.getTemplatesEmpty]);
    cy.mount(<ClusterTemplateVersionsDropdown templateName="5G Template1" />);
    pom.waitForApis();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(200);
    pom.emptyPom.el.emptyTitle.should("exist");
  });
});
