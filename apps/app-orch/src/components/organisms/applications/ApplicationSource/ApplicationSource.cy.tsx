/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { useForm } from "react-hook-form";
import { ApplicationInputs } from "../../../pages/ApplicationCreateEdit/ApplicationCreateEdit";
import ApplicationSource from "./ApplicationSource";
import ApplicationSourcePom from "./ApplicationSource.pom";

// Add tests for various versionPattern values
const validVersions = ["1.0.0", "v0.1.2", "0.0.1", "1.0.0-rc1", "1.0.0-pre-rc1", "v2.1.3-alpha-beta"];
const invalidVersions = ["1", "abc", "1.0", "1.0.0.0", "v"];

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
  describe("verify chart versions", () => {
    beforeEach(() => {
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
      cy.wait(500);

      pom.selectHelmRegistryName(pom.registry.resources[0].name);
      pom.selectChartName(pom.chartName.resources[0].chartName);
    });
    validVersions.forEach((version) => {
      it(`should accept valid versionPattern: "${version}"`, () => {
        // Type version and check for valid state

        pom.el.chartVersionCombobox.first().type(version);
        cy.contains("Invalid version").should("not.exist");
      });
    });

    invalidVersions.forEach((version) => {
      it(`should reject invalid versionPattern: "${version}"`, () => {
        pom.el.chartVersionCombobox.first().type(version);
        cy.contains("Invalid version").should("exist");
      });
    });
  });
});
