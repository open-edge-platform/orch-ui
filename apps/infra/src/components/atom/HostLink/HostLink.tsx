/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import {
  getInfraPath,
  hostDetailsRoute,
  parseError,
  SharedStorage,
} from "@orch-ui/utils";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../store/hooks";
import { setErrorInfo } from "../../../store/notifications";

const dataCy = "hostLink";

export interface HostLinkProps {
  id?: string;
  uuid?: string;
}

export const HostLink = ({ id, uuid }: HostLinkProps) => {
  const cy = { "data-cy": dataCy };
  const dispatch = useAppDispatch();

  const [host, setHost] = useState<infra.HostRead>();

  const hostsQuery = infra.useHostServiceListHostsQuery(
    {
      projectName: SharedStorage.project?.name ?? "",
      uuid: uuid, // TODO: needs to go in filter
      detail: true,
    },
    {
      skip: !uuid, // Skip call if url does not include uuid
    },
  );

  const hostQuery =
    infra.useGetV1ProjectsByProjectNameComputeHostsAndHostIdQuery(
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

  return host?.resourceId ? (
    <Link
      {...cy}
      className="host-link"
      to={`${getInfraPath(hostDetailsRoute, { id: host.resourceId })}`}
      relative="path"
    >
      {host.name || host.resourceId}
    </Link>
  ) : (
    <>{host?.name}</>
  );
};
