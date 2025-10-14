/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { encodeURLQuery } from "@orch-ui/tests";
import { LifeCycleState } from "../../../store/hostFilterBuilder";
import { setupStore } from "../../../store/store";
import Hosts from "./Hosts";
import HostsPom from "./Hosts.pom";

const pom = new HostsPom();
describe("<Hosts/>", () => {
  beforeEach(() => {
    pom.interceptApis([pom.api.getHost]);
    pom.hostSearchFilterPom.interceptApis([
      pom.hostSearchFilterPom.api.getOperatingSystems,
    ]);
    cy.mount(<Hosts />, {
      reduxStore: {
        ...setupStore({
          hostFilterBuilder: {
            lifeCycleState: LifeCycleState.All,
          },
        }),
      },
    });
    pom.waitForApis();
    pom.hostSearchFilterPom.waitForApis();
  });

  it("should render component", () => {
    pom.root.should("exist");
  });

  describe("lifecycle state", () => {
    it("should show for `Provisioned` hosts", () => {
      pom.interceptApis([pom.api.getHost]);
      pom.hostContextSwitcherPom
        .getTabButton(LifeCycleState.Provisioned)
        .click();
      pom.waitForApis();
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
            encodeURLQuery(
              "(currentState=HOST_STATE_REGISTERED OR currentState=HOST_STATE_UNSPECIFIED)",
            ),
          );
          return expect(match && match.length > 0).to.be.eq(true);
        });
    });

    it("should show for `All` hosts", () => {
      pom.hostContextSwitcherPom
        .getTabButton(LifeCycleState.All)
        .should("have.class", "active");
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
      // Wait for table to render with the filter button.
      // else it will click on filter icon on empty upon successful polling
      pom.hostTablePom.table.root.should("exist");

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
      pom.hostTablePom.table.root.should("exist");
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
            encodeURLQuery('(instance.os.profileName="os-3")'),
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
              '(instance.os.profileName="os-1" OR instance.os.profileName="os-3")',
            ),
          );
          return expect(match && match.length > 0).to.be.eq(true);
        });
    });
  });
});
