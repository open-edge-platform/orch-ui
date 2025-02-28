/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
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
  });
});
