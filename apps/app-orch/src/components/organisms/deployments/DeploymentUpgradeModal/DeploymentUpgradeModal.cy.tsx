/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { cyGet } from "@orch-ui/tests";
import { deployments } from "@orch-ui/utils";
import { useState } from "react";
import DeploymentUpgradeModal from "./DeploymentUpgradeModal";
import { DeploymentUpgradeModalPom } from "./DeploymentUpgradeModal.pom";

const pom = new DeploymentUpgradeModalPom();
describe("Deployments Upgrade modal", () => {
  describe("when selecting the latest version", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.multipleVersionList]);
      cy.mount(
        <DeploymentUpgradeModal
          isOpen
          setIsOpen={() => {}}
          deployment={deployments.deployments[0]}
        />,
      );
      pom.waitForApis();
      pom.el.selectDeploymentVersion.find("button").click();
      cy.get("[data-key='3.0.0']").click();
    });
    it("upgrade", () => {
      pom.interceptApis([pom.api.postUpgradeDeploymentsList]);
      pom.el.upgradeBtn.click();
      pom.waitForApis();
      /* API is called for version update... to upgrade deployment */
    });

    it("handle a 400 error", () => {
      pom.interceptApis([pom.api.postUpgradeDeploymentsList400Error]);
      pom.el.upgradeBtn.click();
      pom.waitForApis();
      pom.root.should("contain.text", "Upgrade Failed");
      pom.getDescription().should("contain.text", "400 error");
    });

    it("handle a 500 error", () => {
      pom.interceptApis([pom.api.postUpgradeDeploymentsList500Error]);
      pom.el.upgradeBtn.click();
      pom.waitForApis();
      pom.root.should("contain.text", "Upgrade Failed");
      pom.getDescription().should("contain.text", "500 error");
    });
  });
  describe("when wrapped in a component", () => {
    const TestingComponent = ({
      isModalOpen = true,
    }: {
      isModalOpen: boolean;
    }) => {
      // FIXME use `cy.spy` for `setIsOpen` so that we can test the value that is passed
      const [isOpen, setIsOpen] = useState<boolean>(isModalOpen);
      return isOpen ? (
        <DeploymentUpgradeModal
          isOpen
          setIsOpen={(isOpen) => {
            setIsOpen(isOpen);
          }}
          deployment={deployments.deployments[0]}
        />
      ) : (
        <div data-cy="isClosed">Modal is closed</div>
      );
    };
    beforeEach(() => {
      pom.interceptApis([pom.api.multipleVersionList]);
      cy.mount(<TestingComponent isModalOpen={true} />);
      pom.waitForApis();
    });
    it("should invoke the callback on cancel", () => {
      pom.el.selectDeploymentVersion.find("button").click();
      cy.get("[data-key='3.0.0']").click();
      pom.el.cancelBtn.click();
      cyGet("isClosed").should("contain.text", "Modal is closed");
    });
    it("should disable the upgrade button if no version is selected", () => {
      pom.el.upgradeBtn.should("have.class", "spark-button-disabled");
    });
    it("should upgrade a deployment and invoke the callback", () => {
      pom.el.selectDeploymentVersion.find("button").click();
      cy.get("[data-key='3.0.0']").click();

      pom.el.upgradeBtn.should("not.have.class", "spark-button-disabled");

      pom.interceptApis([pom.api.postUpgradeDeploymentsList]);
      pom.el.upgradeBtn.click();
      pom.waitForApis();
      cyGet("isClosed").should("contain.text", "Modal is closed");
    });
  });
});
