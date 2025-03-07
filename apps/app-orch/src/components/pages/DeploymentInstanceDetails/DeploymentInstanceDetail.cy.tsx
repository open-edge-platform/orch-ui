/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
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
          `/deployment/${deploymentOne.deployId}/cluster/${clusterA.id!}`,
        ],
      },
      routerRule: [
        {
          path: "/deployment/:deplId/cluster/:name",
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
          `/deployment/${deploymentOne.deployId}/cluster/${clusterA.id!}`,
        ],
      },
      routerRule: [
        {
          path: "/deployment/:deplId/cluster/:name",
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
          `/deployment/${deploymentOne.deployId}/cluster/${clusterA.id!}`,
        ],
      },
      routerRule: [
        {
          path: "/deployment/:deplId/cluster/:name",
          element: <DeploymentInstanceDetail />,
        },
      ],
    });
    pom.waitForApis();
    pom.root.should("exist");
  });
});
