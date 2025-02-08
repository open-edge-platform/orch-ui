/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import TableLoader from "./TableLoader";

describe("<TableLoader />", () => {
  describe("render TableLoader", () => {
    it("should render a TableLoaders", () => {
      cy.mount(<TableLoader />);
      cy.get("div[class='spark-shimmer-animate not-essential']").should(
        "have.length",
        3,
      );
    });
  });
});
