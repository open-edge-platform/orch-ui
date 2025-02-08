/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import {
  packageOneExtension,
  packageThree,
  packageWithParameterTemplates,
} from "@orch-ui/utils";
import { nameErrorMsgForRequired } from "../../../utils/global";
import SetupDeployment from "./SetupDeployment";
import SetupDeploymentPom from "./SetupDeployment.pom";

const pom = new SetupDeploymentPom();

const nameErrorMsgForMaxLength = "Name can't be more than 40 characters.";
const displayNameErrMsgForInvalidCharacter =
  "Name must start and end with a letter or a number. Name can contain spaces, lowercase letter(s), uppercase letter(s), number(s), hyphen(s), slash(es).";

const selectProfileTest = (profileName: string) => {
  pom.selectProfile.root.should("be.visible");
  pom.tableUtils
    .getRowBySearchText(profileName)
    .find("[data-cy='radioButtonCy']")
    .click();
  pom.OverrideProfileValues.interceptApis([
    pom.OverrideProfileValues.api.appSingle,
  ]);
  pom.el.nextBtn.click();
  pom.OverrideProfileValues.waitForApis();
};

const basicOverrideProfileValuesTest = (testProfileIndex: number) => {
  pom.OverrideProfileValues.root.should("be.visible");
  pom.OverrideProfileValues.overrideTable.table
    .getRows()
    .should(
      "have.length",
      packageWithParameterTemplates.applicationReferences.length,
    );
  packageWithParameterTemplates.applicationReferences.forEach((c) => {
    cy.contains(c.name);
    cy.contains(c.version);
    pom.table
      .getCell(1, 4)
      .contains(
        packageWithParameterTemplates.profiles![testProfileIndex]
          .applicationProfiles[c.name],
      );
    pom.table.getCell(1, 5).contains("No");
  });
  pom.OverrideProfileValues.overrideTable.table.expandRow(0);
  pom.OverrideProfileValues.overrideTable.el.parameterOverrideDeploymentForm.should(
    "be.visible",
  );
};

const deploymentAutomaticSetupMetadataTest = () => {
  pom.metadataPom.el.deploymentNameField.type("new-deployment");
  pom.metadataPom.metadataFormPom.getNewEntryInput("Key").type("customer");
  pom.metadataPom.metadataFormPom.getNewEntryInput("Value").type("culvers");
  pom.metadataPom.metadataFormPom.el.add.click();
  pom.metadataPom.metadataFormPom.getNewEntryInput("Key").type("region");
  pom.metadataPom.metadataFormPom.getNewEntryInput("Value").type("new_york");
  pom.metadataPom.metadataFormPom.el.add.click();
  pom.el.nextBtn.click();
};

describe("<SetupDeployment>", () => {
  describe("when step1: composite applications list is provided empty", () => {
    it("should disable Next Button when composite applications empty list", () => {
      pom.interceptApis([
        pom.api.getDeploymentPackagesEmpty,
        pom.api.emptyProjectNetworks,
      ]);
      cy.mount(<SetupDeployment />);
      pom.waitForApis();
      pom.selectPackage.root.should(
        "contain.text",
        "There are no Deployment Packages currently available.",
      );
      pom.el.nextBtn.should("have.attr", "aria-disabled", "true");
    });
  });

  describe("when step1: composite applications list is provided", () => {
    beforeEach(() => {
      pom.interceptApis([
        pom.api.getDeploymentPackagesMocked,
        pom.api.emptyProjectNetworks,
      ]);
      cy.mount(<SetupDeployment />);
      pom.waitForApis();

      pom.selectPackage.root.should("be.visible");
    });
    it("should render", () => {
      pom.root.should("exist");
    });

    it("should disable Next Button before package selection", () => {
      pom.el.nextBtn.should("have.attr", "aria-disabled", "true");
    });

    it("should contain list of multiple deployment package", () => {
      pom.selectPackage.root.find("tbody tr").should("have.length", 6);
    });

    describe("when step2: select a profile on a package with no defaultProfileName", () => {
      beforeEach(() => {
        // Select package
        pom.selectPackage.selectDeploymentPackageByName(packageThree.name);
      });

      it("should disable Next Button when profile table is empty", () => {
        pom.selectProfile.interceptApis([
          pom.selectProfile.api.getApplicationEmpty,
        ]);
        pom.el.nextBtn.click();
        pom.selectProfile.waitForApis();

        pom.selectProfile.emptyPom.el.emptySubTitle.contains(
          "No Deployment Profiles found.",
        );
        pom.el.nextBtn.should("have.attr", "aria-disabled", "true");
      });
    });

    describe("when step:2 select a profile with defaultProfileName", () => {
      beforeEach(() => {
        // Select package
        pom.selectPackage.selectDeploymentPackageByName(
          packageWithParameterTemplates.name,
        );

        // goto select profile
        pom.selectProfile.interceptApis([pom.selectProfile.api.getApplication]);
        pom.el.nextBtn.click();
        pom.selectProfile.waitForApis();
      });
      it("should automatically select the default profile", () => {
        // Check Select profile
        pom.selectProfile.tableUtils
          .getRowBySearchText(packageWithParameterTemplates.defaultProfileName!)
          .find("[data-cy='radioButtonCy']")
          .should("be.checked");
        pom.el.nextBtn.should("have.attr", "aria-disabled", "false");
      });
      describe("w/o override parameter", () => {
        beforeEach(() => {
          // Step 2: Select a Profile
          selectProfileTest("low-perf");

          // Step 3: Override Profile Values
          basicOverrideProfileValuesTest(0);
        });

        it("should see no parameter templates available", () => {
          pom.OverrideProfileValues.overrideTable.el.parameterOverrideDeploymentForm
            .children()
            .should("contain.text", "No parameter templates available");
        });

        describe("with automatic deployment type", () => {
          beforeEach(() => {
            pom.el.nextBtn.click();
            // Step 4: Select Type
            pom.selectType.radioCardAutomatic.root
              .find(".spark-radio-button")
              .click();
            pom.el.nextBtn.click();
          });
          it("should deploy a package ", () => {
            // Step 5: Fill Inputs
            deploymentAutomaticSetupMetadataTest();

            // Step 6: Review
            pom.reviewPom.el.applicationPackage.should(
              "contain.text",
              "DP with Template",
            );
            pom.reviewPom.el.deployment.should(
              "contain.text",
              "new-deployment",
            );
            pom.reviewPom.el.profile.should("contain.text", "low-perf");
            [
              ["customer", "culvers"],
              ["region", "new_york"],
            ].map(([key, value], index) => {
              const row = pom.reviewPom.table.root.find(`tr:eq(${index + 1})`);
              row
                .find("td:first-child")
                .should("contain.text", key)
                .siblings()
                .should("contain.text", value);
            });
            pom.interceptApis([pom.api.postDeploymentMocked]);
            pom.el.nextBtn.click();
            pom.waitForApis();

            cy.get("#pathname").contains("/applications/deployments");
          });

          it("should show invalid name for name with symbols", () => {
            pom.metadataPom.el.deploymentNameField.type("$systemInfo();//");
            pom.metadataPom.deploymentNameTextField.contains(
              displayNameErrMsgForInvalidCharacter,
            );
          });
          it("should show invalid name when max length is reached", () => {
            pom.metadataPom.el.deploymentNameField.type(
              "deploymentklkjlkjlkjkjlkjljljljljljljljl",
            );
            pom.metadataPom.deploymentNameTextFieldInvalidIndicator.should(
              "not.exist",
            );
            pom.metadataPom.el.deploymentNameField.type("k");
            pom.metadataPom.deploymentNameTextField.contains(
              nameErrorMsgForMaxLength,
            );
          });
          it("should validate name by provided input", () => {
            pom.metadataPom.el.deploymentNameField.type("-hello");
            pom.metadataPom.deploymentNameTextField.contains(
              displayNameErrMsgForInvalidCharacter,
            );

            pom.metadataPom.el.deploymentNameField.clear().type("hello");
            pom.metadataPom.deploymentNameTextFieldInvalidIndicator.should(
              "not.exist",
            );

            pom.metadataPom.el.deploymentNameField.type("/");
            pom.metadataPom.deploymentNameTextField.contains(
              displayNameErrMsgForInvalidCharacter,
            );

            pom.metadataPom.el.deploymentNameField.type("Host");
            pom.metadataPom.deploymentNameTextFieldInvalidIndicator.should(
              "not.exist",
            );

            pom.metadataPom.el.deploymentNameField.type("-");
            pom.metadataPom.deploymentNameTextField.contains(
              displayNameErrMsgForInvalidCharacter,
            );
          });
          it("should show required when input name entered is deleted", () => {
            pom.metadataPom.el.deploymentNameField.type("Hello World/hello-1");
            pom.metadataPom.deploymentNameTextFieldInvalidIndicator.should(
              "not.exist",
            );

            pom.metadataPom.el.deploymentNameField.clear();
            pom.metadataPom.deploymentNameTextFieldInvalidIndicator.should(
              "exist",
            );
            pom.metadataPom.deploymentNameTextField.contains(
              nameErrorMsgForRequired,
            );
          });
        });

        // TODO: Test steps on Manual Deployment
      });

      describe("with override parameter", () => {
        beforeEach(() => {
          // Step 2: Select a Profile
          selectProfileTest("high-perf");

          // Step 3: Override Profile Values
          basicOverrideProfileValuesTest(1);

          pom.OverrideProfileValues.overrideTable.overrideForm.table
            .getRows()
            .eq(0)
            .find(".spark-combobox input")
            .should("not.be.disabled");

          pom.OverrideProfileValues.overrideTable.overrideForm.table
            .getRows()
            .eq(0)
            .find(".spark-combobox input")
            .clear();

          pom.OverrideProfileValues.overrideTable.overrideForm.table
            .getRows()
            .eq(0)
            .find(".spark-combobox input")
            .type("222");
        });

        it(
          "should verify change in profile override column",
          {
            retries: {
              runMode: 5,
              openMode: 5,
            },
          },
          () => {
            pom.root.click(1, 1);
            packageWithParameterTemplates.applicationReferences.forEach(() => {
              pom.root.click(10, 10);
              pom.table.getCell(1, 5).contains("Yes");
            });
          },
        );

        it(
          "should deploy a package with automatic deployment type",
          {
            retries: {
              runMode: 5,
              openMode: 5,
            },
          },
          () => {
            pom.el.nextBtn.click();

            // Step 4: Select Type
            pom.selectType.radioCardAutomatic.root
              .find(".spark-radio-button")
              .click();
            pom.el.nextBtn.click();

            // Step 5: Fill Metadata Inputs
            deploymentAutomaticSetupMetadataTest();

            // Step 6: Review
            pom.reviewPom.el.applicationPackage.should(
              "contain.text",
              "DP with Template",
            );
            pom.reviewPom.el.deployment.should(
              "contain.text",
              "new-deployment",
            );
            pom.reviewPom.el.profile.should("contain.text", "high-perf");
            [
              ["customer", "culvers"],
              ["region", "new_york"],
            ].map(([key, value], index) => {
              const row = pom.reviewPom.table.root.find(`tr:eq(${index + 1})`);
              row
                .find("td:first-child")
                .should("contain.text", key)
                .siblings()
                .should("contain.text", value);
            });

            pom.interceptApis([pom.api.postDeploymentMocked]);
            pom.el.nextBtn.click().as("postClick");
            //To avoid mutliple deploy request , Check if deploy button is disabled after click
            cy.get("@postClick").should("have.attr", "aria-disabled", "true");
            pom.waitForApis();

            cy.get(`@${pom.api.postDeploymentMocked}`)
              .its("request.body")
              .should("deep.include", {
                appName: "DP with Template",
                appVersion: "1.0.0-dev",
                profileName: "high-perf",
                targetClusters: [
                  {
                    appName: "llama2",
                    labels: {
                      customer: "culvers",
                      region: "new_york",
                    },
                  },
                ],
                displayName: "new-deployment",
                deploymentType: "auto-scaling",
                overrideValues: [
                  {
                    appName: "llama2",
                    values: {
                      cores: "222",
                    },
                  },
                ],
              });

            cy.get("#pathname").contains("/applications/deployments");
          },
        );
      });
    });
  });

  describe("with project networks (interconnect)", () => {
    beforeEach(() => {
      pom.interceptApis([
        pom.api.getDeploymentPackagesMocked,
        pom.api.getProjectNetworks,
      ]);
      cy.mount(<SetupDeployment />);
      pom.waitForApis();

      pom.selectPackage.root.should("be.visible");
    });

    it("should render", () => {
      pom.root.should("exist");
    });

    describe("get to network interconnect step", () => {
      beforeEach(() => {
        pom.selectPackage.selectDeploymentPackageByName(packageThree.name);
        pom.interceptApis([pom.api.getDeploymentPackageSingleMocked]);
        pom.el.nextBtn.click();
        pom.waitForApis();

        selectProfileTest("low-perf");
        pom.el.nextBtn.click();
      });

      it("select no network", () => {
        pom.networkInterconnect.selectNetwork("None");
        pom.el.nextBtn.click();
        pom.selectType.radioCardAutomatic.root
          .find(".spark-radio-button")
          .click();
        pom.el.nextBtn.click();
        deploymentAutomaticSetupMetadataTest();
        pom.interceptApis([pom.api.postDeploymentMocked]);
        pom.el.nextBtn.click();
        pom.waitForApis();

        cy.get(`@${pom.api.postDeploymentMocked}`)
          .its("request.body")
          .should("deep.include", {
            appName: "smart-checkout-package",
            appVersion: "0.0.1",
            networkName: "",
            serviceExports: [],
          });

        cy.get("#pathname").contains("/applications/deployments");
      });

      it("select existing network", () => {
        pom.networkInterconnect.selectNetwork("Network two");
        pom.networkInterconnect.table
          .getRow(1)
          .find("[data-cy='rowSelectCheckbox']")
          .click();
        pom.el.nextBtn.click();

        pom.selectType.radioCardAutomatic.root
          .find(".spark-radio-button")
          .click();
        pom.el.nextBtn.click();
        deploymentAutomaticSetupMetadataTest();
        pom.interceptApis([pom.api.postDeploymentMocked]);
        pom.el.nextBtn.click();
        pom.waitForApis();

        cy.get(`@${pom.api.postDeploymentMocked}`)
          .its("request.body")
          .should("deep.include", {
            appName: "smart-checkout-package",
            appVersion: "0.0.1",
            networkName: "Network two",
            serviceExports: [
              { appName: "postgres", enabled: true },
              { appName: "nginx", enabled: false },
              { appName: "librespeed", enabled: false },
              { appName: "console", enabled: false },
              { appName: "inference-engine", enabled: false },
              { appName: "wordpress", enabled: false },
            ],
          });

        cy.get("#pathname").contains("/applications/deployments");
      });
    });

    it("should hide interconnect step for extensions", () => {
      pom.el.stepper
        .find("li[text='Network Interconnect']")
        .its("length")
        .should("eq", 1);
      pom.selectPackage.selectDeploymentPackageByName(packageOneExtension.name);
      pom.el.stepper
        .find("li[text='Network Interconnect']")
        .should("not.exist");
    });
  });
});
