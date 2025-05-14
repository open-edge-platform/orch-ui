/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { getAuthCfg } from "@orch-ui/utils";
import { AuthProvider } from "react-oidc-context";
import { Provider } from "react-redux";
import { store } from "../../../store";
import ClusterEdit from "./ClusterEdit";

const ClusterEditExternal = () => (
  <Provider store={store}>
    <AuthProvider {...getAuthCfg()}>
      <ClusterEdit />
    </AuthProvider>
  </Provider>
);

export default ClusterEditExternal;
