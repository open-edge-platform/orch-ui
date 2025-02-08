/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import DeploymentDetailsHeader from "./DeploymentDetailsHeader";
import { DeploymentDetailsHeaderPom } from "./DeploymentDetailsHeader.pom";

const deploymentDetailsHeaderPom = new DeploymentDetailsHeaderPom();
describe("DeploymentDrilldownHeader component testing", () => {
  it("should render correct title", () => {
    const title = "Hello world!";
    cy.mount(
      <DeploymentDetailsHeader
        headingTitle={title}
        popupOptions={[]}
        dataCy={deploymentDetailsHeaderPom.rootCy}
      />,
    );
    deploymentDetailsHeaderPom.el.deploymentDrilldownHeaderTitle.should(
      "contain.text",
      title,
    );
  });
  it("should render title, when no title is passed", () => {
    cy.mount(
      <DeploymentDetailsHeader
        headingTitle={""}
        popupOptions={[]}
        dataCy={deploymentDetailsHeaderPom.rootCy}
      />,
    );
    deploymentDetailsHeaderPom.el.deploymentDrilldownHeaderTitle.should(
      "contain.text",
      "",
    );
  });
  it("should show a Popup and able to perform onSelect tasks when clicked", () => {
    let clicked1 = false,
      clicked2 = false;
    const options = [
      {
        displayText: "option 1",
        onSelect: () => {
          clicked1 = true;
        },
      },
      {
        displayText: "option 2",
        onSelect: () => {
          clicked2 = true;
        },
      },
    ];

    cy.mount(
      <DeploymentDetailsHeader
        headingTitle={"Hello world!"}
        popupOptions={options}
        dataCy={deploymentDetailsHeaderPom.rootCy}
      />,
    );

    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.contains("Action")
      .click()
      .then(() => {
        // eslint-disable-next-line cypress/unsafe-to-chain-command
        cy.contains("option 2")
          .click()
          .then(() => {
            expect(clicked2).to.be.eq(true, "option 2 is clicked!");
            expect(clicked1).to.be.eq(false, "option 1 is not clicked!");
          });
      });
  });
  it("should work incorrect values, like empty array, passed into popupOptions", () => {
    cy.mount(
      <DeploymentDetailsHeader
        headingTitle={"Hello world!"}
        popupOptions={[]}
        dataCy={deploymentDetailsHeaderPom.rootCy}
      />,
    );
    cy.contains("Action").click();
  });
});
