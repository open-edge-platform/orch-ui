/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { catalog } from "@orch-ui/apis";
import { deploymentOne, packageOne } from "@orch-ui/utils";
import DeploymentApplicationsTable from "./DeploymentApplicationsTable";
import DeploymentApplicationsTablePom from "./DeploymentApplicationsTable.pom";

const pom = new DeploymentApplicationsTablePom();
describe("<DeploymentApplicationsTable/>", () => {
  const mockDeploymentPackage: catalog.DeploymentPackageRead = {
    ...packageOne,
    applicationReferences: [
      {
        name: "test1",
        version: "1.0.1",
      },
      {
        name: "test2",
        version: "1.1.1",
      },
    ],
    profiles: [
      {
        applicationProfiles: {
          test1: "test1-dp1",
          test2: "test2-dp1",
        },
        name: "dp1",
      },
      {
        applicationProfiles: {
          test1: "test1-dp2",
          test2: "test2-dp2",
        },
        name: "dp2",
      },
      {
        applicationProfiles: {
          test1: "test1-dp3",
          test2: "test2-dp3",
        },
        name: "dp3",
      },
      {
        applicationProfiles: {
          test1: "test1-dp4",
          test2: "test2-dp4",
        },
        name: "dp4",
      },
    ],
    defaultProfileName: "dp2",
  };

  beforeEach(() => {
    cy.mount(
      <DeploymentApplicationsTable
        deployment={deploymentOne}
        deploymentPackage={{
          ...packageOne,
        }}
      />,
    );
  });
  it("should render component", () => {
    pom.root.should("exist");
  });

  it("should show the selected deployment package profile with application profiles", () => {
    cy.mount(
      <DeploymentApplicationsTable
        deployment={{
          ...deploymentOne,
          overrideValues: undefined,
          profileName: "dp3",
        }}
        deploymentPackage={mockDeploymentPackage}
      />,
    );

    pom.table
      .getRowBySearchText("test1")
      .find("[data-cy='appProfile']")
      .should("have.text", "test1-dp3");
    pom.table
      .getRowBySearchText("test2")
      .find("[data-cy='appProfile']")
      .should("have.text", "test2-dp3");
  });

  it("should show the default deployment package profile with application profiles when profileName is not set", () => {
    cy.mount(
      <DeploymentApplicationsTable
        deployment={{
          ...deploymentOne,
          overrideValues: undefined,
          profileName: undefined,
        }}
        deploymentPackage={mockDeploymentPackage}
      />,
    );

    pom.table
      .getRowBySearchText("test1")
      .find("[data-cy='appProfile']")
      .should("have.text", "test1-dp2");
    pom.table
      .getRowBySearchText("test2")
      .find("[data-cy='appProfile']")
      .should("have.text", "test2-dp2");
  });

  describe("when value overrides are set", () => {
    beforeEach(() => {
      pom.interceptApis([
        pom.api.appDetailsNoOverrides,
        pom.api.appDetailsWithOverrides,
      ]);
      cy.mount(
        <DeploymentApplicationsTable
          deployment={deploymentOne}
          deploymentPackage={{
            ...packageOne,
          }}
        />,
      );
      pom.waitForApis();
    });
    it("should display value overrides", () => {
      pom.root.should("exist");
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(1000);
      pom.table.expandRow(0);
      pom.el.paramName.should("contain", "version");
      pom.el.paramValue.should("contain", "11");
      pom.el.paramName.should("contain", "image.containerDisk.pullSecret");
      pom.el.paramValue.should("contain", "value1");
      pom.el.paramName.should("contain", "a.b.c.d.e");
      pom.el.paramValue.should("contain", "value3");
    });

    // TODO: this test is failing on unknow reason when run in unit-test.cy.ts (may be window.store; need inspection)
    // Skipping for now as it is seen passing individually.
    xit("should display no overrides message", () => {
      pom.root.should("exist");
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(1000);
      pom.table.expandRow(1);
      pom.table.root.should("contain", "No override values available");
    });
  });

  describe("when no value overrides are set in the deployment", () => {
    it("should not show any row expand", () => {
      pom.appDetailPom.interceptApis([pom.appDetailPom.api.appDetails]);
      cy.mount(
        <DeploymentApplicationsTable
          deployment={{
            ...deploymentOne,
            overrideValues: undefined,
          }}
          deploymentPackage={{
            ...packageOne,
          }}
        />,
      );
      pom.waitForApis();

      // TODO: remove wait and replace old table in this component
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(1000);
      pom.table.root
        .find(".spark-icon.spark-icon-chevron-right")
        .should("not.exist");
    });
  });
});
