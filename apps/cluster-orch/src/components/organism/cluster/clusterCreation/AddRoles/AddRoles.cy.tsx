/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { setupStore } from "../../../../../store";
import AddRoles from "./AddRoles";
import AddRolesPom from "./AddRoles.pom";

const pom = new AddRolesPom();

describe("<AddRoles/>", () => {
  it("should render component", () => {
    const store = setupStore({
      nodes: [
        {
          guid: "guid1",
          id: "node-1",
          name: "nodeOne",
          role: "all",
          os: "linux",
          serial: "serialNumberOne",
        },
      ],
    });
    // @ts-ignore
    window.store = store;
    cy.mount(<AddRoles />, {
      reduxStore: store,
    });
    pom.root.should("exist");
    pom.root.should("contain", "nodeOne");
    pom.nodeRoleDropdown.roleDropdownPom.openDropdown(pom.root);
    pom.nodeRoleDropdown.roleDropdownPom.selectDropdownValue(
      pom.root,
      "role",
      "worker",
      "worker",
    );
    pom.nodeRoleDropdown.root.should("exist");
  });

  it("should render empty", () => {
    const store = setupStore({
      nodes: [],
      locations: [],
      cluster: {},
    });
    // @ts-ignore
    window.store = store;
    cy.mount(<AddRoles />, {
      reduxStore: store,
    });
    pom.root.should("exist");
    pom.root.should("contain", "No information to display");
  });
});
