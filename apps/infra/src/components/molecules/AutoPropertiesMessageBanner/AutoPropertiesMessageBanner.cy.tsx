/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { initialState } from "../../../store/configureHost";
import { setupStore } from "../../../store/store";
import AutoPropertiesMessageBanner from "./AutoPropertiesMessageBanner";
import AutoPropertiesMessageBannerPom from "./AutoPropertiesMessageBanner.pom";
import { AutoPropertiesMessages } from "./AutoPropertiesMessages";

const pom = new AutoPropertiesMessageBannerPom();
describe("<AutoPropertiesMessageBanner/>", () => {
  it("should render component", () => {
    cy.mount(<AutoPropertiesMessageBanner />);
    pom.root.should("be.visible");
  });

  it("Should render correct default message", () => {
    const store = setupStore({
      configureHost: {
        autoOnboard: false,
        autoProvision: false,
        formStatus: { ...initialState.formStatus },
        hosts: {},
      },
    });
    cy.mount(<AutoPropertiesMessageBanner />, {
      reduxStore: store,
    });
    pom.root.invoke("text").should("eq", AutoPropertiesMessages.NoneSelected);
  });

  it("Should render correct onboard only message", () => {
    const store = setupStore({
      configureHost: {
        autoOnboard: true,
        autoProvision: false,
        formStatus: { ...initialState.formStatus },
        hosts: {},
      },
    });
    cy.mount(<AutoPropertiesMessageBanner />, {
      reduxStore: store,
    });
    pom.root.invoke("text").should("eq", AutoPropertiesMessages.OnboardOnly);
  });

  it("Should render correct provison only message", () => {
    const store = setupStore({
      configureHost: {
        autoOnboard: false,
        autoProvision: true,
        formStatus: { ...initialState.formStatus },
        hosts: {},
      },
    });
    cy.mount(<AutoPropertiesMessageBanner />, {
      reduxStore: store,
    });
    pom.root.invoke("text").should("eq", AutoPropertiesMessages.ProvisionOnly);
  });

  it("Should render correct onboard & provision message", () => {
    const store = setupStore({
      configureHost: {
        autoOnboard: true,
        autoProvision: true,
        formStatus: { ...initialState.formStatus },
        hosts: {},
      },
    });
    cy.mount(<AutoPropertiesMessageBanner />, {
      reduxStore: store,
    });
    pom.root.invoke("text").should("eq", AutoPropertiesMessages.BothSelected);
  });
});
