/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import DeploymentInstanceClusterStatus from "./DeploymentInstanceClusterStatus";
import DeploymentInstanceClusterStatusPom from "./DeploymentInstanceClusterStatus.pom";

const pom = new DeploymentInstanceClusterStatusPom();

// sample data
const metadataPairs = [
  {
    key: "Key 1",
    value: "Value 1",
  },
  {
    key: "Key 2",
    value: "Value 2",
  },
  {
    key: "Key 3",
    value: "Value 3",
  },
  {
    key: "Key 4",
    value: "Value 4",
  },
];

describe("<DeploymentInstanceClusterStatus />", () => {
  beforeEach(() => {
    cy.mount(
      <DeploymentInstanceClusterStatus
        clusterMetaDataPairs={metadataPairs}
        clusterStatus={{
          status: <p>testing</p>,
          applicationReady: 0,
          applicationTotal: 1,
        }}
      />,
    );
  });

  it("should render status table with proper cluster infomration and metadata block", () => {
    pom.el.clusterStatus.contains("testing");
    pom.el.clusterAppDownStatus.contains("1 Down");
    pom.el.clusterAppReadyStatus.contains("0 Ready");
    pom.metadataPom.root.should("be.exist");
  });
});
