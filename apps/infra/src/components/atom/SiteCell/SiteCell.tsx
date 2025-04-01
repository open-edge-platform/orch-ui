/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim } from "@orch-ui/apis";
import { SquareSpinner } from "@orch-ui/components";
import { SharedStorage } from "@orch-ui/utils";
import { Link } from "react-router-dom";
const dataCy = "siteCell";

export interface SiteCellProps {
  siteId?: string;
  regionId?: string;
  basePath?: string;
}
const SiteCell = ({ siteId, basePath = "", regionId = "*" }: SiteCellProps) => {
  const cy = { "data-cy": dataCy };

  const {
    data: site,
    isLoading,
    isError,
  } = eim.useGetV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteIdQuery(
    {
      regionId,
      projectName: SharedStorage.project?.name ?? "",
      siteId: siteId!,
    },
    { skip: !siteId || !SharedStorage.project?.name },
  );

  if (!siteId) {
    return <div {...cy}> - </div>;
  }

  if (isLoading) {
    return <SquareSpinner {...cy} />;
  }

  if (isError || !site) {
    return <span {...cy}>{siteId}</span>;
  }
  return (
    <Link
      {...cy}
      to={`${basePath}regions/${site.region?.resourceId}/sites/${siteId}`}
      relative="path"
    >
      {site.name}
    </Link>
  );
};

export default SiteCell;
