/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { onboardedHostOne } from "@orch-ui/utils";
import { store } from "../../../store/store";
import OnboardedHostPopup, {
  OnboardedHostPopupProps,
} from "./OnboardedHostPopup";
import OnboardedHostPopupPom from "./OnboardedHostPopup.pom";

const pom = new OnboardedHostPopupPom();
describe("<OnboardedHostPopup />", () => {
  beforeEach(() => {
    // @ts-ignore
    window.store = store;

    const props: OnboardedHostPopupProps = {
      host: onboardedHostOne,
      onViewDetails: cy.stub().as("onViewDetailsStub"),
      onDelete: cy.stub().as("onDeleteStub"),
      onDeauthorize: cy.stub().as("onDeauthorizeStub"),
    };
    cy.mount(<OnboardedHostPopup {...props} showViewDetailsOption />);
    pom.root.click();
  });

  it("should not show `View Details`", () => {
    cy.mount(
      <OnboardedHostPopup
        host={onboardedHostOne}
        jsx={<button>Host Actions</button>}
      />,
      {
        reduxStore: store,
      },
    );
    pom.root.click();
    pom.hostPopupPom
      .getActionPopupBySearchText("View Details")
      .should("not.exist");
  });

  it("should call `onProvision` to provision host", () => {
    pom.hostPopupPom.getActionPopupBySearchText("Provision").click();
    pom.getPath().should("eq", "/hosts/set-up-provisioning");
    cy.window()
      .its("store")
      .invoke("getState")
      .then(() => {
        Object.values(store.getState().configureHost.hosts).forEach((host) => {
          expect(host.name).to.equal(onboardedHostOne.name);
        });
        Object.values(store.getState().configureHost.hosts).forEach((host) => {
          expect(host.site).to.deep.equal(onboardedHostOne.site);
        });
        Object.values(store.getState().configureHost.hosts).forEach((host) => {
          expect(host.site).to.deep.equal(onboardedHostOne.site);
        });
        // make sure we reset the form step to the first on
        expect(store.getState().configureHost.formStatus.currentStep).to.equal(
          0,
        );
      });
  });

  it("should call `onViewDetails`", () => {
    pom.hostPopupPom.getActionPopupBySearchText("View Details").click();
    cy.get("@onViewDetailsStub").should("be.called");
  });
  it("should call `onDeleteStub`", () => {
    pom.hostPopupPom.getActionPopupBySearchText("Delete").click();
    cy.get("@onDeleteStub").should("be.called");
  });
  it("should call `onDeauthorizeStub`", () => {
    pom.hostPopupPom.getActionPopupBySearchText("Deauthorize").click();
    cy.get("@onDeauthorizeStub").should("be.called");
  });
});
