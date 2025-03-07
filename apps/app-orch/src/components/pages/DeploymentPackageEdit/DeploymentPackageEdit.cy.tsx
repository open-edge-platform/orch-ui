/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CompositeApplicationOneVersionOne as DeploymentPackageOneVersionOne } from "@orch-ui/utils";
import { setupStore } from "../../../store";
import DeploymentPackageEdit from "./DeploymentPackageEdit";
import DeploymentPackageEditPom from "./DeploymentPackageEdit.pom";

const pom = new DeploymentPackageEditPom();
describe("<DeploymentPackageEdit />", () => {
  it("should render component and prepare store", () => {
    pom.dpEditPom.interceptApis([pom.dpEditPom.api.deploymentPackageLoad]);

    const appName = DeploymentPackageOneVersionOne.displayName;
    const version = DeploymentPackageOneVersionOne.version;
    const store = setupStore({
      deploymentPackage: { ...DeploymentPackageOneVersionOne },
    });
    // @ts-ignore
    window.store = store;
    cy.mount(<DeploymentPackageEdit />, {
      reduxStore: store,
      routerProps: {
        initialEntries: [`/packages/edit/${appName}/version/${version}`],
      },
      routerRule: [
        {
          path: "/packages/edit/:appName/version/:version",
          element: <DeploymentPackageEdit />,
        },
      ],
    });
    pom.dpEditPom.waitForApis();

    cy.window()
      .its("store")
      .invoke("getState")
      .then(() => {
        expect(store.getState().deploymentPackage.displayName).to.eq(appName);
      });
  });

  // TODO: check for DeploymentPackageCreateEditPom().root exist
});
