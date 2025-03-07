/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */
import { deploymentProfileTwo, packageFour } from "@orch-ui/utils";
import SelectProfileTable, {
  ProfileColumns,
  SelectProfileTableProps,
} from "./SelectProfileTable";
import { SelectProfileTablePom } from "./SelectProfileTable.pom";

const defaultProps: SelectProfileTableProps = { selectedPackage: packageFour };

const allColumns: ProfileColumns[] = [
  "Select",
  "Profile Name",
  "Description",
  " ",
];
const pom = new SelectProfileTablePom();
describe("<SelectProfileTable/>", () => {
  it("should show all the columns", () => {
    pom.interceptApis([pom.api.getApplication]);
    cy.mount(<SelectProfileTable {...defaultProps} />);
    pom.waitForApis();
    pom.tableUtils.getColumns().should("have.length", allColumns.length);
  });

  it("should display proper message when table is empty", () => {
    pom.interceptApis([pom.api.getApplicationEmpty]);
    cy.mount(<SelectProfileTable {...defaultProps} />);
    pom.waitForApis();
    pom.emptyPom.el.emptySubTitle.contains("No Deployment Profiles found.");
  });

  it("shows the default tag", () => {
    pom.interceptApis([pom.api.getApplication]);
    cy.mount(<SelectProfileTable {...defaultProps} />);
    pom.waitForApis();
    pom.tableUtils
      .getRowBySearchText(
        defaultProps.selectedPackage?.defaultProfileName ?? "dep-profile-1",
      )
      .find(".spark-tag")
      .contains("Default");
  });

  it("should display error message", () => {
    pom.interceptApis([pom.api.getApplicationError]);
    cy.mount(<SelectProfileTable {...defaultProps} />);
    pom.waitForApis();
    pom.getMessageBannerTitle().contains("Error Fetching deployment Profiles");
  });

  it("should select the provided profile", () => {
    pom.interceptApis([pom.api.getApplication]);
    cy.mount(
      <SelectProfileTable
        selectedPackage={packageFour}
        selectedProfile={deploymentProfileTwo}
      />,
    );
    pom.waitForApis();
    pom.tableUtils
      .getRowBySearchText(deploymentProfileTwo.name)
      .find("[data-cy='radioButtonCy']")
      .should("be.checked");
  });

  it("should invoke the onSelect when a profile is selected", () => {
    pom.interceptApis([pom.api.getApplication]);
    cy.mount(
      <SelectProfileTable
        selectedPackage={packageFour}
        selectedProfile={deploymentProfileTwo}
        onProfileSelect={cy.stub().as("onSelect")}
      />,
    );
    pom.waitForApis();
    pom.tableUtils
      .getRowBySearchText(deploymentProfileTwo.name)
      .find("[data-cy='radioButtonCy']")
      .click();
    cy.get("@onSelect").should(
      "have.been.calledOnceWith",
      deploymentProfileTwo,
    );
  });
});
