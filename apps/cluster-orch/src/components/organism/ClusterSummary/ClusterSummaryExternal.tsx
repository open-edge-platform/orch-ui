/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { Provider } from "react-redux";
import { store } from "../../../store";
import ClusterSummary, { ClusterSummaryProps } from "./ClusterSummary";
import "./ClusterSummary.scss";

const ClusterSummaryExternal = ({ nodeId, site }: ClusterSummaryProps) => (
  <Provider store={store}>
    <ClusterSummary nodeId={nodeId} site={site} />
  </Provider>
);

export default ClusterSummaryExternal;
