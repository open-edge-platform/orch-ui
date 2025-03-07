/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { ApiErrorPom, EmptyPom } from "@orch-ui/components";
import ClusterTemplatesList from "./ClusterTemplatesList";
import ClusterTemplatesListPom from "./ClusterTemplatesList.pom";

const pom = new ClusterTemplatesListPom();
const emptyPom = new EmptyPom();
const apiErrorPom = new ApiErrorPom();

describe("<ClusterTemplatesList/>", () => {
  describe("no data", () => {
    it("should handle empty templates list", () => {
      const getPopupOptionsSpy = cy.spy().as("getPopupOptions");
      const onDeleteSpy = cy.spy().as("onDelete");

      pom.interceptApis([pom.api.getAllTemplatesEmpty]);

      cy.mount(
        <ClusterTemplatesList
          getPopupOptions={getPopupOptionsSpy}
          onDelete={onDeleteSpy}
        />,
      );
      pom.waitForApis();
      emptyPom.root.should("be.visible");
    });
  });

  describe("with data", () => {
    let getPopupOptionsSpy;
    let onDeleteSpy;

    beforeEach(() => {
      getPopupOptionsSpy = cy.spy().as("getPopupOptions");
      onDeleteSpy = cy.spy().as("onDelete");

      pom.interceptApis([pom.api.getAllTemplates]);

      cy.mount(
        <ClusterTemplatesList
          getPopupOptions={getPopupOptionsSpy}
          onDelete={onDeleteSpy}
        />,
      );
      pom.waitForApis();
    });

    it("should render templates table", () => {
      pom.tablePom.getRows().should("have.length", 3);
    });

    it("should show the popup menu", () => {
      pom.tablePom.getRow(0).find('[data-cy="popup"]').should("be.visible");
    });

    it("should upload templates correctly", () => {
      pom.el.uploadInput.selectFile("cypress/fixtures/template-valid.json", {
        force: true,
      });
    });
  });

  it("api error", () => {
    const getPopupOptionsSpy = cy.spy().as("getPopupOptions");
    const onDeleteSpy = cy.spy().as("onDelete");

    pom.interceptApis([pom.api.getAllTemplatesError]);

    cy.mount(
      <ClusterTemplatesList
        getPopupOptions={getPopupOptionsSpy}
        onDelete={onDeleteSpy}
      />,
    );
    pom.waitForApis();

    apiErrorPom.root.should("be.visible");
  });
});
