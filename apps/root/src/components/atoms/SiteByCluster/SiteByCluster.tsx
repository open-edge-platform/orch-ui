/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { InternalError, parseError } from "@orch-ui/utils";
import { MessageBanner, ProgressLoader } from "@spark-design/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../store/hooks";
import { getHosts, getHostsList, getSite } from "../../../utils/helpers";

const dataCy = "SiteByCluster";
interface SiteByClusterProps {
  clusterName: string;
}
const SiteByCluster = ({ clusterName }: SiteByClusterProps) => {
  const cy = { "data-cy": dataCy };
  const dispatch = useAppDispatch();

  const [siteId, setSiteId] = useState<string>();
  const [siteName, setSiteName] = useState<string>();
  const [siteRegionId, setRegionId] = useState<string>();
  const [error, setError] = useState<InternalError | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getHostsList(dispatch, [clusterName])
      .then((hostIds) => {
        // clusters don't span across site, so regardless of the number of nodes
        // we only need to know where the first one is
        if (hostIds.length === 0) {
          setError({
            status: "CUSTOM_ERROR",
            data: `Cluster ${clusterName} does not have any node`,
          });
        } else {
          return getHosts(dispatch, [hostIds[0]]);
        }
      })
      .then((hosts) => {
        if (!hosts || hosts.length === 0 || !hosts[0].site) {
          setError({
            status: "CUSTOM_ERROR",
            data: "No Hosts found or Host does not have an associated site",
          });
        } else {
          setSiteId(hosts[0].site.resourceId);
          return getSite(dispatch, hosts[0].site.resourceId ?? "");
        }
      })
      .then((res: infra.SiteRead) => {
        setIsLoading(false);
        setRegionId(res?.region?.resourceId);
        setSiteName(res?.name);
      })
      .catch((e) => setError(parseError(e)));
  }, [clusterName]);

  if (error) {
    return (
      <div {...cy}>
        <div data-cy="error">
          <MessageBanner
            variant="error"
            messageTitle=""
            messageBody={`[Status: ${error.status}] ${error.data}`}
            showIcon
            outlined
          />
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div {...cy}>
        <ProgressLoader data-cy="loader" variant="circular" />
      </div>
    );
  }

  return (
    <div {...cy}>
      <Link to={`/infrastructure/regions/${siteRegionId}/sites/${siteId}`}>
        {siteName}
      </Link>
    </div>
  );
};

export default SiteByCluster;
