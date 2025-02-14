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
    pom.hostSearchFilterPom.interceptApis([
      pom.hostSearchFilterPom.api.getOperatingSystems,
    ]);
    cy.mount(<Hosts />);
    pom.waitForApis();
    pom.hostSearchFilterPom.waitForApis();
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
  describe("status filter", () => {
    beforeEach(() => {
      pom.hostSearchFilterPom.el.filterButton.click();
    });
    it("should show for status `Ready` hosts", () => {
      pom.hostSearchFilterPom.statusCheckboxListPom
        .getCheckbox("Ready")
        .click();

      pom.interceptApis([pom.api.getHost]);
      pom.hostSearchFilterPom.el.applyFiltersBtn.click();
      pom.waitForApis();

      cy.get(`@${pom.api.getHost}`)
        .its("request.url")
        .then((url: string) => {
          const match = url.match(
            encodeURLQuery(
              "(hostStatusIndicator=STATUS_INDICATION_IDLE OR onboardingStatusIndicator=STATUS_INDICATION_IDLE OR registrationStatusIndicator=STATUS_INDICATION_IDLE OR hostStatusIndicator=STATUS_INDICATION_UNSPECIFIED OR onboardingStatusIndicator=STATUS_INDICATION_UNSPECIFIED OR registrationStatusIndicator=STATUS_INDICATION_UNSPECIFIED)",
            ),
          );
          return expect(match && match.length > 0).to.be.eq(true);
        });
    });
    it("should show for status `InProgress` hosts", () => {
      pom.hostSearchFilterPom.statusCheckboxListPom
        .getCheckbox("InProgress")
        .click();

      pom.interceptApis([pom.api.getHost]);
      pom.hostSearchFilterPom.el.applyFiltersBtn.click();
      pom.waitForApis();

      cy.get(`@${pom.api.getHost}`)
        .its("request.url")
        .then((url: string) => {
          const match = url.match(
            encodeURLQuery(
              "(hostStatusIndicator=STATUS_INDICATION_IN_PROGRESS OR onboardingStatusIndicator=STATUS_INDICATION_IN_PROGRESS OR registrationStatusIndicator=STATUS_INDICATION_IN_PROGRESS)",
            ),
          );
          return expect(match && match.length > 0).to.be.eq(true);
        });
    });
    it("should show for status `Deauthorized` hosts", () => {
      pom.hostSearchFilterPom.statusCheckboxListPom
        .getCheckbox("Deauthorized")
        .click();

      pom.interceptApis([pom.api.getHost]);
      pom.hostSearchFilterPom.el.applyFiltersBtn.click();
      pom.waitForApis();

      cy.get(`@${pom.api.getHost}`)
        .its("request.url")
        .then((url: string) => {
          const match = url.match(
            encodeURLQuery("(currentState=HOST_STATE_UNTRUSTED)"),
          );
          return expect(match && match.length > 0).to.be.eq(true);
        });
    });

    it("should show for status `Unknown` hosts", () => {
      pom.hostSearchFilterPom.statusCheckboxListPom
        .getCheckbox("Unknown")
        .click();

      pom.interceptApis([pom.api.getHost]);
      pom.hostSearchFilterPom.el.applyFiltersBtn.click();
      pom.waitForApis();

      cy.get(`@${pom.api.getHost}`)
        .its("request.url")
        .then((url: string) => {
          const match = url.match(
            encodeURLQuery("(currentState=HOST_STATE_UNSPECIFIED)"),
          );
          return expect(match && match.length > 0).to.be.eq(true);
        });
    });

    it("should show for status `Error` hosts", () => {
      pom.hostSearchFilterPom.statusCheckboxListPom
        .getCheckbox("Error")
        .click();

      pom.interceptApis([pom.api.getHost]);
      pom.hostSearchFilterPom.el.applyFiltersBtn.click();
      pom.waitForApis();

      cy.get(`@${pom.api.getHost}`)
        .its("request.url")
        .then((url: string) => {
          const match = url.match(
            encodeURLQuery(
              "(hostStatusIndicator=STATUS_INDICATION_ERROR OR onboardingStatusIndicator=STATUS_INDICATION_ERROR OR registrationStatusIndicator=STATUS_INDICATION_ERROR)",
            ),
          );
          return expect(match && match.length > 0).to.be.eq(true);
        });
    });

    it("should show for status `Error` and `InProgress` hosts", () => {
      pom.hostSearchFilterPom.statusCheckboxListPom
        .getCheckbox("Error")
        .click();
      pom.hostSearchFilterPom.statusCheckboxListPom
        .getCheckbox("InProgress")
        .click();

      pom.interceptApis([pom.api.getHost]);
      pom.hostSearchFilterPom.el.applyFiltersBtn.click();
      pom.waitForApis();

      cy.get(`@${pom.api.getHost}`)
        .its("request.url")
        .then((url: string) => {
          const match = url.match(
            encodeURLQuery(
              "(hostStatusIndicator=STATUS_INDICATION_IN_PROGRESS OR onboardingStatusIndicator=STATUS_INDICATION_IN_PROGRESS OR registrationStatusIndicator=STATUS_INDICATION_IN_PROGRESS OR hostStatusIndicator=STATUS_INDICATION_ERROR OR onboardingStatusIndicator=STATUS_INDICATION_ERROR OR registrationStatusIndicator=STATUS_INDICATION_ERROR)",
            ),
          );
          return expect(match && match.length > 0).to.be.eq(true);
        });
    });
  });

  describe("Os Profile filter", () => {
    beforeEach(() => {
      pom.hostSearchFilterPom.el.filterButton.click();
    });
    it("should show hosts with selected os", () => {
      pom.hostSearchFilterPom.osProfileCheckboxListPom
        .getCheckbox("os-3")
        .click();

      pom.interceptApis([pom.api.getHost]);
      pom.hostSearchFilterPom.el.applyFiltersBtn.click();
      pom.waitForApis();

      cy.get(`@${pom.api.getHost}`)
        .its("request.url")
        .then((url: string) => {
          const match = url.match(
            encodeURLQuery('(instance.currentOs.profileName="os-3")'),
          );
          return expect(match && match.length > 0).to.be.eq(true);
        });
    });
    it("should show hosts with multiple selected os selections", () => {
      pom.hostSearchFilterPom.osProfileCheckboxListPom
        .getCheckbox("os-3")
        .click();
      pom.hostSearchFilterPom.osProfileCheckboxListPom
        .getCheckbox("os-1")
        .click();

      pom.interceptApis([pom.api.getHost]);
      pom.hostSearchFilterPom.el.applyFiltersBtn.click();
      pom.waitForApis();

      cy.get(`@${pom.api.getHost}`)
        .its("request.url")
        .then((url: string) => {
          const match = url.match(
            encodeURLQuery(
              '(instance.currentOs.profileName="os-1" OR instance.currentOs.profileName="os-3")',
            ),
          );
          return expect(match && match.length > 0).to.be.eq(true);
        });
    });
  });
});
