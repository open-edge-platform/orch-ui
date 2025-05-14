/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { getAuthCfg } from "@orch-ui/utils";
import { AuthProvider } from "react-oidc-context";
import { Provider } from "react-redux";
import { store } from "../../store";
import ClusterDetail, {
  ClusterDetailProps,
} from "./ClusterDetail/ClusterDetail";
import "./ClusterDetail/ClusterDetail.scss";

const ClusterDetailExternal = ({
  hasHeader = true,
  name,
}: ClusterDetailProps) => (
  <Provider store={store}>
    <AuthProvider {...getAuthCfg()}>
      <ClusterDetail hasHeader={hasHeader} name={name} />
    </AuthProvider>
  </Provider>
);

export default ClusterDetailExternal;
