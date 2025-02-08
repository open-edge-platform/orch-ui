/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { HeaderSize } from "../Header/Header";
import HeaderItem from "./HeaderItem";
import HeaderItemPom from "./HeaderItem.pom";

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
});
