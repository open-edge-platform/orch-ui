/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { deploymentOne } from "@orch-ui/utils";
import DeploymentDetailsStatus from "./DeploymentDetailsStatus";
import DeploymentDetailsStatusPom from "./DeploymentDetailsStatus.pom";

const deploymentDetailsStatusPom = new DeploymentDetailsStatusPom();

describe("DeploymentDetailsStatus component Testing", () => {
  it("should render the component", () => {
    cy.mount(
      <DeploymentDetailsStatus
        deploymentDetails={{
          compositeAppDetailsProps: {
            name: deploymentOne.appName,
            version: deploymentOne.appVersion,
            type: "Auto-scaling",
            valueOverrides: true,
          },
          dateTime: deploymentOne.createTime!,
          status: deploymentOne.status,
          metadataKeyValuePairs: [
            { key: "customer", value: "culvers" },
            { key: "state", value: "california" },
            { key: "region", value: "north-west" },
          ],
        }}
      />,
    );

    const displayDate = deploymentDetailsStatusPom.getDisplayDate(
      deploymentOne.createTime!,
    );

    deploymentDetailsStatusPom.el.pkgName.should(
      "have.text",
      deploymentOne.appName,
    );
    deploymentDetailsStatusPom.el.valueOverrides.should("contain.text", "Yes");
    deploymentDetailsStatusPom.el.type.should("have.text", "Auto-scaling");
    deploymentDetailsStatusPom.el.pkgVersion.should(
      "have.text",
      `Version ${deploymentOne.appVersion}`,
    );
    deploymentDetailsStatusPom.el.setupDate.should("have.text", displayDate);
    deploymentDetailsStatusPom.metadataBadge
      .getByKey("customer")
      .should("contain.text", "customer = culvers");
    deploymentDetailsStatusPom.metadataBadge
      .getByKey("state")
      .should("contain.text", "state = california");
    deploymentDetailsStatusPom.metadataBadge
      .getByKey("region")
      .should("contain.text", "region = north-west");
    deploymentDetailsStatusPom.el.deploymentStatus.should(
      "have.text",
      "All 3 running",
    );
  });

  it("should render empty metadata", () => {
    cy.mount(
      <DeploymentDetailsStatus
        deploymentDetails={{
          compositeAppDetailsProps: {
            name: deploymentOne.appName,
            version: deploymentOne.appVersion,
            type: "Manual",
            valueOverrides: false,
          },
          dateTime: deploymentOne.createTime!,
          status: deploymentOne.status,
          metadataKeyValuePairs: [],
        }}
      />,
    );

    deploymentDetailsStatusPom.el.emptyMetadata.should("exist");
  });

  it("should render deployment status", () => {
    const deploymentDetailsProps = {
      compositeAppDetailsProps: {
        name: deploymentOne.appName,
        version: deploymentOne.appVersion,
        type: "Manual",
        valueOverrides: false,
        showViewDetails: true,
      },
      dateTime: deploymentOne.createTime!,
      metadataKeyValuePairs: [],
    };

    cy.mount(
      <DeploymentDetailsStatus
        deploymentDetails={{
          ...deploymentDetailsProps,
          status: { summary: { down: 5, running: 2, total: 7 } },
        }}
      />,
    );
    deploymentDetailsStatusPom.el.deploymentStatus.should(
      "have.text",
      "5 down",
    );

    cy.mount(
      <DeploymentDetailsStatus
        deploymentDetails={{
          ...deploymentDetailsProps,
          status: { summary: { down: 5, running: 2, total: 7 } },
          detailedStatus: true,
        }}
      />,
    );
    deploymentDetailsStatusPom.el.deploymentStatus.should(
      "contain.text",
      "5 down",
    );
    deploymentDetailsStatusPom.el.deploymentStatus.should(
      "contain.text",
      "2 running",
    );
  });
});
