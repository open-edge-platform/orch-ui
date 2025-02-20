/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
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
});
