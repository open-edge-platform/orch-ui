/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim } from "@orch-ui/apis";
import { SquareSpinner, TypedMetadata } from "@orch-ui/components";
import { SharedStorage } from "@orch-ui/utils";
import React, { Suspense, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { setClusterSelectedSite } from "../../../../../store/reducers/cluster";
import {
  getLocations,
  updateRegionId,
  updateRegionName,
  updateSiteId,
  updateSiteName,
} from "../../../../../store/reducers/locations";

export const dataCy = "selectSite";

export const ORDER_BY = "name asc";

const RegionSiteRemote =
  window.__RUNTIME_CONFIG__?.MFE.CLUSTER_ORCH === "true"
    ? React.lazy(async () => await import("EimUI/RegionSiteTree"))
    : null;

export interface SearchTypeItem {
  id: string;
  name: string;
}
interface SelectSiteProps {
  selectedSite?: eim.SiteRead;
  selectedRegion?: eim.Region;
  onSelectedInheritedMeta: (value: TypedMetadata[]) => void;
}

const SelectSite = ({
  selectedSite,
  onSelectedInheritedMeta,
}: SelectSiteProps) => {
  const currentLocations = useAppSelector(getLocations);

  const dispatch = useAppDispatch();
  const cy = { "data-cy": dataCy };
  const className = "region-site-tree";
  const query = new URLSearchParams(useLocation().search);

  const preRegionId = query.get("regionId");
  const preRegionName = query.get("regionName");

  const preSiteId = query.get("siteId");
  const preSiteName = query.get("siteName");

  const { data: preSelectedSite, isLoading } =
    eim.useGetV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteIdQuery(
      {
        projectName: SharedStorage.project?.name ?? "",
        regionId: preRegionId ?? "*",
        siteId: preSiteId ?? "",
      },
      { skip: !preSiteId || !SharedStorage.project?.name },
    );

  useEffect(() => {
    if (
      preSelectedSite &&
      preSelectedSite.region?.resourceId === preRegionId &&
      preRegionName &&
      preSiteId &&
      preSiteName
    ) {
      dispatch(updateRegionId(preRegionId));
      dispatch(updateRegionName(preRegionName));
      dispatch(updateSiteId(preSiteId));
      dispatch(updateSiteName(preSiteName));
      dispatch(setClusterSelectedSite(preSelectedSite));
    }
  }, [preRegionId, preSiteId, preSelectedSite]);

  useEffect(() => {
    // Get Row Data for Site Selection
    const siteMetadata: TypedMetadata[] = [];
    const regionMetadata: TypedMetadata[] = [];
    if (selectedSite?.inheritedMetadata?.location) {
      selectedSite.inheritedMetadata.location.map((metadata: TypedMetadata) => {
        regionMetadata.push({
          key: metadata.key,
          value: metadata.value,
          type: "region",
        });
      });
    }
    if (selectedSite?.metadata) {
      selectedSite.metadata.map((metadata: TypedMetadata) => {
        siteMetadata.push({
          key: metadata.key,
          value: metadata.value,
          type: "site",
        });
      });
    }
    onSelectedInheritedMeta([...regionMetadata, ...siteMetadata]);
  }, [selectedSite, currentLocations]);

  const handleOnSiteSelected = (site: eim.SiteRead) => {
    dispatch(updateRegionName(site.region?.name ?? ""));
    dispatch(updateRegionId(site.region?.resourceId ?? ""));
    dispatch(updateSiteId(site.resourceId ?? ""));
    dispatch(updateSiteName(site.name ?? ""));
    dispatch(setClusterSelectedSite(site));
  };
  return (
    <div {...cy} className={className}>
      {isLoading && <SquareSpinner />}
      {RegionSiteRemote && !isLoading && (
        <Suspense fallback={<SquareSpinner />}>
          <RegionSiteRemote
            handleOnSiteSelected={handleOnSiteSelected}
            selectedSite={selectedSite}
            showSingleSelection={preSiteId !== null}
          />
        </Suspense>
      )}
    </div>
  );
};

export default SelectSite;
