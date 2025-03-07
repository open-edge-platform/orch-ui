/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { setBreadcrumb } from "@orch-ui/components";
import { getAuthCfg } from "@orch-ui/utils";
import { useEffect } from "react";
import { AuthProvider } from "react-oidc-context";
import { Provider } from "react-redux";
import { store } from "../../store";
import { useAppDispatch } from "../../store/hooks";
import ClusterManagement from "./ClusterManagement";

const ClusterManagementExternal = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setBreadcrumb([]));
  }, []);

  return (
    <Provider store={store}>
      <AuthProvider {...getAuthCfg()}>
        <ClusterManagement />
      </AuthProvider>
    </Provider>
  );
};

export default ClusterManagementExternal;
