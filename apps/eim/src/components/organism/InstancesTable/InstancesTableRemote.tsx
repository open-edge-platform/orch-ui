/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { Provider } from "react-redux";
import { store } from "../../../store/store";
import InstancesTable, { InstancesTableProps } from "./InstancesTable";

const InstancesTableRemote = (props: InstancesTableProps) => (
  <Provider store={store}>
    <InstancesTable {...{ ...props }} />
  </Provider>
);

export default InstancesTableRemote;
