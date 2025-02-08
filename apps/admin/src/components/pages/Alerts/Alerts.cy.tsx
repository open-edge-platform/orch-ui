/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import Alerts from "./Alerts";
import AlertsPom from "./Alerts.pom";

const pom = new AlertsPom();
describe("<Alerts/>", () => {
  it("should render component", () => {
    cy.mount(<Alerts />);
    pom.root.should("exist");
    pom.alertsList.root.should("exist");
  });
});
