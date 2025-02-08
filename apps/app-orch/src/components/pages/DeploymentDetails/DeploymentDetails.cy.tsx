/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { ConfirmationDialogPom } from "@orch-ui/components";
import { cyGet } from "@orch-ui/tests";
import { deploymentMinimal, packageOne } from "@orch-ui/utils";
import DeploymentDetails from "./DeploymentDetails";
import DeploymentDetailsPom from "./DeploymentDetails.pom";

const pom = new DeploymentDetailsPom();
const deleteDialogPom = new ConfirmationDialogPom("dialog");
describe("<DeploymentDetails>", () => {
  const mountCfg = {
    routerProps: {
      initialEntries: [
        `/applications/deployment/${deploymentMinimal.deployId}`,
      ],
    },
    routerRule: [
      {
        path: "/applications/deployment/:id",
        element: <DeploymentDetails />,
      },
      {
        path: "/applications/deployments",
        element: <>Deployments page</>,
      },
    ],
  };
  beforeEach(() => {
    pom.interceptApis([pom.api.minimalDeploymentDetailsResponse]);
    pom.tablePom.interceptApis([pom.tablePom.api.getClustersEmpty]);
    cy.mount(<DeploymentDetails />, mountCfg);
    pom.waitForApis();
    pom.tablePom.waitForApis();
  });

  describe("deployment details and metadata", () => {
    it("should render", () => {
      pom.root.should("be.visible");
    });

    it("should show deployment details", () => {
      pom.el.deploymentDetailsHeader.should(
        "contain.text",
        deploymentMinimal.displayName,
      );
      pom.detailsStatusPom.el.pkgName.should(
        "have.text",
        packageOne.displayName ?? deploymentMinimal.appName,
      );
      pom.detailsStatusPom.el.emptyMetadata.should(
        "have.text",
        "Metadata are not defined",
      );
      pom.detailsStatusPom.el.deploymentStatus.should(
        "have.text",
        "Not yet deployed",
      );

      pom.tablePom.root.should(
        "contain.text",
        "There are no Clusters available within this deployment.",
      );
    });

    it("should click on view details to show drawer for deployment package details", () => {
      pom.detailsStatusPom.el.viewDetailsButton.click();
      pom.drawerContentPom.root.should("exist");
      pom.getDrawerCloseButton().click();
      pom.drawerContentPom.root.should("not.exist");
    });

    it("should go back to deployment page", () => {
      pom.getBackButton().click();
      pom.getPath().should("eq", "/applications/deployments");
    });
  });

  describe("should work clusters in deployment", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.minimalDeploymentDetailsResponse]);
      pom.tablePom.interceptApis([pom.tablePom.api.getClustersListPage1Size18]);
      cy.mount(<DeploymentDetails />, mountCfg);
      pom.waitForApis();
      pom.tablePom.waitForApis();
    });
    it("should renders cluster table", () => {
      pom.tablePom.table.root.should("exist");
    });
    it("should click on cluster id link for cluster details", () => {
      pom.tablePom.table
        .getCellBySearchText("cluster-3")
        .contains("cluster-3")
        .click();
      pom
        .getPath()
        .should(
          "eq",
          "/applications/deployment/deployment-minimal/cluster/cluster-3/",
        );
    });
  });

  describe("api Error", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.deploymentDetails500]);
      cy.mount(<DeploymentDetails />, mountCfg);
      pom.waitForApis();
    });
    it("should render error message", () => {
      cyGet("error").should("be.visible");
    });
  });

  describe("should work on deployment action popup", () => {
    it("should show delete modal", () => {
      cy.on("uncaught:exception", (err) => {
        expect(err.message).to.include("of null (reading 'contains')");
        return false;
      });

      pom.el.deploymentDetailsHeaderPopup.click().as("popupMenu");
      pom.el.deploymentDetailsHeaderPopup.contains("Delete");

      pom.el.deploymentDetailsHeaderPopup.contains("Delete").click();
      pom.waitForApis();
      deleteDialogPom.root.should("exist");
      pom.interceptApis([pom.api.deleteDeployment]);
      deleteDialogPom.el.confirmBtn.click({ force: true });
      pom.waitForApis();
      cy.get(`@${pom.api.deleteDeployment}`)
        .its("request.url")
        .then((path: string) => {
          const match = path.match(deploymentMinimal.deployId!);
          expect(match && match.length > 0).to.be.eq(true);
        });
      cy.get("#pathname").contains("/applications/deployments");
    });

    // TODO: this test seems to fail on the modal (Error: contains() not found)
    xit("should show upgrade modal", () => {
      // TODO: ignore modal bug throwing runtime error specific to modal!
      cy.on("uncaught:exception", (err) => {
        expect(err.message).to.include("of null (reading 'contains')");
        return false;
      });

      pom.el.deploymentDetailsHeaderPopup.click().as("popupMenu");
      pom.upgradeModalPom.interceptApis([
        pom.upgradeModalPom.api.emptyVersionList,
      ]);
      pom.el.deploymentDetailsHeaderPopup.contains("Upgrade").click();
      pom.waitForApis();
      pom.upgradeModalPom.root.should("exist");
    });
  });
});
