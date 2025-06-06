/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { ApiErrorPom } from "@orch-ui/components";
import { clusterTemplateOneName } from "@orch-ui/utils";
import ClusterTemplatesDropdown from "./ClusterTemplatesDropdown";
import ClusterTemplatesDropdownPom from "./ClusterTemplatesDropdown.pom";

const pom = new ClusterTemplatesDropdownPom();
const apiErrorPom = new ApiErrorPom();
describe("<ClusterTemplatesDropdown/>", () => {
  it("should render select of regions", () => {
    pom.interceptApis([pom.api.getTemplatesSuccess]);
    cy.mount(<ClusterTemplatesDropdown />);
    pom.waitForApis();
    pom.dropdown.openDropdown(pom.root);
    pom.dropdown.selectDropdownValue(
      pom.root,
      "clusterTemplateDropdown",
      clusterTemplateOneName,
      clusterTemplateOneName,
    );
  });
  it("should handle 500 error", () => {
    pom.interceptApis([pom.api.getTemplatesError500]);
    cy.mount(<ClusterTemplatesDropdown />);
    pom.waitForApis();
    apiErrorPom.root.should("be.visible");
  });
  it("should handle 404 error", () => {
    pom.interceptApis([pom.api.getTemplates404]);
    cy.mount(<ClusterTemplatesDropdown />);
    pom.waitForApis();
    apiErrorPom.root.should("be.visible");
  });
  it("should handle empty response", () => {
    pom.interceptApis([pom.api.getTemplatesEmpty]);
    cy.mount(<ClusterTemplatesDropdown />);
    pom.waitForApis();
    pom.el.empty.should("be.visible");
  });
});
