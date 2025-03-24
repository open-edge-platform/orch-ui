/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from "react-redux";
import { store } from "../../../store/store";
import { HostLink, HostLinkProps } from "./HostLink";

export const HostLinkRemote = (props: HostLinkProps) => (
  <Provider store={store}>
    <HostLink {...{ ...props }} />
  </Provider>
);

export default HostLinkRemote;
