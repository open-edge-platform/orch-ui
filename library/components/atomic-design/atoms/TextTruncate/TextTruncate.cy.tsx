/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { TextTruncate } from "./TextTruncate";
import { TextTruncatePom } from "./TextTruncate.pom";

const pom = new TextTruncatePom();
describe("<TextTruncate/>", () => {
  describe("truncation functionality", () => {
    const alpha = "abcdefghijklmnopqrstuvwxyz";
    beforeEach(() => {
      cy.mount(<TextTruncate id="abc" maxLength={20} text={alpha} />);
    });

    it("should truncate text when it exceeds maxLength", () => {
      pom.root.should("exist");
      pom.el.content.should("not.contain.text", alpha);
      pom.el.content.should("contain.text", alpha.slice(0, 20));
    });

    it("should display read more link", () => {
      pom.el.label.should("be.visible");
      pom.el.label.should("contain.text", "Read more");
    });

    it("should display read less link", () => {
      pom.el.label.click();
      pom.el.label.should("contain.text", "Read less");
    });

    it("should show full text after read more click", () => {
      pom.el.label.click();
      pom.el.content.should("contain.text", alpha);
    });

    it("should hide read more", () => {
      cy.mount(
        <TextTruncate id="abc" maxLength={20} text={alpha} hideReadMore />,
      );
      pom.el.content.should("contain.text", alpha.slice(0, 20));
      pom.el.label.should("not.exist");
    });
  });

  describe("not truncated functionality", () => {
    it("should not render more/less when text is below maxLength", () => {
      const alpha = "abcdefghijklmno";
      cy.mount(<TextTruncate id="abc" maxLength={20} text={alpha} />);
      pom.el.checkbox.should("not.exist");
      pom.el.content.should("not.exist");
      pom.el.label.should("not.exist");
      pom.root.contains(alpha);
    });
  });
});
