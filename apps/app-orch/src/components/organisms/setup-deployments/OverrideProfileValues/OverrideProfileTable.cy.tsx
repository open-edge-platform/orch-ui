/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { ApiErrorPom } from "@orch-ui/components";
import { cyGet } from "@orch-ui/tests";
import { packageWithParameterTemplates } from "@orch-ui/utils";
import OverrideProfileTable, {
  OverrideProfileTableProps,
} from "./OverrideProfileTable";
import { OverrideProfileTablePom } from "./OverrideProfileTable.pom";

describe("<OverrideProfileTable />", () => {
  const pom = new OverrideProfileTablePom();
  const apiErrorPom = new ApiErrorPom();
  const props: OverrideProfileTableProps = {
    selectedPackage: packageWithParameterTemplates,
    selectedProfile: packageWithParameterTemplates.profiles![0],
    overrideValues: {},
    onOverrideValuesUpdate: () => {},
  };

  it("should handle loading", () => {
    pom.interceptApis([pom.api.appSingleDelayed]);
    cy.mount(<OverrideProfileTable {...props} />);
    cy.get(".spark-shimmer").should("be.visible");
    pom.waitForApis();
    cy.get(".spark-shimmer").should("not.exist");
  });

  describe("when the API are responding correctly should", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.appSingle]);
      cy.mount(<OverrideProfileTable {...props} />);
      pom.waitForApis();
    });
    it("render a list of application", () => {
      pom.table
        .getRows()
        .should(
          "have.length",
          packageWithParameterTemplates.applicationReferences.length,
        );
      packageWithParameterTemplates.applicationReferences.forEach((c) => {
        cy.contains(c.name);
        cy.contains(c.version);
        pom.table
          .getCell(1, 4)
          .contains(
            packageWithParameterTemplates.profiles![0].applicationProfiles[
              c.name
            ],
          );
        pom.table.getCell(1, 5).contains("No");
      });
    });
  });

  describe("when the API are responding error should", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.appError500]);
    });
    it("return the error", () => {
      pom.interceptApis([pom.api.appError500]);
      cy.mount(<OverrideProfileTable {...props} />);
      pom.waitForApis();
      apiErrorPom.root.should("be.visible");
    });
  });

  describe("exapandable list should", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.appSingle]);
    });
    it("should open and close row", () => {
      cy.mount(<OverrideProfileTable {...props} />);
      pom.waitForApis();
      pom.table.getRows().should("have.length", 1);

      pom.table.expandRow(0);
      pom.el.parameterOverrideDeploymentForm.should("be.visible");

      cyGet("rowCollapser").eq(0).click();
      pom.el.parameterOverrideDeploymentForm.should("not.exist");
    });
  });
});
