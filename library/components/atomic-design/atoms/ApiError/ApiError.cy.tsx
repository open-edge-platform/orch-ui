/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { ApiError } from "./ApiError";
import { ApiErrorPom } from "./ApiError.pom";

const pom = new ApiErrorPom();
describe("<ApiError/>", () => {
  it("should render component", () => {
    cy.mount(<ApiError error="error" />);
  });

  it("should render license error", () => {
    const error = {
      status: 401,
      data: {
        message:
          "There was an error validating your license for this product. Check that your license has not expired. Please open a support ticket including the identifier below at https://supporttickets.intel.com/supportrequest?lang=en-US\u0026productId=236861:15711",
      },
    };
    cy.mount(<ApiError error={error} />);
    pom.root.should("contain.text", "Additional Permissions Needed");
    pom.root.should(
      "contain.text",
      "There was an error validating your license for this product",
    );
  });

  it("should render other 401 error", () => {
    const error = {
      status: 401,
      data: {},
    };
    cy.mount(<ApiError error={error} />);
    pom.root.should("contain.text", "Additional Permissions Needed");
    pom.root.should(
      "contain.text",
      "Unknown error. Please contact the administrator",
    );
  });

  it("should render other 403 error", () => {
    const error = {
      status: 403,
      data: { message: "Forbidden" },
    };
    cy.mount(<ApiError error={error} />);
    pom.root.should("contain.text", "Additional Permissions Needed");
    pom.root.should(
      "contain.text",
      "Only user accounts with read/write permissions can access this data.",
    );
  });
});
