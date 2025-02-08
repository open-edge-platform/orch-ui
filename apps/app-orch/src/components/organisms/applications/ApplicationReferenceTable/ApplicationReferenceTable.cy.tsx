/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { packageOne } from "@orch-ui/utils";
import { setupStore } from "../../../../store";
import ApplicationReferenceTable from "./ApplicationReferenceTable";
import ApplicationReferenceTablePom, {
  applicationReferenceHeaders as headers,
} from "./ApplicationReferenceTable.pom";

const pom = new ApplicationReferenceTablePom();
describe("<ApplicationReferenceTable/> ", () => {
  beforeEach(() => {
    cy.mount(<ApplicationReferenceTable />, {
      reduxStore: setupStore({
        deploymentPackage: packageOne,
      }),
    });
  });
  it("should render application reference table head", () => {
    headers.map((headerName, index) => {
      pom.table.getColumnHeader(index).contains(headerName);
    });
  });
  it("should render application reference table", () => {
    pom.table.getRows().should("have.length", 6);
  });

  it("should render empty application reference table", () => {
    cy.mount(<ApplicationReferenceTable />);
    pom.table.getRows().should("contain.text", "No information to display");
  });
});
