/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { getAuthCfg } from "@orch-ui/utils";
import { AuthProvider } from "react-oidc-context";
import { Provider } from "react-redux";
import { store } from "../../../store";
import ClusterTemplateVersionsDropdown, {
  ClusterTemplateVersionsDropdownProps,
} from "./ClusterTemplateVersionsDropdown";

const ClusterTemplateVersionsDropdownExternal = (
  props: ClusterTemplateVersionsDropdownProps,
) => (
  <Provider store={store}>
    <AuthProvider {...getAuthCfg()}>
      <ClusterTemplateVersionsDropdown {...props} />
    </AuthProvider>
  </Provider>
);

export default ClusterTemplateVersionsDropdownExternal;
