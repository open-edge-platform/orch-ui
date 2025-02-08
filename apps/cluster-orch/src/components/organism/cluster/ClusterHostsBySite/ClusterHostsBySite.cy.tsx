/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import { StatusIcon } from "@orch-ui/components";
import {
  hostProviderStatusToString,
  hostStatusIndicatorToIconStatus,
  IRuntimeConfig,
  SparkTableColumn,
} from "@orch-ui/utils";
import { Icon } from "@spark-design/react";
import { Link } from "react-router-dom";
import ClusterHostsBySite from "./ClusterHostsBySite";
import { ClusterHostsBySitePom } from "./ClusterHostsBySite.pom";

const hostTableColumns: SparkTableColumn<eim.HostRead>[] = [
  {
    Header: "Name",
    accessor: (host) => {
      if (host.name) {
        return host.name;
      } else if (host.resourceId) {
        return host.resourceId;
      }
    },
    Cell: (table: { row: { original: eim.HostRead } }) => (
      <Link to={`/infrastructure/host/${table.row.original.resourceId}`}>
        {table.row.original.name !== ""
          ? table.row.original.name
          : table.row.original.resourceId}
      </Link>
    ),
  },
  {
    Header: "Status",
    accessor: (host) => hostProviderStatusToString(host),
    Cell: (table: { row: { original: eim.HostRead } }) => {
      const host = table.row.original;
      return (
        <StatusIcon
          data-cy="hostStatusText"
          status={hostStatusIndicatorToIconStatus(host)}
          text={hostProviderStatusToString(host)}
        />
      );
    },
  },
  {
    Header: "GUID",
    accessor: (host) => host.uuid,
  },
  {
    Header: "Serial",
    accessor: (host) => host.serialNumber,
  },
  {
    Header: "Actions",
    textAlign: "center",
    padding: "0",
    accessor: (host) => (
      <Link to={`/infrastructure/host/${host.resourceId}`}>
        <Icon icon="clipboard-forward" /> View Host Details
      </Link>
    ),
  },
];

const pom = new ClusterHostsBySitePom();
describe("<ClusterHostsBySite/>", () => {
  it("will render", () => {
    const runtimeConfig: IRuntimeConfig = {
      AUTH: "",
      KC_CLIENT_ID: "",
      KC_REALM: "",
      KC_URL: "",
      SESSION_TIMEOUT: 0,
      OBSERVABILITY_URL: "",
      TITLE: "",
      MFE: { CLUSTER_ORCH: "false", APP_ORCH: "false", FM: "false" },
      API: {},
      DOCUMENTATION: [],
      VERSIONS: {},
    };
    cy.mount(
      <ClusterHostsBySite
        cluster={pom.testCluster}
        columns={hostTableColumns}
      />,
      { runtimeConfig },
    );

    pom.root.should("exist");
  });

  it("render loader when waiting to add host to cluster", () => {
    pom.interceptApis([pom.api.getCreatingHostData]);
    cy.mount(
      <ClusterHostsBySite
        cluster={pom.testClusterCreating}
        columns={hostTableColumns}
      />,
    );
    pom.waitForApis();
    pom.root.contains("Adding hosts to cluster...");
  });

  it("renders error when API fails", () => {
    pom.interceptApis([pom.api.getClusterError500]);
    cy.mount(
      <ClusterHostsBySite
        cluster={pom.testClusterCreating}
        columns={hostTableColumns}
      />,
    );
    pom.waitForApis();
    pom.el.apiError.should("be.visible");
  });
});
