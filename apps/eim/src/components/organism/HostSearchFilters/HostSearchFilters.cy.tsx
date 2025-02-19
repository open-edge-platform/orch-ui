/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { LifeCycleState } from "../../../store/hostFilterBuilder";
import { setupStore } from "../../../store/store";
import HostSearchFilters from "./HostSearchFilters";
import HostSearchFiltersPom from "./HostSearchFilters.pom";

const pom = new HostSearchFiltersPom();
describe("<HostSearchFilters/>", () => {
  beforeEach(() => {
    pom.interceptApis([pom.api.getOperatingSystems]);
    cy.mount(<HostSearchFilters />, {
      reduxStore: {
        ...setupStore({
          hostFilterBuilder: {
            lifeCycleState: LifeCycleState.All,
          },
        }),
      },
    });
    pom.waitForApis();
  });
  it("should render component", () => {
    pom.root.should("exist");
  });

  describe("Status selection involving Deauthorized upon setting a Lifecycle state", () => {
    it("it should render Deauthorized status selection for `All` host context", () => {
      cy.mount(<HostSearchFilters />, {
        reduxStore: {
          ...setupStore({
            hostFilterBuilder: {
              lifeCycleState: LifeCycleState.All,
            },
          }),
        },
      });
      pom.el.filterButton.click();
      pom.statusCheckboxListPom.root.should("contain.text", "Deauthorized");
    });
    it("should not show Deauthorized for `Onboarded` host context", () => {
      cy.mount(<HostSearchFilters />, {
        reduxStore: {
          ...setupStore({
            hostFilterBuilder: {
              lifeCycleState: LifeCycleState.Onboarded,
            },
          }),
        },
      });
      pom.el.filterButton.click();
      pom.statusCheckboxListPom.root.should("not.contain.text", "Deauthorized");
    });
    it("should not show Deauthorized for `Provisioned` host context", () => {
      cy.mount(<HostSearchFilters />, {
        reduxStore: {
          ...setupStore({
            hostFilterBuilder: {
              lifeCycleState: LifeCycleState.Provisioned,
            },
          }),
        },
      });
      pom.el.filterButton.click();
      pom.statusCheckboxListPom.root.should("not.contain.text", "Deauthorized");
    });
    it("should not show Deauthorized for `Registered` host context", () => {
      cy.mount(<HostSearchFilters />, {
        reduxStore: {
          ...setupStore({
            hostFilterBuilder: {
              lifeCycleState: LifeCycleState.Registered,
            },
          }),
        },
      });
      pom.el.filterButton.click();
      pom.statusCheckboxListPom.root.should("not.contain.text", "Deauthorized");
    });
  });

  describe("Os profiles selection", () => {
    beforeEach(() => {
      pom.el.filterButton.click();
    });
    it("should show the os profile", () => {
      pom.osProfileCheckboxListPom
        .getCheckbox("os-3")
        .should("have.class", "spark-checkbox-un-checked");
      pom.osProfileCheckboxListPom.getCheckbox("os-3").click();
      pom.osProfileCheckboxListPom
        .getCheckbox("os-3")
        .should("have.class", "spark-checkbox-checked");
    });
  });
});
