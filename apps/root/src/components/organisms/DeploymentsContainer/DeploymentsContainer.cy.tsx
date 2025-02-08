/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { MetadataPair } from "@orch-ui/components";
import DeploymentsContainer from "./DeploymentsContainer";
import { DeploymentsContainerPom } from "./DeploymentsContainer.pom";

describe("<DeploymentsContainer />", () => {
  const pom: DeploymentsContainerPom = new DeploymentsContainerPom();

  describe("when the API returns an empty list", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.getDeployments404]);
      cy.mount(<DeploymentsContainer filters={[]} />);
      pom.waitForApis();
    });

    it("should render a not-present message", () => {
      pom.empty.el.emptyTitle.should(
        "have.text",
        "No deployments are present in the system",
      );
    });

    it("should show a button to get to the deployment page", () => {
      pom.empty.el.emptyActionBtn.click();
      pom
        .getPath()
        .should("equal", "/applications/deployments/setup-deployment");
    });
  });

  describe("when the API returns a list of deployment", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.getDeployments]);
      cy.mount(<DeploymentsContainer filters={[]} />);
      pom.waitForApis();
    });

    it("should render the appropriate number of DeploymentAggregatedStatus components", () => {
      pom.deploymentDetailsTablePom.table.getRows().should("have.length", 7);
    });
  });

  describe("when the filters are set", () => {
    const metadata: MetadataPair[] = [{ key: "customer", value: "menards" }];
    beforeEach(() => {
      pom.interceptApis([pom.api.getDeploymentsWithFilter]);
      cy.mount(<DeploymentsContainer filters={metadata} />);
    });

    it("should add the correct parameters to the URL", () => {
      cy.wait(`@${pom.api.getDeploymentsWithFilter}`).then(({ request }) => {
        expect(request.query).to.deep.contain({ labels: "customer=menards" });
      });
    });
  });
});
