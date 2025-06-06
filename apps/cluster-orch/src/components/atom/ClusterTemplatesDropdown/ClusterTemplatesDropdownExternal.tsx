/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { getAuthCfg } from "@orch-ui/utils";
import { AuthProvider } from "react-oidc-context";
import { Provider } from "react-redux";
import { store } from "../../../store";
import ClusterTemplatesDropdown, {
  ClusterTemplatesDropdownProps,
} from "./ClusterTemplatesDropdown";

const ClusterTemplatesDropdownExternal = (
  props: ClusterTemplatesDropdownProps,
) => (
  <Provider store={store}>
    <AuthProvider {...getAuthCfg()}>
      <ClusterTemplatesDropdown {...props} />
    </AuthProvider>
  </Provider>
);

export default ClusterTemplatesDropdownExternal;
