/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { TableLoader } from "./TableLoader";
import { TableLoaderPom } from "./TableLoader.pom";

const pom = new TableLoaderPom();
describe("<TableLoader/>", () => {
  it("should render component", () => {
    cy.mount(<TableLoader />);
    pom.el.row.should("have.length", 4);
  });
});
