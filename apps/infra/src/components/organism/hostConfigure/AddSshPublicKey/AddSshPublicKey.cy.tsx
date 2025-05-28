/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  assignedWorkloadHostOne as hostOne,
  assignedWorkloadHostOneId as hostOneId,
  generateSshMocks,
  osUbuntu,
  siteRestaurantOne,
  StoreUtils,
} from "@orch-ui/utils";
import { initialState } from "../../../../store/configureHost";
import { setupStore } from "../../../../store/store";
import { AddSshPublicKey } from "./AddSshPublicKey";
import { AddSshPublicKeyPom } from "./AddSshPublicKey.pom";

const pom = new AddSshPublicKeyPom();

// TODO: remove
xdescribe("<AddSshPublicKey/>", () => {
  const localAccounts = generateSshMocks(2);
  const store = setupStore({
    configureHost: {
      ...initialState,
      formStatus: initialState.formStatus,
      hosts: {
        [hostOneId]: {
          ...hostOne,
          site: siteRestaurantOne, // multi configure is expected to have same site
          instance: {
            ...StoreUtils.convertToWriteInstance({
              ...hostOne.instance, // ubuntu OS instance
            }),
            os: osUbuntu,
            securityFeature:
              "SECURITY_FEATURE_SECURE_BOOT_AND_FULL_DISK_ENCRYPTION",
          },
        },
      },
    },
  });

  beforeEach(() => {
    // @ts-ignore
    window.store = store;
    cy.mount(<AddSshPublicKey localAccounts={localAccounts} />, {
      reduxStore: store,
    });
  });

  it("should render component", () => {
    pom.root.should("exist");
  });

  it("should render table headers", () => {
    pom.tablePom.getColumnHeader(0).should("contain", "Host Name");
    pom.tablePom.getColumnHeader(1).should("contain", "Serial Number and UUID");
    pom.tablePom.getColumnHeader(2).should("contain", "SSH Key Name");
  });

  it("should render relevant values in columns", () => {
    pom.tablePom.getCell(1, 1).should("contain", hostOne.name);
    pom.tablePom.getCell(1, 2).should("contain", hostOne.serialNumber);
    pom.tablePom.getCell(1, 2).should("contain", hostOne.uuid);
    pom.tablePom
      .getCell(1, 3)
      .find("[data-cy='localAccountsDropdown']")
      .should("exist");
  });

  it("should select ssh key from dropdown", () => {
    pom.sshKeyDropdownPom.sshKeyDrpopdown.openDropdown(
      pom.tablePom.getCell(1, 3),
    );

    // selecting item from 0th index
    pom.sshKeyDropdownPom.sshKeyDrpopdown.selectDropdownValue(
      pom.tablePom.getCell(1, 3),
      "sshKey",
      "ssh-mock-0",
      "ssh-mock-0",
    );

    cy.window()
      .its("store")
      .invoke("getState")
      .then((state) => {
        const host = state.configureHost.hosts[hostOneId];
        expect(host.instance?.localAccountID).to.equal(
          localAccounts[0].resourceId,
        );
      });
  });
});
