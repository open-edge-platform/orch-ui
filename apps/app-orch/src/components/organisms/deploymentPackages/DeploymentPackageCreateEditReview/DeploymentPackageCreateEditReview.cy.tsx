/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { packageOne } from "@orch-ui/utils";
import { setupStore } from "../../../../store";
import DeploymentPackageCreateEditReview from "./DeploymentPackageCreateEditReview";
import DeploymentPackageCreateEditReviewPom from "./DeploymentPackageCreateEditReview.pom";

const pom = new DeploymentPackageCreateEditReviewPom();
describe("<DeploymentPackageCreateEditReview />", () => {
  describe("review deployment package details upon create or edit", () => {
    beforeEach(() => {
      cy.mount(<DeploymentPackageCreateEditReview />, {
        reduxStore: setupStore({
          deploymentPackage: packageOne,
        }),
      });
    });
    it("should render the component", () => {
      pom.root.should("exist");
    });
    it("should render the review general information", () => {
      pom.el.description.contains(
        packageOne.description || "No Description is provided",
      );
      pom.el.version.contains(packageOne.version);
      pom.el.name.contains(packageOne.displayName ?? "");
    });
    it("should render the review when no description is provided", () => {
      cy.mount(<DeploymentPackageCreateEditReview />, {
        reduxStore: setupStore({
          deploymentPackage: { ...packageOne, description: "" },
        }),
      });
      pom.el.description.contains("No Description is provided");
    });
  });

  describe("review deployment package profile upon create or edit", () => {
    it("should show advanced setting when profiles are present", () => {
      cy.mount(<DeploymentPackageCreateEditReview />, {
        reduxStore: setupStore({
          deploymentPackage: packageOne,
        }),
      });
      pom.profileListPom.root.should("exist");
    });
    it("should show the message in advanced setting when no profiles are not presented", () => {
      cy.mount(<DeploymentPackageCreateEditReview />, {
        reduxStore: setupStore({
          deploymentPackage: {
            ...packageOne,
            profiles: undefined,
          },
        }),
      });
      pom.el.advancedSettingsSection.contains("No advanced settings selected.");
    });
    it("should show the message in advanced setting when no profiles are empty", () => {
      cy.mount(<DeploymentPackageCreateEditReview />, {
        reduxStore: setupStore({
          deploymentPackage: {
            ...packageOne,
            profiles: [],
          },
        }),
      });
      pom.el.advancedSettingsSection.contains("No advanced settings selected.");
    });
  });
});
