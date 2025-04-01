/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { appEndpoints, deploymentClusterOneAppConsoleId } from "@orch-ui/utils";
import ApplicationDetailsServices from "./ApplicationDetailsServices";
import ApplicationDetailsServicesPom from "./ApplicationDetailsServices.pom";

const pom = new ApplicationDetailsServicesPom();

describe("<ApplicationDetailsServices>", () => {
  const appId = "test-app";
  const clusterId = "test-cluster-id";

  it("should render", () => {
    cy.mount(
      <ApplicationDetailsServices appId={appId} clusterId={clusterId} />,
    );
    pom.root.contains("Endpoints");
  });

  it("when API return success should render services", () => {
    pom.interceptApis([pom.api.getEndpointList]);
    cy.mount(
      <ApplicationDetailsServices appId={appId} clusterId={clusterId} />,
    );
    pom.waitForApis();

    pom.table.getRows().should("have.length", 2);

    const data1 =
      appEndpoints[deploymentClusterOneAppConsoleId].appEndpoints![0];
    pom.tableUtils.getRowBySearchText(data1.name!).within(() => {
      cy.contains(data1.fqdns![0].fqdn!);
      cy.contains(data1.fqdns![1].fqdn!);
      cy.contains("80(HTTP)");
      cy.contains("433(HTTPS)");
      cy.contains("Ready");
    });

    const data2 =
      appEndpoints[deploymentClusterOneAppConsoleId].appEndpoints![1];
    pom.tableUtils.getRowBySearchText(data2.name!).within(() => {
      cy.contains(data2.fqdns![0].fqdn!);
      cy.contains("22(FTP)");
      cy.contains("Not ready");
    });
  });

  it("should support more than 10 elements", () => {
    pom.interceptApis([pom.api.getEndpointListMulti]);
    cy.mount(
      <ApplicationDetailsServices appId={appId} clusterId={clusterId} />,
    );
    pom.waitForApis();

    pom.table.getRows().should("have.length", 10);
    pom.table.getTotalItemCount().should("contain.text", 14);
  });

  it("should see the target URL on Ports link", () => {
    pom.interceptApis([pom.api.getEndpointList]);
    cy.mount(
      <ApplicationDetailsServices appId={appId} clusterId={clusterId} />,
    );
    pom.waitForApis();
    const expectedUrl =
      appEndpoints[deploymentClusterOneAppConsoleId].appEndpoints![0].ports![0]
        .serviceProxyUrl;
    pom.tableUtils.getRowBySearchText("test").within(() => {
      cy.contains("80(HTTP)")
        .parent()
        .find("a")
        .should("have.attr", "target", "_blank")
        .should("have.attr", "href", expectedUrl);
    });
  });

  it("when API return error should display error message", () => {
    pom.interceptApis([pom.api.getEndpointListFail]);
    cy.mount(
      <ApplicationDetailsServices appId={appId} clusterId={clusterId} />,
    );
    pom.waitForApis();
    pom.root.contains("Could not load endpoints.");
  });
});
