/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import TelemetryLogsForm from "./TelemetryLogsForm";
import TelemetryLogsFormPom from "./TelemetryLogsForm.pom";

const pom = new TelemetryLogsFormPom();
describe("<TelemetryLogsForm/>", () => {
  it("should render component", () => {
    cy.mount(<TelemetryLogsForm onUpdate={cy.stub().as("onUpdateStub")} />);
    pom.root.should("exist");
  });
});
