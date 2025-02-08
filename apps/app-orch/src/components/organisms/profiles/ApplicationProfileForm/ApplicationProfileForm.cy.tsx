/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import {
  AdvancedSettingsTogglePom,
  ReactHookFormComboboxPom,
} from "@orch-ui/components";
import { profileFormValues } from "@orch-ui/utils";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { store } from "../../../../store";
import { ProfileInputs } from "../../../pages/ApplicationCreateEdit/ApplicationCreateEdit";
import ParameterOverridesFormPom from "../ParameterOverridesForm/ParameterOverridesForm.pom";
import ApplicationProfileForm from "./ApplicationProfileForm";
import ApplicationProfileFormPom from "./ApplicationProfileForm.pom";

const pom = new ApplicationProfileFormPom();
const advSettingsPom = new AdvancedSettingsTogglePom();
const selectPom = new ReactHookFormComboboxPom("paramSelect");
const paramsPom = new ParameterOverridesFormPom();

const nameInvalidCharsMessage =
  "Name must start and end with a letter or a number. Name can contain lowercase letter(s), uppercase letter(s), number(s), hyphen(s).";

describe("<ApplicationProfileForm />", () => {
  beforeEach(() => {
    const FormWrapper = () => {
      const {
        control: control,
        formState: { errors },
      } = useForm<ProfileInputs>({
        mode: "all",
      });
      const [yamlHasError, setYamlHasError] = useState<boolean>(false);
      const [, setParamsOverrideHasError] = useState<boolean>(false);
      return (
        <ApplicationProfileForm
          show={true}
          control={control}
          errors={errors}
          setYamlHasError={setYamlHasError}
          setParamsOverrideHasError={setParamsOverrideHasError}
          yamlHasError={yamlHasError}
        />
      );
    };
    cy.mount(<FormWrapper />, { reduxStore: store });
  });

  it("should render form items correctly", () => {
    pom.el.nameInput.type("testing-name");
    pom.el.nameInput.clear();
    cy.contains("Name is required");

    pom.el.nameInput.clear();
    pom.el.nameInput.type("namethatistoolongtobegoodandvalid");
    cy.contains("Name can't be more than 26 characters.");

    pom.el.nameInput.clear();
    pom.el.nameInput.type("namewithshash/");
    cy.contains(nameInvalidCharsMessage);

    pom.el.nameInput.clear();
    pom.el.nameInput.type("endswithnotallowedchar...");
    cy.contains(nameInvalidCharsMessage);

    pom.el.nameInput.clear();
    pom.el.nameInput.type(profileFormValues.displayName || "testing");

    pom.el.chartValuesInput.find("textarea").type("specSchema: 'Publisher");
    cy.contains("Invalid chart values");
    pom.el.chartValuesInput.find("textarea").clear();
    pom.el.chartValuesInput
      .find("textarea")
      .type(profileFormValues.chartValues || "specSchema: 'Publisher'");

    pom.el.descriptionInput
      .find("textarea")
      .type(profileFormValues.description || "");
  });

  it("should generate parameters from yaml to override", () => {
    pom.el.nameInput.type("testing-name");
    pom.el.chartValuesInput.find("textarea").clear();
    pom.el.chartValuesInput
      .find("textarea")
      .type(
        "specSchema: 'Publisher'\ntestArray:\n  - one\n  - two\nnested:\n  prop: 1",
      );

    advSettingsPom.el.advSettingsTrue.click({ force: true });

    selectPom.selectComboboxItem(1);
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000); //Need to make sure combobox is open before proceeding
    selectPom.getInput().should("have.value", "testArray");
    paramsPom.el.displayName.type("name").blur();
    paramsPom.root.should("not.contain.text", "Unique name required");
  });

  it("should display warning on change contents of yaml", () => {
    pom.el.chartValuesInput.find("textarea").clear();
    pom.el.chartValuesInput.find("textarea").type("test: 1");
    advSettingsPom.el.advSettingsTrue.click({ force: true });
    pom.el.chartValuesInput.find("textarea").type("2");
    cy.get('[data-cy="confirmBtn"]').click();
    advSettingsPom.el.advSettingsFalse.should("be.checked");
  });
});
