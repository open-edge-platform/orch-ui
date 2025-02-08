/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { clusterTemplateOneV1 } from "@orch-ui/utils";
import ClusterTemplatesListPom from "../../organism/ClusterTemplatesList/ClusterTemplatesList.pom";
import { ClusterTemplates } from "./ClusterTemplates";
import ClusterTemplatesPom from "./ClusterTemplates.pom";

const pom = new ClusterTemplatesPom();
const list = new ClusterTemplatesListPom();

describe("<ClusterTemplates/>", () => {
  beforeEach(() => {
    list.interceptApis([list.api.getAllTemplates]);
    cy.mount(<ClusterTemplates />);
    list.waitForApis();
  });

  it("should process action: view", () => {
    list.selectPopupOption(clusterTemplateOneV1.name, "View Details");
    list.tablePom.root.should("not.exist");
  });

  it("should process action: setDefault", () => {
    list.interceptApis([list.api.setAsDefault]);
    list.selectPopupOption(clusterTemplateOneV1.name, "Set as Default");
    list.waitForApis();
  });

  it("should process action: export template", () => {
    list.selectPopupOption(clusterTemplateOneV1.name, "Export Template");
    cy.readFile("cypress/downloads/5G Template1-v1.0.1-template.json").then(
      (jsonObj) => {
        expect(jsonObj.name).to.eq(clusterTemplateOneV1.name);
        expect(jsonObj.version).to.eq(clusterTemplateOneV1.version);
      },
    );
  });

  it("should process action: delete", () => {
    list.interceptApis([list.api.deleteTemplate]);
    list.selectPopupOption(clusterTemplateOneV1.name, "Delete");
    cy.get(".spark-modal-footer").contains("Delete").click();
    list.waitForApis();
  });

  it("should handle upload file", () => {
    list.interceptApis([list.api.postTemplate]);
    pom.el.uploadInput.selectFile("cypress/fixtures/template-valid.json", {
      force: true,
    });
    list.waitForApis();
  });

  it("should handle wrong uploaded file", () => {
    pom.el.uploadInput.selectFile("cypress/fixtures/template-invalid.json", {
      force: true,
    });
  });
});
