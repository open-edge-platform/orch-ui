/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { LifeCycleState } from "../../../store/hostFilterBuilder";
import Hosts from "./Hosts";
import HostsPom, { encodeURLQuery } from "./Hosts.pom";

const pom = new HostsPom();
describe("<Hosts/>", () => {
  beforeEach(() => {
    pom.interceptApis([pom.api.getHost]);
    cy.mount(<Hosts />);
    pom.waitForApis();
  });

  it("should render component", () => {
    pom.root.should("exist");
  });

  describe("lifecycle state", () => {
    it("should show for `Provisioned` hosts", () => {
      pom.hostContextSwitcherPom
        .getActiveTab()
        .should("contain.text", LifeCycleState.Provisioned);
      cy.get(`@${pom.api.getHost}`)
        .its("request.url")
        .then((url: string) => {
          const match = url.match(
            encodeURLQuery(
              "(currentState=HOST_STATE_ONBOARDED AND has(instance))",
            ),
          );
          return expect(match && match.length > 0).to.be.eq(true);
        });
    });

    it("should show for `Onboarded` hosts", () => {
      pom.interceptApis([pom.api.getHost]);
      pom.hostContextSwitcherPom.getTabButton(LifeCycleState.Onboarded).click();
      pom.waitForApis();
      cy.get(`@${pom.api.getHost}`)
        .its("request.url")
        .then((url: string) => {
          const match = url.match(
            encodeURLQuery(
              "(currentState=HOST_STATE_ONBOARDED AND NOT has(instance))",
            ),
          );
          return expect(match && match.length > 0).to.be.eq(true);
        });
    });

    it("should show for `Registered` hosts", () => {
      pom.interceptApis([pom.api.getHost]);
      pom.hostContextSwitcherPom
        .getTabButton(LifeCycleState.Registered)
        .click();
      pom.waitForApis();
      cy.get(`@${pom.api.getHost}`)
        .its("request.url")
        .then((url: string) => {
          const match = url.match(
            encodeURLQuery("(currentState=HOST_STATE_REGISTERED)"),
          );
          return expect(match && match.length > 0).to.be.eq(true);
        });
    });

    it("should show for `All` hosts", () => {
      pom.interceptApis([pom.api.getHost]);
      pom.hostContextSwitcherPom.getTabButton(LifeCycleState.All).click();
      pom.waitForApis();
      cy.get(`@${pom.api.getHost}`)
        .its("request.url")
        .then((url: string) => {
          const match = url.match(/\?offset=0/);
          return expect(match && match.length > 0).to.be.eq(true);
        });
    });
  });
});
