/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { CollapsableList, CollapsableListItem } from "./CollapsableList";
import { CollapsableListPom } from "./CollapsableList.pom";

const pom = new CollapsableListPom();
describe("<CollapsableList />", () => {
  const items: CollapsableListItem<string>[] = [
    { route: "/foo", icon: "pin", value: "foo" },
    { route: "/bar", icon: "pin", value: "bar" },
    { route: "/bold", icon: "pin", value: "bold", isBold: true },
    { route: "/no-click", icon: "pin", value: "noClick", isClickable: false },
    { route: "/indented", icon: "pin", value: "indented", isIndented: true },
  ];
  describe("when rendering a list", () => {
    beforeEach(() => {
      cy.mount(<CollapsableList items={items} expand={true} />);
    });
    it("should render all items", () => {
      pom.el.collapsibleItem.should("have.length", items.length);
    });

    it("should have bold link", () => {
      pom.el.bold.should("have.class", "bold");
    });

    it("should have indented link", () => {
      pom.el.indented.should("have.class", "indented");
    });

    it("should have non-clickable link", () => {
      pom.el.noClick.click();
    });
  });
  describe("with item selection", () => {
    beforeEach(() => {
      cy.mount(
        <CollapsableList items={items} activeItem={items[0]} expand={true} />,
      );
    });
    it("should have CSS selection class attached", () => {
      pom.el.foo.should("have.class", "spark-button-selected");
    });
    it("should updated CSS for next item selected", () => {
      pom.el.bar.click().should("have.class", "spark-button-selected");
    });
    it("should css selection is item is not clickable", () => {
      pom.el.noClick.click().should("not.have.class", "spark-button-selected");
    });
  });
});
