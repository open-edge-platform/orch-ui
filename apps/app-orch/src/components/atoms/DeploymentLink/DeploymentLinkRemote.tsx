/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from "react-redux";
import { store } from "../../../store";
import { DeploymentLink, DeploymentLinkProps } from "./DeploymentLink";

export const DeploymentLinkRemote = (props: DeploymentLinkProps) => (
  <Provider store={store}>
    <DeploymentLink {...props} />
  </Provider>
);

export default DeploymentLinkRemote;
