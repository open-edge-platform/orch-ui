/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { checkAuthAndRole, getAuthCfg, Role } from "@orch-ui/utils";
import { Heading } from "@spark-design/react";
import { AuthProvider } from "react-oidc-context";
import { Provider } from "react-redux";
import { store } from "../../store";
import ClusterList from "../organism/cluster/ClusterList";

function ClusterManagement() {
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
