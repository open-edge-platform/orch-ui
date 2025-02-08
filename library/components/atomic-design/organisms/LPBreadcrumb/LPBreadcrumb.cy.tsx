/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { BreadcrumbPiece } from "../../../ui/slice";
import { LPBreadcrumb } from "./LPBreadcrumb";

describe("test for LPBreadcrumb when pieces larger than 2", () => {
  it("should render the component", () => {
    const testData: BreadcrumbPiece[] = [
      { text: "test-1", link: "test-1" },
      { text: "test-2", link: "test-2" },
      { text: "test-3", link: "test-3" },
    ];
    cy.mount(<LPBreadcrumb breadcrumbPieces={testData} />);
    cy.get("a").eq(0).should("have.attr", "href", "/test-1");
    cy.get("a").eq(1).should("have.attr", "href", "/test-2");
    cy.get("a").eq(2).should("have.attr", "href", "/test-3");
  });

  it("should not render the component when pieces smaller or equal to 2", () => {
    const testData: BreadcrumbPiece[] = [
      { text: "test-1", link: "test-1" },
      { text: "test-2", link: "test-2" },
    ];
    cy.mount(<LPBreadcrumb breadcrumbPieces={testData} />);
    cy.get("a").should("not.exist");
  });

  it("use relative path", () => {
    const testData: BreadcrumbPiece[] = [
      { text: "test-1", link: "../child2", isRelative: true },
      { text: "test-2", link: "../child3", isRelative: true },
      { text: "test-3", link: "append1", isRelative: true },
      { text: "test-4", link: "/root1", isRelative: true },
      { text: "test-5", link: "/root2" },
      { text: "test-6", link: "/root3" },
    ];
    cy.mount(null, {
      routerProps: { initialEntries: ["/parent/child1"] },
      routerRule: [
        {
          path: "/parent/child1",
          element: <LPBreadcrumb breadcrumbPieces={testData} />,
        },
        {
          path: "/parent/child2",
          element: <LPBreadcrumb breadcrumbPieces={testData} />,
        },
        {
          path: "/parent/child3",
          element: <LPBreadcrumb breadcrumbPieces={testData} />,
        },
        {
          path: "/parent/child3/append1",
          element: <LPBreadcrumb breadcrumbPieces={testData} />,
        },
        {
          path: "/root1",
          element: <LPBreadcrumb breadcrumbPieces={testData} />,
        },
      ],
    });
    cy.get("a").eq(0).click();
    cy.get("#pathname").contains("/parent/child2");
    cy.get("a").eq(1).click();
    cy.get("#pathname").contains("/parent/child3");
    cy.get("a").eq(2).click();
    cy.get("#pathname").contains("/parent/child3/append");
    cy.get("a").eq(3).click();
    cy.get("#pathname").contains("/root1");
    cy.get("a").eq(4).click();
    cy.get("#pathname").contains("/root2");
  });
});
