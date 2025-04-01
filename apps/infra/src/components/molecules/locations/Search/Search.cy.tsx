/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { SearchTypes } from "../../../../store/locations";
import { Search, SearchTypeItem } from "./Search";
import { SearchPom } from "./Search.pom";

const searchTypes: SearchTypeItem[] = Object.values(SearchTypes).map(
  (value: SearchTypes) => ({ id: value, name: value }),
);

const pom = new SearchPom();
describe("<Search/>", () => {
  beforeEach(() => {
    cy.intercept("**/locations**", cy.spy().as("getLocationsSpy"));
    cy.mount(
      <Search searchTypes={searchTypes} defaultSearchType={searchTypes[0]} />,
    );
  });

  it("should render component", () => {
    pom.root.should("exist");
  });

  it("call search callback after typing more than 1 character", () => {
    pom.el.textField.type("US");
    cy.get("@getLocationsSpy").should("have.been.called");
  });

  it("not call search callback after explicitly hitting search button with not search", () => {
    pom.el.button.click();
    cy.get("@getLocationsSpy").should("not.have.been.called");
  });

  it("not call search callback after typing 1 character", () => {
    pom.el.textField.type("X");
    cy.get("@getLocationsSpy").should("not.have.been.called");
  });

  it("not call search callback when clearing search text", () => {
    pom.el.textField.type("XXXXXXXXXXXXXX").clear();
    cy.get("@getLocationsSpy").should("not.have.been.called");
  });

  it("not call search callback after switching search type", () => {
    pom.selectPopoverItem(2);
    cy.get("@getLocationsSpy").should("not.have.been.called");
  });

  it("call change search type callback after switching search type", () => {
    pom.selectPopoverItem(1);
    pom.el.button.contains(searchTypes[1].name);
  });

  it("calls the location search api on every search type change", () => {
    pom.el.textField.focus().type("abc");
    for (let i = 0; i < searchTypes.length; i++) {
      pom.selectPopoverItem(i);
      cy.get("@getLocationsSpy").should("have.been.called");
    }
  });

  it("calls the location search api on every search type button press", () => {
    pom.el.textField.type("abc");

    const searchAttempts = 3;
    for (let i = 0; i < searchTypes.length; i++) {
      pom.selectPopoverItem(i);
      for (let j = 0; j < searchAttempts; j++) {
        pom.el.button.click();
        cy.get("@getLocationsSpy").should("have.been.called");
      }
    }
  });

  it("does not call api through search button when searchTerm is invalid", () => {
    for (let i = 0; i < searchTypes.length; i++) {
      pom.selectPopoverItem(i);
      pom.el.button.click();
      cy.get("@getLocationsSpy").should("not.have.been.called");
    }
  });
});
