/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { profileOne } from "@orch-ui/utils";
import ApplicationDetailsProfilesInfoSubRow from "./ApplicationDetailsProfilesInfoSubRow";
import ApplicationDetailsProfilesInfoSubRowPom from "./ApplicationDetailsProfilesInfoSubRow.pom";

const pom = new ApplicationDetailsProfilesInfoSubRowPom();
describe("<ApplicationDetailsProfilesInfoSubRow/>", () => {
  beforeEach(() => {
    cy.mount(<ApplicationDetailsProfilesInfoSubRow profile={profileOne} />);
  });
  it("should render component", () => {
    pom.root.should("exist");
    pom.getAllParameters().should("have.length", 4);
  });
  it("should substitute the value and type of a parameter template", () => {
    pom
      .getParameterValueByParameterName("image.containerDisk.pullSecret")
      .find("button")
      .should("contain.text", "value1, value2, value3");
    pom
      .getParameterTypeByParameterName("image.containerDisk.pullSecret")
      .should("have.value", "Required");
  });

  it("should render no parameter templates", () => {
    cy.mount(
      <ApplicationDetailsProfilesInfoSubRow
        profile={{
          ...profileOne,
          parameterTemplates: undefined,
        }}
      />,
    );
    pom.root.should("exist");
    pom.el.valueOverrides.should("not.exist");
  });
});
