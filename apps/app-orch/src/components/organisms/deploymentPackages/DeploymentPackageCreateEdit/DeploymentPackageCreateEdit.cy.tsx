/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { catalog } from "@orch-ui/apis";
import { applicationOne, packageOne } from "@orch-ui/utils";
import { setupStore } from "../../../../store";
import DeploymentPackageCreateEdit, {
  noProfileErrorMessage,
  removeEmptyApplicationProfiles,
} from "./DeploymentPackageCreateEdit";
import DeploymentPackageCreateEditPom from "./DeploymentPackageCreateEdit.pom";

const pom = new DeploymentPackageCreateEditPom();

describe("<DeploymentPackageCreateEdit />", () => {
  const mountComponent = (component: JSX.Element, reduxStore: any) => {
    cy.mount(component, {
      routerProps: {
        initialEntries: [
          `/packages/edit/${packageOne.name}/version/${packageOne.version}`,
        ],
      },
      routerRule: [
        {
          path: "/packages/edit/:name/version/:version",
          element: component,
        },
      ],
      reduxStore,
    });
  };

  describe("function removeEmptyApplicationProfiles", () => {
    it("should remove invalid profiles", () => {
      const deploymentPackage: catalog.DeploymentPackage = {
        applicationReferences: [],
        artifacts: [],
        extensions: [],
        name: "",
        version: "",
        profiles: [
          {
            applicationProfiles: { a: noProfileErrorMessage },
            name: "",
          },
        ],
      };
      const { profiles } = removeEmptyApplicationProfiles(deploymentPackage);
      const { applicationProfiles } = profiles[0];
      return expect(applicationProfiles).to.be.empty;
    });
  });

  // <DeploymentPackageCreateEdit mode="add" />
  describe("when the component is used as deployment package create", () => {
    beforeEach(() => {
      mountComponent(
        <DeploymentPackageCreateEdit mode="add" />,
        setupStore({
          deploymentPackage: {
            ...packageOne,
            name: "package-1",
            displayName: "package-1",
            isDeployed: false,
            profiles: undefined,
            applicationReferences: [],
          },
        }),
      );
    });

    describe("on the general info step", () => {
      /* TODO: refactor and add component test for existance of general info form component and store save. here... */
      // it("should see the general info component", ()=>{ pom.componentGeneralInfoPom.root.should("exist"); })
      // it("should save the general info to redux store", ()=>{/* check the redux store for deployment package */})

      // CA applications selection step general test
      describe("on the select application step", () => {
        beforeEach(() => {
          pom.appTablePom.interceptApis([
            pom.appTablePom.api.appMultipleListPage1,
          ]);
          pom.clickNextOnStep(0);
        });

        it("should goto add application page", () => {
          pom.appTablePom.root.should("exist");
          pom.appTablePom.el.newAppRibbonButton.click();
          pom.getPath().should("eq", "/applications/applications/add");
        });

        it("should see the application step component", () => {
          pom.appTablePom.root.should("exist");
          pom.el.step1NextBtn.should("have.class", "spark-button-disabled");
        });

        it("selections between page change must not affect each other's save", () => {
          mountComponent(
            <DeploymentPackageCreateEdit mode="update" />,
            setupStore({
              deploymentPackage: {
                ...packageOne,
                name: "package-1",
                displayName: "package-1",
                isDeployed: false,

                // Preselected applications
                applicationReferences: [
                  {
                    ...applicationOne,
                    name: "application-2",
                  },
                ],
              },
            }),
          );

          pom.appTablePom.interceptApis([
            pom.appTablePom.api.appMultipleListPage1,
          ]);
          pom.clickNextOnStep(0);
          pom.waitForApis();

          // Change in page 1 (Deselect an app)
          pom.appTablePom.table.getPageButton(1).click();
          pom.appTablePom.getNthCheckBox(3).click();
          pom.appTablePom.getNthCheckBox(3).should("not.be.checked");

          // Change in page 2 (Select an app in same row)
          pom.appTablePom.interceptApis([
            pom.appTablePom.api.appMultipleListPage2,
          ]);
          pom.appTablePom.table.getPageButton(2).click();
          pom.appTablePom.waitForApis();
          pom.appTablePom.tableUtils
            .getRowBySearchText("Application 12")
            .find(".spark-table-rows-select-checkbox")
            .click();
          pom.appTablePom.getNthCheckBox(3).should("be.checked");

          // Check app selection retain in page 1
          pom.appTablePom.table.getPageButton(1).click();
          pom.appTablePom.getNthCheckBox(3).should("not.be.checked");
        });

        // CA profile table step general test
        describe("on deployment package profile create or edit step", () => {
          beforeEach(() => {
            pom.appTablePom.table.getPageButton(1);
            pom.appTablePom.getNthCheckBox(2).click();
            pom.deploymentPackageProfilePom.addEditProfileDrawer.interceptApis([
              pom.deploymentPackageProfilePom.addEditProfileDrawer.api
                .getApplication,
            ]);
            pom.clickNextOnStep(1);
            pom.deploymentPackageProfilePom.addEditProfileDrawer.waitForApis();
          });
          it("should see the profile step component", () => {
            pom.deploymentPackageProfilePom.root.should("exist");
          });

          // CA Review step general test
          describe("deployment package create or edit review step", () => {
            beforeEach(() => {
              pom.deploymentPackageProfilePom.profileList.root.should("exist");
              pom.clickNextOnStep(2);
            });
            it("should see review component", () => {
              pom.deploymentPackageReviewPom.root.should("exist");
            });

            it("should submit package creation", () => {
              pom.interceptApis([pom.api.deploymentPackageCreate]);
              pom.el.submitButton.click();
              pom.waitForApis();

              cy.get(`@${pom.api.deploymentPackageCreate}`)
                .its("request.body")
                .should("deep.equal", {
                  ...packageOne,
                  name: "package-1",
                  displayName: "package-1",
                  defaultProfileName: "deployment-profile-1",
                  isDeployed: false,
                  profiles: [
                    {
                      name: "deployment-profile-1",
                      displayName: "Deployment Profile 1",
                      description: "System generated profile",
                      applicationProfiles: {
                        "application-1": "custom-profile",
                      },
                    },
                  ],
                  applicationReferences: [
                    {
                      ...applicationOne,
                      name: "application-1",
                      displayName: "Application 1",
                    },
                  ],
                });
            });
          });
        });
      });
    });
  });

  // TODO: add tests for component variation as "update" and "clone"
  // describe("when the component is used as deployment package edit",()=>{})
  // describe("when the component is used as deployment package clone",()=>{})
});
