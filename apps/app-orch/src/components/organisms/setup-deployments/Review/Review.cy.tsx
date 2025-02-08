/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import {
  clusterOne,
  clusterThree,
  compositeApplicationDefault,
  IRuntimeConfig,
} from "@orch-ui/utils";
import { DeploymentType } from "../../../pages/SetupDeployment/SetupDeployment";
import Review, { ReviewProps } from "./Review";
import { ReviewPom } from "./Review.pom";

const defaultProps: ReviewProps = {
  selectedDeploymentName: "deploy",
  selectedMetadata: [],
  selectedPackage: compositeApplicationDefault,
  selectedProfileName: "profile",
  selectedClusters: [],
  type: "automatic",
};

let pom: ReviewPom;
describe("<Review />", () => {
  beforeEach(() => {
    const runtimeConfig: IRuntimeConfig = {
      AUTH: "",
      KC_CLIENT_ID: "",
      KC_REALM: "",
      KC_URL: "",
      SESSION_TIMEOUT: 0,
      OBSERVABILITY_URL: "",
      TITLE: "",
      MFE: { APP_ORCH: "false" },
      API: {},
      DOCUMENTATION: [],
      VERSIONS: {},
    };
    cy.mount(<Review {...defaultProps} />, { runtimeConfig });
    pom = new ReviewPom("review");
  });

  it("Should contain default values", () => {
    pom.el.applicationPackage.contains(compositeApplicationDefault.name);
    pom.el.deployment.contains(defaultProps.selectedDeploymentName);
    pom.el.profile.contains(defaultProps.selectedProfileName);
  });

  it("Should have 1 row in the table", () => {
    // Assert - this is the 'no results' row
    pom.getReviewTableRows().should("have.length", 1);
  });
});

describe("<Review type={DeploymentType.MANUAL} />", () => {
  beforeEach(() => {
    cy.mount(
      <Review
        {...defaultProps}
        type={DeploymentType.MANUAL}
        selectedClusters={[clusterOne, clusterThree]}
      />,
    );
    pom = new ReviewPom("review");
  });

  it("should render cluster review list", () => {
    pom.el.reviewTable.should("not.be.exist");
    pom.el.clusterReviewList.should("be.exist");

    ["restaurant-portland", "restaurant-ashland"].map((clusterName) => {
      pom.selectClusterTableUtils.getRowBySearchText(clusterName);
    });
  });
});
