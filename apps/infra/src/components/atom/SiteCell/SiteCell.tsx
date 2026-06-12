/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { SquareSpinner } from "@orch-ui/components";
import { SharedStorage } from "@orch-ui/utils";
import { Drawer } from "@spark-design/react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectSite, setSite } from "../../../store/locations";
import { DrawerHeader } from "../../molecules/DrawerHeader/DrawerHeader";
import { handleSiteViewAction } from "../../organism/locations/RegionSiteTree/RegionSiteTree.handlers";
import { SiteView } from "../../organism/locations/SiteView/SiteView";
const dataCy = "siteCell";

export interface SiteDetailsDrawerProps {
  basePath?: string;
  hideActions?: boolean;
}

export const SiteDetailsDrawer = ({
  basePath,
  hideActions,
}: SiteDetailsDrawerProps) => {
  const dispatch = useAppDispatch();
  const site = useAppSelector(selectSite);
  return (
    <Drawer
      show={site !== undefined}
      headerProps={{
        headerContent: site && (
          <DrawerHeader
            targetEntity={site}
            targetEntityType="site"
            onClose={() => dispatch(setSite(undefined))}
          />
        ),
      }}
      bodyContent={<SiteView basePath={basePath} hideActions={hideActions} />}
      backdropClosable
      onHide={() => dispatch(setSite(undefined))}
    />
  );
};

export interface SiteCellProps {
  siteId?: string;
  regionId?: string;
  basePath?: string;
}
const SiteCell = ({ siteId, regionId = "*" }: SiteCellProps) => {
  const cy = { "data-cy": dataCy };
  const dispatch = useAppDispatch();

  const {
    data: site,
    isLoading,
    isError,
  } = infra.useSiteServiceGetSiteQuery(
    {
      regionId,
      projectName: SharedStorage.project?.name ?? "",
      resourceId: siteId!,
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
    <>
      <a
        {...cy}
        role="button"
        tabIndex={0}
        style={{ cursor: "pointer" }}
        onClick={() => handleSiteViewAction(dispatch, site)}
      >
        {site.name}
      </a>
      <SiteDetailsDrawer />
    </>
  );
};

export default SiteCell;
