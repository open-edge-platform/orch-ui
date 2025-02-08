/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { packageOne } from "@orch-ui/utils";
import DeploymentPackageDetails from "./DeploymentPackageDetails";
import DeploymentPackageDetailsPom from "./DeploymentPackageDetails.pom";

const pom = new DeploymentPackageDetailsPom();
describe("<DeploymentPackageDetails />", () => {
  const mountCfg = {
    routerProps: {
      initialEntries: [
        `/package/${packageOne.name}/version/${packageOne.version}`,
      ],
    },
    routerRule: [
      {
        path: "/package/:appName/version/:version",
        element: <DeploymentPackageDetails />,
      },
    ],
  };
  describe("when the Deployment Package can't be found", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.getDeploymentPackageError]);
      cy.mount(<div />, mountCfg);
      pom.waitForApis();
    });
    it("should render", () => {
      pom.root.should("exist");
      pom.empty.el.emptyTitle.should(
        "have.text",
        "Failed at fetching application details",
      );
    });
  });
  describe("when the Deployment Package is loaded", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.getDeploymentPackage]);
      cy.mount(<div />, mountCfg);
      pom.waitForApis();
    });
    it("should render", () => {
      pom.root.should("exist");
      pom.empty.el.emptyTitle.should("not.exist");
      pom.dpDetailsHeaderPom.root.should("exist");
      pom.dpDetailsMainPom.root.should("exist");
      pom.dpDetailsProfileListPom.root.should("exist");
    });
    it("should go back to Deployment Package table page", () => {
      pom.el.backButton.click();
      pom.getPath().should("eq", "/applications/packages");
    });
  });
});
