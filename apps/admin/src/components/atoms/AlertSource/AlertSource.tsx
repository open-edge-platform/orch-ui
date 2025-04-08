/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { omApi } from "@orch-ui/apis";
import { SquareSpinner } from "@orch-ui/components";
import { RuntimeConfig } from "@orch-ui/utils";
import React, { ComponentType, LazyExoticComponent, Suspense } from "react";
import { Link } from "react-router-dom";
import "./AlertSource.scss";

type RemoteComponent = LazyExoticComponent<ComponentType<any>> | null;

let HostLink: RemoteComponent = null;
let DeploymentLink: RemoteComponent = null;

if (RuntimeConfig.isEnabled("INFRA")) {
  //Updated path for test to run
  HostLink = React.lazy(async () => await import("EimUI/HostLink"));
}

if (RuntimeConfig.isEnabled("APP_ORCH")) {
  DeploymentLink = React.lazy(
    async () => await import("AppOrchUI/DeploymentLink"),
  );
}

const dataCy = "alertSource";

interface AlertSourceProps {
  alert: omApi.Alert;
}
const AlertSource = ({ alert }: AlertSourceProps) => {
  const cy = { "data-cy": dataCy };

  const route = () => {
    switch (alert.labels?.alert_context) {
      case "cluster":
        return `/infrastructure/cluster/${alert.labels?.cluster_name}`;
      default:
        return "/alerts";
    }
  };

  const name = () => {
    switch (alert.labels?.alert_context) {
      case "cluster":
        return alert.labels?.cluster_name;
      default:
        return "no source";
    }
  };

  return (
    <div {...cy} className="alert-source">
      {alert.labels?.alert_context === "host" && HostLink && (
        <Suspense fallback={<SquareSpinner message="One moment..." />}>
          <HostLink uuid={alert.labels?.host_uuid} />
        </Suspense>
      )}
      {alert.labels?.alert_context === "deployment" && DeploymentLink && (
        <Suspense fallback={<SquareSpinner message="One moment..." />}>
          <DeploymentLink deplId={alert.labels?.deployment_id} />
        </Suspense>
      )}
      {!["host", "deployment"].includes(alert.labels?.alert_context ?? "") && (
        <Link to={route()}>{name()}</Link>
      )}
    </div>
  );
};

export default AlertSource;
