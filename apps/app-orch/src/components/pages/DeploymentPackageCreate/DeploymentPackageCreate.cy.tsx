/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { CompositeApplicationOneVersionOne as DeploymentPackageOneVersionOne } from "@orch-ui/utils";
import { setupStore } from "../../../store";
import DeploymentPackageCreate from "./DeploymentPackageCreate";

describe("<DeploymentPackageCreate />", () => {
  it("should render component and prepare store", () => {
    const store = setupStore({
      deploymentPackage: { ...DeploymentPackageOneVersionOne },
    });
    // @ts-ignore
    window.store = store;
    cy.mount(<DeploymentPackageCreate />, {
      reduxStore: store,
    });
    cy.window()
      .its("store")
      .invoke("getState")
      .then(
        () =>
          expect(store.getState().deploymentPackage.displayName).to.be.empty,
      );
  });

  // TODO: check for DeploymentPackageCreateEditPom().root exist
});
