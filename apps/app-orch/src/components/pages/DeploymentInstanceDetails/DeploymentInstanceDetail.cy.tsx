/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { clusterA, deploymentOne } from "@orch-ui/utils";
import DeploymentInstanceDetail from "./DeploymentInstanceDetail";
import DeploymentInstanceDetailPom from "./DeploymentInstanceDetail.pom";

const pom = new DeploymentInstanceDetailPom();
describe("<DeploymentInstanceDetail />", () => {
  it("should render empty", () => {
    pom.interceptApis([
      pom.api.deploymentSuccess,
      pom.api.kubeconfigSuccess,
      pom.api.clustersEmptyList,
    ]);
    cy.mount(<DeploymentInstanceDetail />, {
      routerProps: {
        initialEntries: [
          `/deployment/${deploymentOne.deployId}/${clusterA.id!}`,
        ],
      },
      routerRule: [
        {
          path: "/deployment/:deplId/:clusterId",
          element: <DeploymentInstanceDetail />,
        },
      ],
    });

    pom.root.should("not.exist");
    pom.emptyPom.root.should("exist");
  });
  it("should render empty", () => {
    pom.interceptApis([
      pom.api.deploymentSuccess,
      pom.api.kubeconfigSuccess,
      pom.api.clustersListError,
    ]);
    cy.mount(<DeploymentInstanceDetail />, {
      routerProps: {
        initialEntries: [
          `/deployment/${deploymentOne.deployId}/${clusterA.id!}`,
        ],
      },
      routerRule: [
        {
          path: "/deployment/:deplId/:clusterId",
          element: <DeploymentInstanceDetail />,
        },
      ],
    });

    pom.root.should("not.exist");
    pom.apiErrorPom.root.should("exist");
  });
  it("should render component", () => {
    pom.interceptApis([
      pom.api.deploymentSuccess,
      pom.api.kubeconfigSuccess,
      pom.api.clustersList,
    ]);
    cy.mount(<DeploymentInstanceDetail />, {
      routerProps: {
        initialEntries: [
          `/deployment/${deploymentOne.deployId}/${clusterA.id!}`,
        ],
      },
      routerRule: [
        {
          path: "/deployment/:deplId/:clusterId",
          element: <DeploymentInstanceDetail />,
        },
      ],
    });
    pom.waitForApis();
    pom.root.should("exist");
  });
});
