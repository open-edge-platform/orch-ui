/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cyGet } from "@orch-ui/tests";
import {
  assignedWorkloadHostOne as hostOne,
  instanceOne,
  IRuntimeConfig,
  onboardedHostOne,
  provisionedHostOne,
} from "@orch-ui/utils";
import HostDetailsActions from "./HostDetailsActions";
import HostDetailsActionsPom from "./HostDetailsActions.pom";

const pom = new HostDetailsActionsPom();
describe("Host Details Action component testing", () => {
  const runtimeConfig: IRuntimeConfig = {
    AUTH: "",
    KC_CLIENT_ID: "",
    KC_REALM: "",
    KC_URL: "",
    SESSION_TIMEOUT: 0,
    OBSERVABILITY_URL: "testUrl",
    DOCUMENTATION: [],
    TITLE: "",
    MFE: { INFRA: "false" },
    API: {},
    VERSIONS: {},
  };

  it("should render popup for `provisioned host with assigned workload/cluster`", () => {
    pom.interceptApis([pom.api.getInstanceWithWorkload]);
    cy.mount(
      <HostDetailsActions
        host={{
          ...hostOne,
          instance: { ...instanceOne, workloadMembers: undefined },
        }}
      />,
      { runtimeConfig },
    );
    pom.waitForApis();
    pom.provisionedHostPopupPom.hostPopupPom.root.should("exist");
    // Note: Delete is not possible in host with assigned cluster. until its made unassigned to that cluster.
    pom.provisionedHostPopupPom.hostPopupPom
      .getActionPopupBySearchText("Delete")
      .should("not.exist");
  });

  it("should render popup for `provisioned host without assigned workload/cluster`", () => {
    pom.interceptApis([pom.api.getInstanceWithoutWorkload]);
    cy.mount(
      <HostDetailsActions
        host={{
          ...provisionedHostOne,
          instance: { ...instanceOne, workloadMembers: undefined },
        }}
      />,
      {
        runtimeConfig,
      },
    );
    pom.waitForApis();
    pom.provisionedHostPopupPom.hostPopupPom.root.should("exist");
    // Note: Delete is possible in host without assigned cluster.
    pom.provisionedHostPopupPom.hostPopupPom
      .getActionPopupBySearchText("Delete")
      .should("exist");
  });

  describe("Delete", () => {
    it("should display the delete confirmation dialog", () => {
      cy.mount(<HostDetailsActions host={onboardedHostOne} />, {
        runtimeConfig,
      });
      pom.onboardedHostPopupPom.hostPopupPom.root.should("exist");
      pom.onboardedHostPopupPom.hostPopupPom.root.click();
      pom.onboardedHostPopupPom.hostPopupPom
        .getActionPopupBySearchText("Delete")
        .click();

      cyGet("dialog").contains(
        `Are you sure you want to delete Host "${onboardedHostOne.resourceId!}"?`,
      );
    });

    it("should cancel the delete confirmation dialog", () => {
      cy.mount(<HostDetailsActions host={onboardedHostOne} />, {
        runtimeConfig,
      });
      pom.onboardedHostPopupPom.hostPopupPom.root.should("exist");
      pom.onboardedHostPopupPom.hostPopupPom.root.click();
      pom.onboardedHostPopupPom.hostPopupPom
        .getActionPopupBySearchText("Delete")
        .click();

      cyGet("dialog").find("[data-cy='cancelBtn']").click();
      cyGet("dialog").should("not.exist");
    });

    it("should delete the onboarded host", () => {
      cy.mount(<HostDetailsActions host={onboardedHostOne} />, {
        runtimeConfig,
      });
      pom.onboardedHostPopupPom.hostPopupPom.root.should("exist");
      pom.onboardedHostPopupPom.hostPopupPom.root.click();
      pom.onboardedHostPopupPom.hostPopupPom
        .getActionPopupBySearchText("Delete")
        .click();

      pom.interceptApis([pom.api.deleteHost]);
      cyGet("dialog").find("[data-cy='confirmBtn']").click();
      pom.waitForApis();
      cyGet("dialog").should("not.exist");

      cy.get(`@${pom.api.deleteHost}`)
        .its("request.url")
        .then((url: string) => {
          // This name should not match entered name, instead it will be the old name
          const match = url.match(onboardedHostOne.resourceId!);
          expect(match && match.length > 0).to.be.equal(true);
        });
    });

    it("should delete the provisioned host", () => {
      pom.interceptApis([pom.api.getInstanceWithoutWorkload]);
      cy.mount(
        <HostDetailsActions
          host={{
            ...provisionedHostOne,
            instance: {
              ...provisionedHostOne.instance,
              workloadMembers: undefined,
            },
          }}
        />,
        {
          runtimeConfig,
        },
      );
      pom.waitForApis();

      pom.onboardedHostPopupPom.hostPopupPom.root.should("exist");
      pom.onboardedHostPopupPom.hostPopupPom.root.click();
      pom.onboardedHostPopupPom.hostPopupPom
        .getActionPopupBySearchText("Delete")
        .click();

      pom.interceptApis([pom.api.deleteHost, pom.api.deleteInstance]);
      cyGet("dialog").find("[data-cy='confirmBtn']").click();
      pom.waitForApis();
      cyGet("dialog").should("not.exist");

      cy.get(`@${pom.api.deleteHost}`)
        .its("request.url")
        .then((url: string) => {
          // This name should not match entered name, instead it will be the old name
          const match = url.match(provisionedHostOne.resourceId!);
          expect(match && match.length > 0).to.be.equal(true);
        });
    });
  });
});
