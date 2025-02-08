/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { CompositeApplicationOneVersionOne as DeploymentPackageOneVersionOne } from "@orch-ui/utils";
import { store } from "../../../store";
import DeploymentPackageClone from "./DeploymentPackageClone";
import DeploymentPackageClonePom from "./DeploymentPackageClone.pom";

const pom = new DeploymentPackageClonePom();
describe("<DeploymentPackageClone />", () => {
  // store can only be initialized per describe blocks and persists through all it blocks
  let isStoreInitialized = false;

  beforeEach(() => {
    pom.dpEditPom.interceptApis([pom.dpEditPom.api.deploymentPackageLoad]);

    // UI Route settings
    const appName = DeploymentPackageOneVersionOne.displayName;
    const version = DeploymentPackageOneVersionOne.version;

    cy.mount(<DeploymentPackageClone />, {
      ...(isStoreInitialized ? { reduxStore: store } : {}), // initialize store to default
      routerProps: {
        initialEntries: [`/packages/clone/${appName}/version/${version}`],
      },
      routerRule: [
        {
          path: "/packages/clone/:appName/version/:version",
          element: <DeploymentPackageClone />,
        },
      ],
    });

    pom.dpEditPom.waitForApis();

    // Set src to initialized
    isStoreInitialized = true;
  });

  it("should render component with src name after API-fetch", () => {
    pom.dpEditPom.deploymentPackageGeneralInfoFormPom.el.name.should(
      "have.value",
      "Copy of intel-app-package-one",
    );
  });

  it("should be able to edit and render text within name input", () => {
    pom.dpEditPom.deploymentPackageGeneralInfoFormPom.el.name
      .clear()
      .type("Hello, World");
    pom.dpEditPom.deploymentPackageGeneralInfoFormPom.el.name.should(
      "have.value",
      "Hello, World",
    );
  });
});
