/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { IRuntimeConfig } from "@orch-ui/utils";
import About from "../../pages/About/About";
import VersionPom from "./Version.pom";
const pom = new VersionPom();
describe("<Version/>", () => {
  it("should render an error message", () => {
    cy.mount(<About />, {
      runtimeConfig: {} as IRuntimeConfig,
    });
    pom.root.should("exist");
    pom.orchVersionError.should("be.visible");
  });
});
