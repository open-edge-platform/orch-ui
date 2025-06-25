/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { initialState } from "apps/infra/src/store/provisionHost";
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
      provisionHost: {
        ...initialState,
        autoOnboard: false,
        autoProvision: false,
        createCluster: false,
      },
    });
    cy.mount(<AutoPropertiesMessageBanner />, {
      reduxStore: store,
    });
    pom.root.invoke("text").should("eq", AutoPropertiesMessages.NoneSelected);
  });

  it("Should render correct onboard only message", () => {
    const store = setupStore({
      provisionHost: {
        ...initialState,
        autoOnboard: true,
        autoProvision: false,
        createCluster: false,
      },
    });
    cy.mount(<AutoPropertiesMessageBanner />, {
      reduxStore: store,
    });
    pom.root.invoke("text").should("eq", AutoPropertiesMessages.OnboardOnly);
  });

  it("Should render correct provison only message", () => {
    const store = setupStore({
      provisionHost: {
        ...initialState,
        autoOnboard: false,
        autoProvision: true,
        createCluster: false,
      },
    });
    cy.mount(<AutoPropertiesMessageBanner />, {
      reduxStore: store,
    });
    pom.root.invoke("text").should("eq", AutoPropertiesMessages.ProvisionOnly);
  });

  it("Should render correct onboard & provision message", () => {
    const store = setupStore({
      provisionHost: {
        ...initialState,
        autoOnboard: true,
        autoProvision: true,
        createCluster: false,
      },
    });
    cy.mount(<AutoPropertiesMessageBanner />, {
      reduxStore: store,
    });
    pom.root.invoke("text").should("eq", AutoPropertiesMessages.BothSelected);
  });

  it("Should render correct message when onboard, provision, and cluster creation are all enabled", () => {
    const store = setupStore({
      provisionHost: {
        ...initialState,
        autoOnboard: true,
        autoProvision: true,
        createCluster: true,
      },
    });
    cy.mount(<AutoPropertiesMessageBanner />, {
      reduxStore: store,
    });
    pom.root.invoke("text").should("eq", AutoPropertiesMessages.CreateCluster);
  });
});
