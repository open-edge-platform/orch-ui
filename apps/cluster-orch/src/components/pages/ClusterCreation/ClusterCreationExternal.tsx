/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { getAuthCfg } from "@orch-ui/utils";
import { AuthProvider } from "react-oidc-context";
import { Provider } from "react-redux";
import { store } from "../../../store";
import ClusterCreation from "./ClusterCreation";

const ClusterCreationExternal = () => (
  <Provider store={store}>
    <AuthProvider {...getAuthCfg()}>
      <ClusterCreation />
    </AuthProvider>
  </Provider>
);

export default ClusterCreationExternal;
