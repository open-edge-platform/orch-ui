/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { UploadButton } from "./UploadButton";
import { UploadButtonPom } from "./UploadButton.pom";

const pom = new UploadButtonPom("uploadButton");
describe("<UploadButton/> should", () => {
  it("render upload component", () => {
    cy.mount(<UploadButton onChange={() => {}} />);
    pom.el.uploadBtn.click();
    pom.el.uploadInput.should("not.be.visible");
    pom.root.should("be.visible");
  });
  it("disable upload component", () => {
    cy.mount(<UploadButton onChange={() => {}} disabled />);
    pom.el.uploadBtn.should("have.class", "spark-button-disabled");
    pom.el.uploadInput.should("be.disabled");
    pom.root.should("be.visible");
  });
});
