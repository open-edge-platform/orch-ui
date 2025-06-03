/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */
import { alertNoSource, alertSeven } from "@orch-ui/utils";
import AlertSource from "./AlertSource";
import AlertSourcePom from "./AlertSource.pom";

const pom = new AlertSourcePom();
describe("<AlertSource/>", () => {
  it("should render component with component", () => {
    cy.mount(<AlertSource alert={alertSeven} />);
    pom.root.should("exist");
    pom.root.contains(alertSeven.labels?.cluster_name ?? "no source");
  });
  it("should render component with host", () => {
    cy.mount(<AlertSource alert={alertNoSource} />);
    pom.root.should("exist");
    pom.root.contains("no source");
  });
});
