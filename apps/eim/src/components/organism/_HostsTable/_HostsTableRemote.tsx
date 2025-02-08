/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { Provider } from "react-redux";
import { store } from "../../../store/store";
import _HostsTable, { _HostsTableProps } from "./_HostsTable";

const _HostsTableRemote = (props: _HostsTableProps) => (
  <Provider store={store}>
    <_HostsTable {...{ ...props }} />
  </Provider>
);

export default _HostsTableRemote;
