/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { applicationOne, profileOne } from "@orch-ui/utils";
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
});
