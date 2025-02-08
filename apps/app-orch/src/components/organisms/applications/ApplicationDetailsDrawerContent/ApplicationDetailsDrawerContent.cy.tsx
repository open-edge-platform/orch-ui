/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { applicationOne, profileOne } from "@orch-ui/utils";
import ApplicationDetailsDrawerContent from "./ApplicationDetailsDrawerContent";
import ApplicationDetailsDrawerContentPom from "./ApplicationDetailsDrawerContent.pom";

const appDrawerContentPom = new ApplicationDetailsDrawerContentPom();

describe("<ApplicationDetailsDrawerContent />", () => {
  const testTableRow = (matchCellValues: string[]) => {
    const row = appDrawerContentPom.profileTableUtils.getRowBySearchText(
      matchCellValues[0],
    );
    // Match cell values one by one from the first cell in a row
    matchCellValues.forEach((cellValue) => {
      row.should("contain.text", cellValue);
    });
  };

  it("should render the component provided complete application", () => {
    cy.mount(<ApplicationDetailsDrawerContent application={applicationOne} />);

    // Application Details
    appDrawerContentPom.el.appName.should(
      "have.text",
      applicationOne.displayName || applicationOne.name,
    );
    appDrawerContentPom.el.appVersion.should(
      "have.text",
      applicationOne.version,
    );
    appDrawerContentPom.el.helmRegistryName.should(
      "have.text",
      applicationOne.helmRegistryName,
    );
    appDrawerContentPom.el.chartName.should(
      "have.text",
      applicationOne.chartName,
    );
    appDrawerContentPom.el.chartVersion.should(
      "have.text",
      applicationOne.chartVersion,
    );
    appDrawerContentPom.el.description.should(
      "have.text",
      applicationOne.description,
    );

    // Profiles table
    testTableRow([profileOne.name, profileOne.description ?? "", "Default"]);
  });

  it("should render the component provided multiple profiles", () => {
    cy.mount(
      <ApplicationDetailsDrawerContent
        application={{
          name: "",
          version: "",
          chartName: "",
          chartVersion: "",
          helmRegistryName: "",
          profiles: [
            {
              name: "profileOne",
              description: "profileOne description!",
            },
            {
              name: "profileTwo",
              description: "profileTwo description!",
            },
            {
              name: "profileThree",
              description: "profileThree description!",
            },
          ],
          defaultProfileName: "profileTwo",
        }}
      />,
    );

    // Profiles table
    testTableRow(["profileOne", "profileOne description!", ""]);
    testTableRow(["profileTwo", "profileTwo description!", "Default"]);
    testTableRow(["profileThree", "profileThree description!", ""]);
  });

  it("should render the component provided minimal application", () => {
    cy.mount(
      <ApplicationDetailsDrawerContent
        application={{
          name: "",
          version: "",
          chartName: "",
          chartVersion: "",
          helmRegistryName: "",
        }}
      />,
    );

    // Application Details
    appDrawerContentPom.el.appName.should(
      "have.text",
      "No application name provided!",
    );
    appDrawerContentPom.el.appVersion.should(
      "have.text",
      "No application version provided!",
    );
    appDrawerContentPom.el.helmRegistryName.should(
      "have.text",
      "No Registry Name provided!",
    );
    appDrawerContentPom.el.chartName.should(
      "have.text",
      "No Chart name provided!",
    );
    appDrawerContentPom.el.chartVersion.should(
      "have.text",
      "No Chart version provided!",
    );
    appDrawerContentPom.el.description.should(
      "have.text",
      "No Description provided!",
    );

    // Profiles table
    appDrawerContentPom.profileTable.root.should(
      "contain.text",
      "No Applications Profiles found",
    );
  });
});
