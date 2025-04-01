/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Heading } from "@spark-design/react";
import { Provider } from "react-redux";

import { store } from "../../../store";
import DeploymentsTable from "../../organisms/deployments/DeploymentsTable/DeploymentsTable";

import "./Dashboard.scss";

const Dashboard = () => {
  return (
    <Provider store={store}>
      <div className="orchestration-dashboard">
        <Heading semanticLevel={2} size="l">
          Orchestration (Deployments)
        </Heading>
        <DeploymentsTable hideColumns={["Actions"]} />
      </div>
    </Provider>
  );
};

export default Dashboard;
