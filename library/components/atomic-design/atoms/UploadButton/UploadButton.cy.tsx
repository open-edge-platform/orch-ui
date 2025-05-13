/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */
import { ButtonVariant } from "@spark-design/tokens";
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
  it("set accept attribute correctly", () => {
    cy.mount(<UploadButton onChange={() => {}} accept=".png,.jpg" />);
    pom.el.uploadInput.should("have.attr", "accept", ".png,.jpg");
  });
  it("set multiple to false", () => {
    cy.mount(<UploadButton onChange={() => {}} multiple={false} />);
    pom.el.uploadInput.should("not.have.attr", "multiple");
  });
  it("render with alert variant", () => {
    cy.mount(
      <UploadButton onChange={() => {}} variant={ButtonVariant.Alert}/>
    );
    pom.el.uploadBtn.should("have.class", "spark-button-alert");
  });
  it("render with custom dataCy", () => {
    const customCy = "myUploadButton";
    cy.mount(<UploadButton onChange={() => {}} dataCy={customCy} />);
    cy.get(`[data-cy=${customCy}]`).should("exist");
  });
  it("render custom button text", () => {
    cy.mount(<UploadButton onChange={() => {}} text="Upload Documents" />);
    pom.el.uploadBtn.contains("Upload Documents");
  });
  it("add folder-specific attributes for folder input", () => {
    cy.mount(<UploadButton onChange={() => {}} type="folder" />);
    cy.get('[data-cy="uploadInput"]').should(($input) => {
      expect($input).to.have.attr("webkitdirectory");
      expect($input).to.have.attr("directory");
      expect($input).to.have.attr("mozdirectory");
      expect($input).to.have.attr("msdirectory");
      expect($input).to.have.attr("odirectory");
    });
  });
  it("not add folder attributes if type is file", () => {
    cy.mount(<UploadButton onChange={() => {}} type="file" />);
    cy.get('[data-cy="uploadInput"]').should(($input) => {
      expect($input).not.to.have.attr("webkitdirectory");
      expect($input).not.to.have.attr("directory");
      expect($input).not.to.have.attr("mozdirectory");
      expect($input).not.to.have.attr("msdirectory");
      expect($input).not.to.have.attr("odirectory");
    });
  });
  
});
