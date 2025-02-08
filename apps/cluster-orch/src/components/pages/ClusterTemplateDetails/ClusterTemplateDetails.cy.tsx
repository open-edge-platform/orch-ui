/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { ApiErrorPom } from "@orch-ui/components";
import { clusterTemplateOneV1 } from "@orch-ui/utils";
import { ClusterTemplateDetails } from "./ClusterTemplateDetails";
import ClusterTemplateDetailsPom from "./ClusterTemplateDetails.pom";

const pom = new ClusterTemplateDetailsPom();
const apiErrorPom = new ApiErrorPom();

describe("<ClusterTemplateDetails/>", () => {
  it("should handle loading template details", () => {
    pom.interceptApis([pom.api.getTemplate]);
    cy.mount(<ClusterTemplateDetails />);
    pom.waitForApis();
    pom.root.should("exist");
    pom.el.templateName.should("have.text", clusterTemplateOneV1.name);
    pom.el.templateVersion.should("have.text", clusterTemplateOneV1.version);
    pom.el.templateDescription.should(
      "have.text",
      clusterTemplateOneV1.description,
    );
  });

  it("should handle api response error", () => {
    pom.interceptApis([pom.api.getTemplateError]);
    cy.mount(<ClusterTemplateDetails />);
    pom.waitForApis();
    apiErrorPom.root.should("be.visible");
  });

  it("should handle template action: export", () => {
    pom.interceptApis([pom.api.getTemplate]);
    cy.mount(<ClusterTemplateDetails />);
    pom.waitForApis();
    pom.el.clusterTemplateViewPopup.click();
    pom.el.clusterTemplateViewPopup.within(() => {
      cy.contains("Export Template").click();
    });
    cy.readFile("cypress/downloads/5G Template1-v1.0.1-template.json").then(
      (jsonObj) => {
        expect(jsonObj.name).to.eq(clusterTemplateOneV1.name);
        expect(jsonObj.version).to.eq(clusterTemplateOneV1.version);
      },
    );
  });
});
