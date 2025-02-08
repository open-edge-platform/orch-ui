/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { applicationFormValues } from "@orch-ui/utils";
import { useForm } from "react-hook-form";
import { ApplicationInputs } from "../../../pages/ApplicationCreateEdit/ApplicationCreateEdit";
import ApplicationForm from "./ApplicationForm";
import ApplicationFormPom from "./ApplicationForm.pom";

let pom: ApplicationFormPom;
describe("<ApplicationForm />", () => {
  it("should render form items correctly", () => {
    pom = new ApplicationFormPom("appForm");
    const FormWrapper = () => {
      const {
        control,
        formState: { errors },
      } = useForm<ApplicationInputs>({
        mode: "all",
      });
      return <ApplicationForm control={control} errors={errors} />;
    };
    cy.mount(<FormWrapper />);

    pom.el.nameInput.should("be.disabled");
    pom.el.versionInput.should("be.disabled");

    pom.el.descriptionInput
      .find("textarea")
      .type(applicationFormValues.description || "testing description");
  });
});
