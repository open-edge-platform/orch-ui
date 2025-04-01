/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { useForm } from "react-hook-form";
import { ApplicationInputs } from "../../../pages/ApplicationCreateEdit/ApplicationCreateEdit";
import ApplicationSource from "./ApplicationSource";
import ApplicationSourcePom from "./ApplicationSource.pom";

let pom: ApplicationSourcePom;
describe("<ApplicationSource />", () => {
  it("should render form items correctly", () => {
    pom = new ApplicationSourcePom("appSourceForm");
    pom.interceptApis([pom.api.registry]);
    const FormWrapper = () => {
      const { control } = useForm<ApplicationInputs>({
        mode: "all",
      });
      const validateVersionFn = () => {};
      return (
        <ApplicationSource
          control={control}
          validateVersionFn={validateVersionFn}
        />
      );
    };
    cy.mount(<FormWrapper />);
    pom.waitForApis();

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500); // This is needed for the Api to substitute the value onto the Helm Registry SIDropdown

    pom.selectHelmRegistryName(pom.registry.resources[0].name);
    pom.el.helmLocationInput.should(
      "have.value",
      pom.registry.resources[0].rootUrl,
    );

    pom.selectChartName(pom.chartName.resources[0].chartName);
    pom.selectChartVersion(pom.chartVersion.resources[0].versions?.[0] ?? "");
  });
});
