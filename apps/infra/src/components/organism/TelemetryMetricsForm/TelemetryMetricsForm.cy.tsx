/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import TelemetryMetricsForm from "./TelemetryMetricsForm";
import TelemetryMetricsFormPom from "./TelemetryMetricsForm.pom";

const pom = new TelemetryMetricsFormPom();
describe("<TelemetryMetricsForm/>", () => {
  it("should render component", () => {
    cy.mount(<TelemetryMetricsForm onUpdate={cy.stub().as("onUpdateStub")} />);
    pom.root.should("exist");
  });
});
