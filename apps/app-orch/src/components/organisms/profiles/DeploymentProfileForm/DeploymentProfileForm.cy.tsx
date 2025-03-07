/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */
import { packageWithParameterTemplates } from "@orch-ui/utils";
import DeploymentProfileForm, {
  DeploymentProfileFormProps,
} from "./DeploymentProfileForm";
import DeploymentProfileFormPom from "./DeploymentProfileForm.pom";

const pom = new DeploymentProfileFormPom();

describe("<DeploymentProfileForm />", () => {
  it("Should show the Applications table with mock data", () => {
    const defaultProps: DeploymentProfileFormProps = {
      selectedPackage: packageWithParameterTemplates,
      selectedProfile: packageWithParameterTemplates.profiles![1],
      onOverrideValuesUpdate: cy.spy(),
      overrideValues: {},
    };
    pom.interceptApis([pom.api.appSingle]);
    cy.mount(<DeploymentProfileForm {...defaultProps} />);
    pom.waitForApis();
    pom.root.should("be.visible");
    pom.table.getRows().should("have.length", 1);
  });
  it("should render an error message if misconfigured", () => {
    cy.mount(
      <DeploymentProfileForm
        selectedPackage={undefined}
        selectedProfile={undefined}
        onOverrideValuesUpdate={cy.spy()}
        overrideValues={{}}
      />,
    );
    pom.el.DeploymentProfileFormError.should("be.visible");
  });
});
