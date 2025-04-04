/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { osUbuntu, osUbuntuId } from "@orch-ui/utils";
import { initialState } from "../../../../store/configureHost";
import { setupStore } from "../../../../store/store";
import { GlobalSecuritySwitch } from "./GlobalSecuritySwitch";
import { GlobalSecuritySwitchPom } from "./GlobalSecuritySwitch.pom";

const pom = new GlobalSecuritySwitchPom();
describe("<GlobalSecuritySwitch/>", () => {
  it("should set global value", () => {
    const onChange = cy.spy().as("onChange");

    const store = setupStore({
      configureHost: {
        formStatus: { ...initialState.formStatus, globalOsValue: "os-ubuntu" },
        hosts: {
          hostId: {
            name: "preloaded-name",
            serialNumber: "SN1234AB",
            instance: {
              osID: osUbuntuId,
              os: osUbuntu,
            },
          },
        },
        autoOnboard: false,
        autoProvision: false,
      },
    });
    // @ts-ignore
    window.store = store;

    cy.mount(<GlobalSecuritySwitch value={true} onChange={onChange} />, {
      reduxStore: store,
    });
    pom.root.should("exist");

    pom.el.globalSecuritySwitchToggle
      .siblings(".spark-toggle-switch-selector")
      .click();

    cy.get("@onChange").should("have.been.calledWith", false);
  });
});
