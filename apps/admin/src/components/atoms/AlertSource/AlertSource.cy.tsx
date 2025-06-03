/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { alertMocks } from "library/utils/mocks_new/admin/data/alerts";
import AlertSource from "./AlertSource";
import AlertSourcePom from "./AlertSource.pom";

const pom = new AlertSourcePom();
describe("<AlertSource/>", () => {
  it("should render component with component", () => {
    cy.mount(<AlertSource alert={alertMocks.clusterDownAlert} />);
    pom.root.should("exist");
    pom.root.contains(
      alertMocks.clusterDownAlert.labels?.cluster_name ?? "no source",
    );
  });
  it("should render component with host", () => {
    cy.mount(<AlertSource alert={alertMocks.clusterRamUsageAlertNoSource} />);
    pom.root.should("exist");
    pom.root.contains("no source");
  });
});
