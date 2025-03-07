/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog } from "@orch-ui/apis";
import NetworkInterconnect from "./NetworkInterconnect";
import NetworkInterconnectPom from "./NetworkInterconnect.pom";

const pom = new NetworkInterconnectPom();

const networks = ["Network 1", "Network 2", "Network 3"];
const applicationReferences: catalog.ApplicationReference[] = [
  {
    name: "app 1",
    version: "1.0.0",
  },
  {
    name: "app 2",
    version: "1.0.0",
  },
  {
    name: "app 3",
    version: "1.0.0",
  },
];

describe("<NetworkInterconnect/>", () => {
  it("selecting no network", () => {
    const networkSelectSpy = cy.spy().as("onNetworkUpdate");
    const exportSelectSpy = cy.spy().as("onExportsUpdate");
    cy.mount(
      <NetworkInterconnect
        networks={networks}
        onNetworkUpdate={networkSelectSpy}
        selectedNetwork=""
        selectedServices={[]}
        onExportsUpdate={exportSelectSpy}
        applications={applicationReferences}
      />,
    );
    pom.root.should("exist");
    pom.selectNetwork("None");
    pom.el.interconnectMessage.should("not.exist");
  });

  it("selecting existing network", () => {
    const exportSelectSpy = cy.spy().as("onExportsUpdate");
    cy.mount(
      <NetworkInterconnect
        networks={networks}
        onNetworkUpdate={cy.spy().as("onNetworkUpdate")}
        selectedNetwork=""
        selectedServices={[]}
        onExportsUpdate={exportSelectSpy}
        applications={applicationReferences}
      />,
    );
    pom.root.should("exist");
    pom.selectNetwork("Network 2");
    cy.contains(
      "All applications can now access data over the chosen interconnect.",
    );

    pom.table.getRows().should("have.length", applicationReferences.length);

    pom.table.getRow(1).find("[data-cy='rowSelectCheckbox']").click();

    cy.get("@onExportsUpdate").should(
      "have.been.calledWith",
      {
        name: applicationReferences[0].name,
        version: applicationReferences[0].version,
      },
      true,
    );

    pom.table.getRow(1).find("[data-cy='rowSelectCheckbox']").click();

    cy.get("@onExportsUpdate").should(
      "have.been.calledWith",
      {
        name: applicationReferences[0].name,
        version: applicationReferences[0].version,
      },
      false,
    );
  });
});
