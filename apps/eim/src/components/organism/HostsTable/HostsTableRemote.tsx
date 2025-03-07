/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from "react-redux";
import { store } from "../../../store/store";
import HostsTable, { HostsTableProps } from "./HostsTable";

const HostsTableRemote = (props: HostsTableProps) => (
  <Provider store={store}>
    <HostsTable {...{ ...props }} />
  </Provider>
);

export default HostsTableRemote;
