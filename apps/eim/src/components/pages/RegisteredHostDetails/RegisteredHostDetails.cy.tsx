/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { registeredHostOne } from "@orch-ui/utils";
import { RegisteredHostDetails } from "./RegisteredHostDetails";
import { RegisteredHostDetailsPom } from "./RegisteredHostDetails.pom";

const pom = new RegisteredHostDetailsPom();
describe("<RegisteredHostDetails/>", () => {
  it("should render component", () => {
    pom.interceptApis([pom.api.getRegisteredHost200]);
    cy.mount(null, {
      routerProps: {
        initialEntries: [`/registered-hosts/${registeredHostOne.name}`],
      },
      routerRule: [
        {
          path: "/registered-hosts/:resourceId",
          element: <RegisteredHostDetails />,
        },
      ],
    });
    pom.waitForApis();
    pom.root.should("exist");
    pom.el.autoOnboard.contains("No");
    pom.el.serialNumber.contains(registeredHostOne.serialNumber!);
    pom.el.uuid.contains(registeredHostOne.uuid!);
  });
});
