/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { setBreadcrumb } from "@orch-ui/components";
import { checkAuthAndRole, getAuthCfg, Role } from "@orch-ui/utils";
import { Heading } from "@spark-design/react";
import { useEffect, useMemo } from "react";
import { AuthProvider } from "react-oidc-context";
import { Provider } from "react-redux";
import { clustersBreadcrumb, homeBreadcrumb } from "../../routes/const";
import { store } from "../../store";
import { useAppDispatch } from "../../store/hooks";
import ClusterList from "../organism/cluster/ClusterList";

function ClusterManagement() {
  const dispatch = useAppDispatch();
  const breadcrumb = useMemo(() => [homeBreadcrumb, clustersBreadcrumb], []);
  useEffect(() => {
    dispatch(setBreadcrumb(breadcrumb));
  }, []);
  return (
    <>
      <Heading semanticLevel={1} size="l">
        Cluster List
      </Heading>
      <ClusterList hasPermission={checkAuthAndRole([Role.CLUSTERS_WRITE])} />
    </>
  );
}

export default () => (
  <Provider store={store}>
    <AuthProvider {...getAuthCfg()}>
      <ClusterManagement />
    </AuthProvider>
  </Provider>
);
