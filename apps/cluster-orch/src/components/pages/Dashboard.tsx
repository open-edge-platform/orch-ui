/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { Heading } from "@spark-design/react";
import { Provider } from "react-redux";

import { store } from "../../store";
import ClustersBarChart from "../organism/cluster/ClusterBarChart";
import ClusterList from "../organism/cluster/ClusterList";

import "./Dashboard.scss";

const Summary = () => {
  return (
    <Provider store={store}>
      <div className="cluster-dashboard">
        <Heading semanticLevel={2} size="l">
          Clusters
        </Heading>
        <ClustersBarChart />
        <ClusterList />
      </div>
    </Provider>
  );
};

export default Summary;
