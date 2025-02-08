/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { cyGet } from "@orch-ui/tests";
import { hostOne, IRuntimeConfig, unconfiguredHostOne } from "@orch-ui/utils";
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
    MFE: { FM: "false" },
    API: {},
    VERSIONS: {},
  };

  it("should render configured host popup for a configured host.", () => {
    cy.mount(<HostDetailsActions host={hostOne} />, { runtimeConfig });
    pom.hostPopup.root.should("exist");
  });

  it("should render unconfigured host popup for a unconfigured host.", () => {
    cy.mount(<HostDetailsActions host={unconfiguredHostOne} />, {
      runtimeConfig,
    });
    pom.unconfiguredHostPopup.root.should("exist");
    pom.el.unconfiguredActions.click();
  });

  xit("should display the delete confirmation dialog for unconfigured host", () => {
    cy.mount(<HostDetailsActions host={unconfiguredHostOne} />, {
      runtimeConfig,
    });
    pom.unconfiguredHostPopup.root.should("exist");
    pom.el.unconfiguredActions.click();
    cyGet("Delete").click();
    pom.confirmationDialog.el.title.should("be.visible");
    pom.confirmationDialog.el.subtitle.contains(
      unconfiguredHostOne.resourceId!,
    );
  });

  xit("should cancel the delete confirmation dialog for unconfigured host", () => {
    cy.mount(<HostDetailsActions host={unconfiguredHostOne} />, {
      runtimeConfig,
    });
    pom.unconfiguredHostPopup.root.should("exist");
    pom.el.unconfiguredActions.click();
    cyGet("Delete").click();
    pom.confirmationDialog.el.cancelBtn.click();
    pom.confirmationDialog.root.should("not.be.visible");
  });

  xit("should delete the host", () => {
    cy.stub(HostDetailsActions);

    cy.mount(<HostDetailsActions host={unconfiguredHostOne} />, {
      runtimeConfig,
    });
    pom.unconfiguredHostPopup.root.should("exist");
    pom.el.unconfiguredActions.click();
    cyGet("Delete").click();
    pom.confirmationDialog.el.confirmBtn.click();
    pom.confirmationDialog.root.should("not.be.visible");
  });
});
