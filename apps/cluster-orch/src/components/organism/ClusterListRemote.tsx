/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Provider } from "react-redux";
import { store } from "../../store";
import ClusterList, { ClusterListProps } from "./ClusterList/ClusterList";

const ClusterListRemote = (props: ClusterListProps) => (
  <Provider store={store}>
    <ClusterList {...{ ...props }} />
  </Provider>
);

export default ClusterListRemote;
