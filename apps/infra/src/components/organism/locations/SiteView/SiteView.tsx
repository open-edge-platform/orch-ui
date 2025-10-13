/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { Flex, SquareSpinner } from "@orch-ui/components";
import { SharedStorage } from "@orch-ui/utils";
import { Heading } from "@spark-design/react";
import { DeploymentMetadata } from "../../../../components/atom/locations/DeploymentMetadata/DeploymentMetadata";
import { SiteActionsPopup } from "../../../../components/atom/locations/SiteActionsPopup/SiteActionsPopup";
import { SiteViewHostTable } from "../../../../components/molecules/locations/SiteViewHostTable/SiteViewHostTable";
import { TelemetryProfileLogs } from "../../../../components/molecules/locations/TelemetryProfileLogs/TelemetryProfileLogs";
import { TelemetryProfileMetrics } from "../../../../components/molecules/locations/TelemetryProfileMetrics/TelemetryProfileMetrics";
import { useAppSelector } from "../../../../store/hooks";
import { selectSite } from "../../../../store/locations";
import "./SiteView.scss";

const dataCy = "siteView";
interface SiteViewProps {
  basePath?: string;
  hideActions?: boolean;
}

export const SiteView = ({ basePath, hideActions = false }: SiteViewProps) => {
  const cy = { "data-cy": dataCy };
  const siteFromRedux = useAppSelector(selectSite);
  const className = "site-view";

  const { data: site } = infra.useSiteServiceGetSiteQuery(
    {
      projectName: SharedStorage.project?.name ?? "",
      resourceId: siteFromRedux?.resourceId ?? "",
      regionResourceId: siteFromRedux?.region?.resourceId ?? "",
    },
    {
      skip:
        !siteFromRedux?.resourceId ||
        !siteFromRedux?.region?.resourceId ||
        !SharedStorage.project?.name,
    },
  );

  if (!site) {
    return <SquareSpinner />;
  }

  return (
    <div {...cy} className={className}>
      {!hideActions && (
        <div className={`${className}__popup`}>
          <SiteActionsPopup site={site} />
        </div>
      )}
      <Heading semanticLevel={5} className={`${className}__details`}>
        Details
      </Heading>
      <Flex cols={[2, 4]}>
        <b className={`${className}__title`}>Name:</b>
        <p data-cy="siteName">{site?.name ?? "Missing Name"}</p>
        <b className={`${className}__title`}>Region:</b>
        <p data-cy="siteRegion">{site?.region?.name}</p>
      </Flex>
      <Heading semanticLevel={5}>Advanced Settings</Heading>
      <Heading
        semanticLevel={6}
        className={`${className}__deployment-metadata-heading`}
      >
        Deployment Metadata
      </Heading>
      <DeploymentMetadata site={site} />
      <Heading semanticLevel={6}>Telemetry Settings</Heading>
      <TelemetryProfileMetrics site={site} />
      <TelemetryProfileLogs site={site} />
      <Heading semanticLevel={5} className={`${className}__hosts`}>
        Hosts
      </Heading>
      <SiteViewHostTable site={site} basePath={basePath} />
    </div>
  );
};
