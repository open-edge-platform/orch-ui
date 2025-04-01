/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import DashboardCard from "./DashboardCard";
import DashboardCardPom from "./DashboardCard.pom";

const pom = new DashboardCardPom();
describe("<DashboardCard />", () => {
  it("should render the card with CounterWheel (0 out of 85; empty) child component.", () => {
    cy.mount(
      <DashboardCard>
        <div>Unallocated Hosts</div>
      </DashboardCard>,
    );
    pom.root.should("contain.text", "Unallocated Hosts");
  });
});
