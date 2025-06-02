/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { getAuthCfg } from "@orch-ui/utils";
import { AuthProvider } from "react-oidc-context";
import { Provider } from "react-redux";
import { store } from "../../store";
import ClusterManagement from "./ClusterManagement";

const ClusterManagementExternal = () => {
  return (
    <Provider store={store}>
      <AuthProvider {...getAuthCfg()}>
        <ClusterManagement />
      </AuthProvider>
    </Provider>
  );
};

export default ClusterManagementExternal;
