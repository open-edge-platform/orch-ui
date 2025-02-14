/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { Ribbon } from "./Ribbon";
import { RibbonPom } from "./Ribbon.pom";

const pom = new RibbonPom();
describe("<Ribbon/>", () => {
  describe("all properties should", () => {
    it("render component", () => {
      cy.mount(
        <Ribbon
          buttons={[{ text: "Add Item", tooltip: "Add new item" }]}
          searchTooltip="Search to filter out items from the table"
          onSearchChange={cy.stub()}
        />,
      );
      pom.root.should("exist");
      pom.el.search.should("exist");
      pom.el.button.should("exist");
    });
  });

  describe("with button should", () => {
    beforeEach(() => {
      cy.mount(
        <Ribbon
          onSearchChange={cy.stub()}
          buttons={[
            {
              text: "Add Item",
            },
          ]}
        />,
      );
    });

    it("display correct text in button", () => {
      pom.el.button.should("have.text", "Add Item");
    });
  });

  describe("search should", () => {
    it("be displayed on subtitle and search and button ", () => {
      cy.mount(
        <Ribbon
          onSearchChange={cy.stub()}
          showSearch={true}
          subtitle="test"
          buttons={[
            {
              text: "Add Item",
            },
          ]}
        />,
      );
      pom.el.search.should("exist");
    });

    it("be displayed ", () => {
      cy.mount(<Ribbon onSearchChange={cy.stub()} showSearch={true} />);
      pom.el.search.should("exist");
    });

    it("not be displayed ", () => {
      cy.mount(<Ribbon onSearchChange={cy.stub()} showSearch={false} />);
      pom.el.search.should("not.exist");
    });
  });

  describe("render subtitle", () => {
    it("should display search on default", () => {
      cy.mount(<Ribbon onSearchChange={cy.stub()} />);
      pom.el.subtitle.should("not.exist");
      pom.el.search.should("exist");
      pom.el.button.should("not.exist");
    });

    it("should display subtitle with search", () => {
      cy.mount(<Ribbon onSearchChange={cy.stub()} subtitle="testing" />);
      pom.el.search.should("exist");
      pom.el.subtitle.should("exist");
    });

    it("should display subtitle with search and button", () => {
      cy.mount(
        <Ribbon
          onSearchChange={cy.stub()}
          subtitle="testing"
          buttons={[
            {
              text: "Add Item",
            },
          ]}
        />,
      );
      pom.el.subtitle.should("exist");
      pom.el.search.should("exist");
      pom.el.button.should("exist");
    });

    it("should display subtitle with button", () => {
      cy.mount(
        <Ribbon
          onSearchChange={cy.stub()}
          subtitle="testing"
          showSearch={false}
          buttons={[
            {
              text: "Add Item",
            },
          ]}
        />,
      );
      pom.el.subtitle.should("exist");
      pom.el.search.should("not.exist");
      pom.el.button.should("exist");
    });

    it("should display subtitle with no search or buttons", () => {
      cy.mount(
        <Ribbon
          onSearchChange={cy.stub()}
          subtitle="testing"
          showSearch={false}
        />,
      );
      pom.el.subtitle.should("exist");
      pom.el.search.should("not.exist");
      pom.el.button.should("not.exist");
    });
  });

  describe("in a basic format should", () => {
    beforeEach(() => {
      cy.mount(<Ribbon onSearchChange={cy.stub()} />);
    });
    it("not render button", () => {
      pom.el.button.should("not.exist");
    });
    it("include search icon", () => {
      pom.el.leftItem
        .find(".spark-text-field-start-slot")
        .children()
        .invoke("attr", "class")
        .should("contain", "magnifier");
    });
    it("include placeholder text", () => {
      pom.el.search.should("have.attr", "placeholder", "Search");
    });
  });
  describe("callback should", () => {
    it("return onButtonPress callback", () => {
      const onButtonPressSpy = cy.spy().as("onButtonPressSpy");
      cy.mount(
        <Ribbon
          onSearchChange={cy.stub()}
          buttons={[
            {
              text: "Add Item",
              onPress: onButtonPressSpy,
            },
          ]}
        />,
      );
      pom.el.button.click({ force: true });
      cy.get("@onButtonPressSpy").should("have.been.called");
    });

    it("return onSearchChange callback", () => {
      const onSearchChangeSpy = cy.spy().as("onSearchChangeSpy");
      cy.mount(<Ribbon onSearchChange={onSearchChangeSpy} />);
      pom.el.search.type("testing input search");
      cy.get("@onSearchChangeSpy").should(
        "have.been.calledWith",
        "testing input search",
      );
      cy.get("input").clear();
    });
  });
  describe("tooltips should", () => {
    it("be wrapped in search input", () => {
      cy.mount(
        <Ribbon onSearchChange={cy.stub()} searchTooltip="This is tooltip" />,
      );
      pom.el.search.type("testing search");
      pom.el.leftItem
        .children()
        .invoke("attr", "class")
        .should("contain", "spark-tooltip-toggle");
    });
    it("be wrapped in button", () => {
      cy.mount(
        <Ribbon
          onSearchChange={cy.stub()}
          buttons={[
            {
              onPress: cy.stub(),
              text: "New Button",
              tooltip: "This is tooltip",
            },
          ]}
        />,
      );
      pom.el.button.click();
      pom.el.rightItem
        .children()
        .invoke("attr", "class")
        .should("contain", "spark-tooltip-toggle");
    });
    it("be wrapped in search input and button", () => {
      cy.mount(
        <Ribbon
          onSearchChange={cy.stub()}
          searchTooltip="This is another tooltip"
          buttons={[
            {
              text: "Button",
              tooltip: "This is tooltip",
            },
          ]}
        />,
      );
      cy.get("[data-cy= rightItem]");
      pom.el.rightItem
        .children()
        .invoke("attr", "class")
        .should("contain", "spark-tooltip-toggle");
      pom.el.leftItem
        .children()
        .invoke("attr", "class")
        .should("contain", "spark-tooltip-toggle");
    });
    it("not be loaded", () => {
      cy.mount(<Ribbon onSearchChange={cy.stub()} />);
      pom.el.rightItem.should("not.contain", ".spark-tooltip-toggle");
      pom.el.leftItem.should("not.contain", ".spark-tooltip-toggle");
    });
  });
  describe("disabled button should", () => {
    it("be wrapped in tooltip", () => {
      cy.mount(
        <Ribbon
          onSearchChange={cy.stub()}
          buttons={[
            {
              text: "This is button",
              disable: true,
              tooltip: "This is tooltip",
              tooltipIcon: "lock",
            },
          ]}
        />,
      );
      pom.el.rightItem
        .children()
        .invoke("attr", "class")
        .should("contain", "spark-tooltip-toggle");
    });
  });

  describe("multiple buttons should", () => {
    it("show in button section", () => {
      cy.mount(
        <Ribbon
          onSearchChange={cy.stub()}
          buttons={[
            {
              text: "Button 1",
              onPress: cy.stub(),
            },
            {
              text: "Button 2",
              onPress: cy.stub(),
            },
          ]}
        />,
      );
      cy.contains("Button 1");
      cy.contains("Button 2");
    });
  });

  describe("ellipsis-v icon button should", () => {
    it("show ellipsis-v icon button with popup", () => {
      cy.mount(
        <Ribbon
          onSearchChange={cy.stub()}
          buttons={[
            {
              text: "Button to hide",
              onPress: cy.stub(),
              hide: true,
              dataCy: "hiddenButton",
            },
            {
              text: "Button to show",
              onPress: cy.stub(),
              hide: false,
              dataCy: "shownButton",
            },
          ]}
        />,
      );
      pom.el.ellipsisButton.click();
      pom.el.popupButtons.should("be.visible");
    });
  });
  describe("debounce should", () => {
    it("wait 200 milliseconds", () => {
      const debouncedOnChange = cy.stub().as("search");

      cy.mount(
        <Ribbon
          onSearchChange={() => {
            return debouncedOnChange();
          }}
          buttons={[
            {
              text: "This is button",
              disable: true,
              tooltip: "This is tooltip",
              icon: "lock",
            },
          ]}
        />,
      );
      pom.el.search.type("1234");
      cy.get("@search").should("have.been.calledOnce");
      pom.el.search.type("5");
      // eslint-disable-next-line
      cy.wait(250);
      pom.el.search.type("6");
      // eslint-disable-next-line
      cy.wait(250);

      cy.get("@search").should("have.been.calledThrice");
    });
  });
});
