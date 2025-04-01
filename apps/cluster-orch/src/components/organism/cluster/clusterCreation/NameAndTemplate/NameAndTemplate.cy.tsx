/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  clusterTemplateOneName,
  clusterTemplateOneV1Info,
} from "@orch-ui/utils";
import ClusterTemplatesDropdownPom from "../../../../atom/ClusterTemplatesDropdown/ClusterTemplatesDropdown.pom";
import NameAndTemplate from "./NameAndTemplate";
import NameAndTemplatePom from "./NameAndTemplate.pom";

const pom = new NameAndTemplatePom();
const clusterTemplateDropdownPom = new ClusterTemplatesDropdownPom();
describe("<NameAndTemplate/>", () => {
  beforeEach(() => {
    clusterTemplateDropdownPom.interceptApis([
      clusterTemplateDropdownPom.api.getTemplatesSuccess,
    ]);

    cy.mount(<NameAndTemplate />);
  });

  it("should render component", () => {
    pom.waitForApis();
    pom.el.clusterName.type("Cluster1");

    pom.clusterTemplateDropdown.selectDropdownValue(
      pom.clusterTemplateDropdown.root,
      "clusterTemplateDropdown",
      clusterTemplateOneName,
      clusterTemplateOneName,
    );
    pom.clusterTemplateVersionDropdown.selectDropdownValue(
      pom.clusterTemplateVersionDropdown.root,
      "clusterTemplateVersionDropdown",
      clusterTemplateOneV1Info.version,
      clusterTemplateOneV1Info.version,
    );
  });

  it("should validate Cluster Name", () => {
    // Invalid cluster name
    pom.el.clusterName.type("test-");

    pom.el.clusterName.should("have.attr", "aria-invalid", "true");

    // Valid cluster name
    pom.el.clusterName.clear().type("test-cluster");

    pom.el.clusterName.should("not.have.attr", "aria-invalid");
  });
});
