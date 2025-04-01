/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { PageNotFound } from "./PageNotFound";
import { PageNotFoundPom } from "./PageNotFound.pom";

const pom = new PageNotFoundPom();
describe("<PageNotFound/>", () => {
  it("render component", () => {
    cy.mount(<PageNotFound />);
    pom.root.should("exist").should("be.visible");
  });
  it("navigates back to root", () => {
    cy.mount(<PageNotFound />, {
      routerProps: { initialEntries: ["/pageNotFound"] },
      routerRule: [{ path: "/pageNotFound", element: <PageNotFound /> }],
    });
    pom.el.home.click();
    cy.get("#pathname").contains(/^\/$/);
  });

  it("navigates back one level", () => {
    cy.mount(<PageNotFound />, {
      routerProps: { initialEntries: ["/pageNotFound/subroute"] },
      routerRule: [
        { path: "/pageNotFound/subroute", element: <PageNotFound /> },
      ],
    });
    pom.el.home.click();
    cy.get("#pathname").contains(/^\/pageNotFound$/);
  });
});
