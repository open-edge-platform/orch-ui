/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { cyGet, defaultActiveProject } from "@orch-ui/tests";
import { assignedWorkloadHostOne as hostOne } from "@orch-ui/utils";
import DeauthorizeHostStandalone from "./DeauthorizeHostStandalone";
import DeauthorizeHostStandalonePom from "./DeauthorizeHostStandalone.pom";

const pom = new DeauthorizeHostStandalonePom();
describe("<DeauthorizeHostStandalone/>", () => {
  it("should render component", () => {
    cy.mount(
      <DeauthorizeHostStandalone
        hostId={hostOne.resourceId! as string}
        hostName={hostOne.name}
        isDeauthConfirmationOpen
        setDeauthorizeConfirmationOpen={() => {}}
      />,
    );
    pom.root.should("exist");

    cy.get(".deauthorize-host-standalone > p").should(
      "contain.text",
      hostOne.name,
    );
  });
  xit("should render component", () => {
    cy.mount(
      <DeauthorizeHostStandalone
        hostId={hostOne.resourceId! as string}
        hostName={hostOne.name}
        isDeauthConfirmationOpen
        setDeauthorizeConfirmationOpen={() => {}}
      />,
    );
    pom.root.should("exist");

    pom.interceptApis([pom.api.postDeauthorizeHost]);
    cyGet("confirmationDialog")
      .find(".spark-button")
      .contains("Deauthorize")
      .click();
    pom.waitForApis();

    cy.get(`@${pom.api.postDeauthorizeHost}`)
      .its("request.url")
      .then((url) => {
        const match = url.match(
          `/v1/projects/${defaultActiveProject.name}/compute/hosts/${hostOne.resourceId}/invalidate`,
        );
        expect(match && match.length > 0).to.eq(true);
      });

    cy.get("#pathname").contains("/deauthorized-hosts");
  });
});
