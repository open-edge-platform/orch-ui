/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { deploymentMinimal } from "@orch-ui/utils";
import EditDeployment from "./EditDeployment";
import EditDeploymentPom from "./EditDeployment.pom";

const pom = new EditDeploymentPom();
describe("<EditDeployment/>", () => {
  beforeEach(() => {
    pom.interceptApis([pom.api.minimalDeploymentDetailsResponse]);
    cy.mount(<EditDeployment />, {
      routerProps: {
        initialEntries: [
          `/applications/deployment/${deploymentMinimal.deployId}/edit`,
        ],
      },
      routerRule: [
        {
          path: "/applications/deployment/:id/edit",
          element: <EditDeployment />,
        },
        {
          path: "/applications/deployment/:id",
          element: <>Deployment details page</>,
        },
      ],
    });
    pom.waitForApis();
  });

  it("should render component", () => {
    pom.root.should("exist");
  });
});
