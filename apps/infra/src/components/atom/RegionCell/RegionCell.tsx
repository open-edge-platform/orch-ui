/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { SquareSpinner } from "@orch-ui/components";
import { getInfraPath, regionRoute, SharedStorage } from "@orch-ui/utils";
import React from "react";
import { Link } from "react-router-dom";

const dataCy = "regionCell";

interface RegionCellProps {
  regionId?: string;
}

/**
 * Given a RegionId renders the Region name and a link to the Region detail page
 */
const RegionCell: React.FC<RegionCellProps> = (props) => {
  const cy = { "data-cy": dataCy };
  const { regionId } = props;
  const projectName = SharedStorage.project?.name ?? "";

  /*eslint-disable @typescript-eslint/no-non-null-assertion*/
  const {
    data: region,
    isLoading,
    isError,
  } = infra.useRegionServiceGetRegionQuery(
    {
      projectName: projectName,
      resourceId: regionId!,
    },
    { skip: !regionId || !projectName },
  );

  if (!regionId) {
    return <div {...cy}> - </div>;
  }

  if (isLoading) {
    return <SquareSpinner {...cy} />;
  }

  if (isError || !region) {
    return (
      <Link {...cy} to={getInfraPath(regionRoute, { regionId: regionId })}>
        {regionId}
      </Link>
    );
  }

  return (
    <Link {...cy} to={getInfraPath(regionRoute, { regionId: regionId })}>
      {region.name}
    </Link>
  );
};

export default RegionCell;
