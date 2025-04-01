/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  applicationOne,
  profileOne,
  profileThree,
  profileTwo,
} from "@orch-ui/utils";
import { setupStore, store } from "../../../../store";
import ApplicationProfileTable from "./ApplicationProfileTable";
import ApplicationProfileTablePom from "./ApplicationProfileTable.pom";

const pom = new ApplicationProfileTablePom();
describe("<ApplicationProfileTable />", () => {
  it("should render empty component when API return error", () => {
    cy.mount(<ApplicationProfileTable />, { reduxStore: store });
    pom.emptyPom.root.should("exist");
  });

  it("should render table component", () => {
    cy.mount(<ApplicationProfileTable />, {
      reduxStore: setupStore({
        application: {
          ...applicationOne,
          profiles: [profileOne],
        },
      }),
    });
    pom.tablePom.root.should("exist");
  });
  it("should able to render more than one profile sorted based on name", () => {
    cy.mount(<ApplicationProfileTable />, {
      reduxStore: setupStore({
        application: {
          ...applicationOne,
          profiles: [profileOne, profileTwo],
        },
      }),
    });
    pom.tablePom.root.should("exist");
    pom.tablePom.getCell(2, 1).should("have.text", profileOne.displayName);
    pom.tablePom.getCell(1, 1).should("have.text", profileTwo.displayName);
  });
  it("should render displayName when both displayName and name present", () => {
    cy.mount(<ApplicationProfileTable />, {
      reduxStore: setupStore({
        application: {
          ...applicationOne,
          profiles: [profileOne],
        },
      }),
    });
    pom.tablePom.root.should("exist");
    pom.tablePom.getCell(1, 1).should("have.text", profileOne.displayName);
  });
  it("should render name when only name present", () => {
    cy.mount(<ApplicationProfileTable />, {
      reduxStore: setupStore({
        application: {
          ...applicationOne,
          profiles: [profileThree],
        },
      }),
    });
    pom.tablePom.root.should("exist");
    pom.tablePom.getCell(1, 1).should("have.text", profileThree.name);
  });
});
