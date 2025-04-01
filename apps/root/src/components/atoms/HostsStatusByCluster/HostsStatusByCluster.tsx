/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim } from "@orch-ui/apis";
import { StatusIcon } from "@orch-ui/components";
import {
  hostProviderStatusToString,
  hostStatusIndicatorToIconStatus,
  InternalError,
  parseError,
} from "@orch-ui/utils";
import { MessageBanner } from "@spark-design/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../store/hooks";
import { AppDispatch } from "../../../store/store";
import { getHosts as gH, getHostsList as gHL } from "../../../utils/helpers";
import "./HostsStatusByCluster.scss";

const dataCy = "hostsStatusByCluster";

interface HostsStatusByClusterProps {
  clusterName: string;
  // the following props are intended to simplify testing,
  // avoid using
  getHostsList?: (
    dispatch: AppDispatch,
    clusterNames?: string[],
  ) => Promise<string[]>;
  getHosts?: (
    dispatch: AppDispatch,
    uuids: string[],
  ) => Promise<eim.HostRead[]>;
}

/**
 * Given a specific cluster name this component will:
 * - fetch a list of nodes
 * - read the GUID
 * - find the corresponding Host
 * - display the status
 */
const HostsStatusByCluster = ({
  clusterName,
  getHostsList = gHL,
  getHosts = gH,
}: HostsStatusByClusterProps) => {
  const cy = { "data-cy": dataCy };

  const [error, setError] = useState<InternalError | undefined>();
  const [hosts, setHosts] = useState<eim.HostRead[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getHostsList(dispatch, [clusterName])
      .then((hostGuids) => getHosts(dispatch, hostGuids))
      .then((hosts) => {
        setHosts(hosts);
      })
      .catch((e) => setError(parseError(e)));
  }, [clusterName]);

  if (error) {
    return (
      <div {...cy}>
        <div data-cy="error">
          <MessageBanner
            variant={"error"}
            messageTitle={""}
            messageBody={`[Status: ${error.status}] ${error.data}`}
            showIcon
            outlined
          />
        </div>
      </div>
    );
  }

  return (
    <div {...cy} className="hosts-status-by-cluster">
      {hosts.map((h, i) => (
        <Link key={i} to={`/infrastructure/host/${h.resourceId}`}>
          <StatusIcon
            data-cy="hostStatus"
            status={hostStatusIndicatorToIconStatus(h)}
            text={hostProviderStatusToString(h)}
          />
        </Link>
      ))}
    </div>
  );
};

export default HostsStatusByCluster;
