/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cyGet } from "@orch-ui/tests";
import Popover from "./Popover";
import { PopoverPom } from "./Popover.pom";

const pom = new PopoverPom();
describe("<Popover/>", () => {
  describe("basic functionality", () => {
    beforeEach(() => {
      cy.mount(
        <Popover
          children={<button data-cy="button">Click here</button>}
          content={
            <div style={{ width: "12.5rem" }}>
              Popover component!
              <ul>
                <li>Popover element - 1</li>
                <li>Popover element - 2</li>
                <li>Popover element - 3</li>
              </ul>
            </div>
          }
          placement="right"
        />,
      );
    });
    it("should render component", () => {
      pom.root.should("exist");
    });

    it("should display the popover content when the button is clicked", () => {
      cyGet("button").contains("Click here").click();
      pom.el.popoverContent.should("be.visible");
      pom.el.popoverContent.should("contain", "Popover component!");
    });

    it("should hide the popover content when clicking outside", () => {
      cyGet("button").contains("Click here").click();
      pom.el.popoverContent.should("be.visible");
      cy.get("body").click(500, 500, { force: true }); // random click to trigger clickoutside
      pom.el.popoverContent.should("not.exist");
    });

    it("should toggle the popover content visibility on multiple clicks", () => {
      cyGet("button").contains("Click here").click();
      pom.el.popoverContent.should("be.visible");

      // Click the button again to hide the popover
      cyGet("button").contains("Click here").click();
      pom.el.popoverContent.should("not.exist");

      // Click the button again to show the popover
      cyGet("button").contains("Click here").click();
      pom.el.popoverContent.should("be.visible");
    });
  });

  describe("Popover extended functionality", () => {
    it("should render title when provided", () => {
      cy.mount(
        <Popover
          title="Test Title"
          children={<button data-cy="button">Click here</button>}
          content={<div>Popover content</div>}
        />,
      );

      cyGet("button").contains("Click here").click();
      pom.el.popoverContent.should("contain", "Test Title");
    });

    it("should apply custom contentRootClassName", () => {
      cy.mount(
        <Popover
          contentRootClassName="custom-class"
          content={<div>Popover content</div>}
        >
          <button data-cy="button">Click here</button>
        </Popover>,
      );

      cyGet("button").contains("Click here").click();
      pom.el.popoverContent.should("have.class", "custom-class");
    });

    it("should apply custom popoverArrowClassName", () => {
      cy.mount(
        <Popover
          popoverArrowClassName="custom-arrow"
          content={<div>Popover content</div>}
        >
          <button data-cy="button">Click here</button>
        </Popover>,
      );

      cyGet("button").contains("Click here").click();
      cy.get(".popover-arrow").should("have.class", "custom-arrow");
    });

    it("should close popover when clicking the close button", () => {
      cy.mount(
        <Popover content={<div>Popover content</div>}>
          <button data-cy="button">Click here</button>
        </Popover>,
      );

      cyGet("button").contains("Click here").click();
      pom.el.popoverContent.should("be.visible");

      cyGet("closePopover").click();
      pom.el.popoverContent.should("not.exist");
    });
  });
});
