/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { MemoryRouter } from "react-router-dom";
import { HeaderSize } from "../Header/Header";
import HeaderItem from "./HeaderItem";
import HeaderItemPom from "./HeaderItem.pom";
import { cyGet } from "@orch-ui/tests";

const pom = new HeaderItemPom("header-item");
describe("<HeaderItem/>", () => {
  it("should render component size L", () => {
    cy.mount(
      <HeaderItem name="header-item" size={HeaderSize.Large} to="/to">
        Text
      </HeaderItem>,
    );
    pom.root.should("exist");
    pom.el.headerItemLink.should("contain.text", "Text");
    pom.root.should("have.css", "height", "80px");

    pom.el.headerItemLink.click();
    cy.get("#pathname #value").should("contain.text", "/to");
  });

  it("should render component size M", () => {
    cy.mount(
      <HeaderItem name="header-item" size={HeaderSize.Medium} to="/to">
        Text
      </HeaderItem>,
    );
    pom.root.should("exist");
    pom.root.should("have.css", "height", "64px");
  });

  it("should render component size S", () => {
    cy.mount(
      <HeaderItem name="header-item" size={HeaderSize.Small} to="/to">
        Text
      </HeaderItem>,
    );
    pom.root.should("exist");
    pom.root.should("have.css", "height", "48px");
  });
  it("should open link in new tab when blankLink is true", () => {
    cy.mount(
      <HeaderItem
        name="header-item"
        size={HeaderSize.Large}
        to="/to"
        blankLink
      >
        Text
      </HeaderItem>
    );
    pom.el.headerItemLink.should("have.attr", "target", "_blank");
  });
  
  it("should match root path when matchRoot is true and apply correct padding", () => {
    cy.window().then((win) => {
      win.history.pushState({}, "", "/");
    });
  
    cy.mount(
      <HeaderItem
        name="header-item"
        size={HeaderSize.Small}
        to="/"
        matchRoot
      >
        Home
      </HeaderItem>
    );
  
    cyGet("headerItemLink").should("have.css", "padding-bottom", "8px");
  });
  it("should apply custom styles", () => {
    cy.mount(
      <HeaderItem
        name="header-item"
        size={HeaderSize.Small}
        to="/styled"
        style={{ backgroundColor: "red" }}
      >
        Styled
      </HeaderItem>
    );
    pom.root.should("have.css", "background-color", "rgb(255, 0, 0)");
  });
  it("should render ReactElement as children", () => {
    cy.mount(
      <HeaderItem name="header-item" size={HeaderSize.Large} to="/to">
        <span data-cy="child-element">Icon</span>
      </HeaderItem>
    );
    cyGet("child-element").should("contain.text", "Icon");
  });
});
