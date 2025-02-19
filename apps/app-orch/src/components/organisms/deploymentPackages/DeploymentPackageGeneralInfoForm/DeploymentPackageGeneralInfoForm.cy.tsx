/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { packageOne } from "@orch-ui/utils";
import { useForm } from "react-hook-form";
import { setupStore } from "../../../../store";
import { nameErrorMsgForRequired } from "../../../../utils/global";
import { PackageInputs } from "../DeploymentPackageCreateEdit/DeploymentPackageCreateEdit";
import DeploymentPackageGeneralInfoForm from "./DeploymentPackageGeneralInfoForm";
import DeploymentPackageGeneralInfoFormPom from "./DeploymentPackageGeneralInfoForm.pom";

// wrap original component to use hook
const WrapperComponent = () => {
  const {
    control,
    formState: { errors },
  } = useForm<PackageInputs>({
    mode: "all",
    defaultValues: {
      name: packageOne.displayName,
      version: packageOne.version,
    },
  });
  return (
    <DeploymentPackageGeneralInfoForm
      control={control}
      mode="add"
      errors={errors}
    />
  );
};

const pom = new DeploymentPackageGeneralInfoFormPom();

const nameErrorMsgForMaxLength = "Name can't be more than 40 characters.";
const displayNameErrMsgForInvalidCharacter =
  "Name must start and end with a letter or a number. Name can contain spaces, lowercase letter(s), uppercase letter(s), number(s), hyphen(s), slash(es).";

describe("<DeploymentPackageGeneralInfoForm />", () => {
  beforeEach(() => {
    const store = setupStore({
      deploymentPackage: { ...packageOne },
    });
    cy.mount(<WrapperComponent />, {
      routerProps: { initialEntries: ["/packages/create"] },
      routerRule: [
        {
          path: "/packages/create",
          element: <WrapperComponent />,
        },
      ],
      reduxStore: store,
    });
  });
  it("should render the ca creation table", () => {
    pom.el.name.should("have.attr", "value", packageOne.name);
    pom.el.version.should("have.attr", "value", packageOne.version);
    pom.el.desc.contains(packageOne?.description ?? "");
  });
  describe("should validate name", () => {
    beforeEach(() => {
      pom.el.name.clear();
    });
    it("should show invalid name for name with symbols", () => {
      pom.el.name.type("$systemInfo();//");
      pom.nameTextField.contains(displayNameErrMsgForInvalidCharacter);
    });
    it("should show invalid name when max length is reached", () => {
      pom.el.name.type("deploymentklkjlkjlkjkjlkjljljljljljljljl");
      pom.nameTextInvalidIndicator.should("not.exist");
      pom.el.name.type("k");
      pom.nameTextField.contains(nameErrorMsgForMaxLength);
    });
    it("should validate name by provided input", () => {
      pom.el.name.type("-hello");
      pom.nameTextField.contains(displayNameErrMsgForInvalidCharacter);

      pom.el.name.clear().type("hello");
      pom.nameTextInvalidIndicator.should("not.exist");

      pom.el.name.type("-");
      pom.nameTextField.contains(displayNameErrMsgForInvalidCharacter);

      pom.el.name.clear().type("1");
      pom.nameTextInvalidIndicator.should("not.exist");
    });
    it("should show required when input name entered is deleted", () => {
      pom.el.name.type("hello-1");
      pom.nameTextInvalidIndicator.should("not.exist");

      pom.el.name.clear();
      pom.nameTextInvalidIndicator.should("exist");
      pom.nameTextField.contains(nameErrorMsgForRequired);
    });
  });
});
