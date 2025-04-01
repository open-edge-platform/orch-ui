/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import ApplicationDetailsPodDetails from "./ApplicationDetailsPodDetails";
import ApplicationDetailsPodDetailsPom from "./ApplicationDetailsPodDetails.pom";
// TODO: make a VM mockstore in shared
import { container1 } from "@orch-ui/utils";

const pom = new ApplicationDetailsPodDetailsPom();
describe("<ApplicationDetailsPodDetails />", () => {
  it("should render component", () => {
    cy.mount(<ApplicationDetailsPodDetails containers={[container1]} />);
    pom.root.should("exist");
    pom.table.getCell(1, 1).contains(container1.name);
    pom.table.getCell(1, 2).contains("Running");
    pom.table.getCell(1, 3).contains(container1.imageName ?? "");
    pom.table.getCell(1, 4).contains(container1.restartCount ?? "");
  });
  it("should render empty component", () => {
    cy.mount(<ApplicationDetailsPodDetails containers={[]} />);
    pom.el.empty.contains("There are no Container currently available");
  });
});
