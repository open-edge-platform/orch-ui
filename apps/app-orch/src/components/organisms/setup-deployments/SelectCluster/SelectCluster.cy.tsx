/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Button } from "@spark-design/react";
import React from "react";
import SelectCluster, { SelectClusterMode } from "./SelectCluster";
import SelectClusterPom from "./SelectCluster.pom";

const ClusterListMock = ({
  onShowDetails,
}: {
  onShowDetails: (clusterId: string) => void;
}) => {
  return (
    <Button
      data-cy="testShowDrawer"
      onPress={() => {
        onShowDetails("cluster1");
      }}
    >
      cluster1
    </Button>
  );
};

const pom = new SelectClusterPom();
describe("<SelectCluster/>", () => {
  beforeEach(() => {
    cy.mount(
      <SelectCluster
        selectedIds={[]}
        onSelect={cy.stub().as("onSelectStub")}
        onDeploymentNameChange={cy.stub().as("onDeploymentNameChangeStub")}
        mode={SelectClusterMode.CREATE}
        __ClusterListRemote={React.lazy(() =>
          Promise.resolve({
            default: () => (
              <ClusterListMock onShowDetails={cy.stub().as("onShowDetails")} />
            ),
          }),
        )}
      />,
    );
  });
  it("should render component", () => {
    pom.root.should("exist");
    pom.el.title.contains("Enter Deployment Details");
  });

  it("should show cluster details", () => {
    // This will avoid the error shown when no name is entered
    pom.el.deploymentNameField.type("test");

    cy.get("[data-cy='testShowDrawer']").click();
    cy.get("@onShowDetails").should("be.calledWith", "cluster1");
  });
});
