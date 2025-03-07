/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import SelectCluster from "./SelectCluster";
import SelectClusterPom from "./SelectCluster.pom";

const pom = new SelectClusterPom();
describe("<SelectCluster/>", () => {
  beforeEach(() => {
    cy.mount(
      <SelectCluster
        onDeploymentNameChange={() => {}}
        selectedIds={[]}
        onSelect={() => {}}
      />,
    );
  });
  it("should render component", () => {
    pom.root.should("exist");
    pom.el.title.contains("Enter Deployment Details");
  });
});
