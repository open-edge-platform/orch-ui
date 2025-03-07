/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim } from "@orch-ui/apis";
import { parseError, SharedStorage } from "@orch-ui/utils";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../store/hooks";
import { setErrorInfo } from "../../../store/notifications";

export const dataCy = "hostLink";

export interface HostLinkProps {
  id?: string;
  uuid?: string;
}

export const HostLink = ({ id, uuid }: HostLinkProps) => {
  const cy = { "data-cy": dataCy };
  const dispatch = useAppDispatch();

  const [host, setHost] = useState<eim.HostRead>();

  const hostsQuery = eim.useGetV1ProjectsByProjectNameComputeHostsQuery(
    {
      projectName: SharedStorage.project?.name ?? "",
      uuid: uuid,
      detail: true,
    },
    {
      skip: !uuid, // Skip call if url does not include uuid
    },
  );

  const hostQuery = eim.useGetV1ProjectsByProjectNameComputeHostsAndHostIdQuery(
    {
      projectName: SharedStorage.project?.name ?? "",
      hostId: id ?? "",
    },
    {
      skip: !id, // Skip call if url does not include host-id
    },
  );

  useEffect(() => {
    if (!hostQuery.isLoading && !hostQuery.isError && hostQuery.data && id) {
      setHost(hostQuery.data);
    }
    if (hostQuery.isError) {
      const e = parseError(hostQuery.error);
      dispatch(setErrorInfo(e));
    }
  }, [hostQuery]);

  useEffect(() => {
    if (
      !hostsQuery.isLoading &&
      !hostsQuery.isError &&
      hostsQuery.data &&
      hostsQuery.data.hosts &&
      uuid
    ) {
      const h = hostsQuery.data.hosts[0];
      setHost(h);
    }
    if (hostsQuery.isError && hostsQuery.error) {
      const e = parseError(hostsQuery.error);
      dispatch(setErrorInfo(e));
    }
  }, [hostsQuery]);

  return (
    <Link
      {...cy}
      className="host-link"
      to={`/infrastructure/${host?.site ? "host" : "unconfigured-host"}/${
        host?.resourceId
      }`}
      relative="path"
    >
      {host?.name || host?.resourceId}
    </Link>
  );
};
