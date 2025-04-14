/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { assignedWorkloadHostThree as hostThree } from "@orch-ui/utils";
import HostsTableRowExpansionDetail from "./HostsTableRowExpansionDetail";
import HostsTableRowExpansionDetailPom from "./HostsTableRowExpansionDetail.pom";
const pom = new HostsTableRowExpansionDetailPom();

describe("<HostsTableRowExpansionDetail/>", () => {
  it("should render component", () => {
    cy.mount(<HostsTableRowExpansionDetail host={hostThree} />);
    pom.root.should("exist");
  });

  it("should render all detailed pieces", () => {
    cy.mount(<HostsTableRowExpansionDetail host={hostThree} />);
    pom.el.cpuModel.should("be.visible");
    pom.el.hostName.should("be.visible");
    pom.el.uuid.should("be.visible");
    pom.el.trustedCompute.should("be.visible");
  });

  it("should show Available Update", () => {
    cy.mount(
      <HostsTableRowExpansionDetail
        host={{
          ...hostThree,
          instance: {
            ...hostThree.instance,
            desiredOs: {
              name: "desiredOsName",
              sha256: "desiredOsSha256",
              updateSources: [],
              osType: "OPERATING_SYSTEM_TYPE_IMMUTABLE",
            },
          },
        }}
      />,
    );
    pom.el.osUpdate.should("contain.text", "desiredOsName");
  });

  it("should show `No Update` when no os is available", () => {
    cy.mount(
      <HostsTableRowExpansionDetail
        host={{
          ...hostThree,
          instance: {
            ...hostThree.instance,
            desiredOs: undefined,
          },
        }}
      />,
    );
    pom.el.osUpdate.should("contain.text", "No Update");
  });
});
