/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Header,
  HeaderItem,
  HeaderSize,
  RBACWrapper,
} from "@orch-ui/components";
import "@orch-ui/styles/Global.scss";
import "@orch-ui/styles/spark-global.scss";
import "@orch-ui/styles/transitions.scss";
import { Role, SharedStorage, StorageItems } from "@orch-ui/utils";
import { useEffect, useReducer } from "react";
import { useOutlet } from "react-router-dom";

const Layout = () => {
  const currentOutlet = useOutlet();

  // NOTE that it's possible that when the Layout renders an "Active Project" is not stored in the local storage yet
  // if that's the case the hasRole(..) method used by the RBACWrapper returns false.
  // This listener forces an update when the Project is stored
  const [, forceUpdate] = useReducer((o) => !o, false);
  useEffect(() => {
    const handleProjectUpdate = () => {
      if (SharedStorage.project) {
        forceUpdate();
      }
    };
    // Code to run when the component mounts
    window.addEventListener(
      SharedStorage.getStorageEvents(StorageItems.PROJECT),
      handleProjectUpdate,
    );
    return () => {
      // Cleanup code to run when the component unmounts
      window.removeEventListener(
        SharedStorage.getStorageEvents(StorageItems.PROJECT),
        handleProjectUpdate,
      );
    };
  }, []); // Empty dependency array ensures this runs only on mount and unmount

  const headerSize = HeaderSize.Large;

  const deploymentsRoles = [Role.CATALOG_READ, Role.AO_WRITE];

  const infraRoles = [
    Role.CLUSTERS_WRITE,
    Role.INFRA_MANAGER_READ,
    Role.INFRA_MANAGER_WRITE,
  ];

  const dashboardRoles = [...deploymentsRoles, ...infraRoles];

  const alertRoles = [Role.ALERTS_READ, Role.ALERTS_WRITE];

  return (
    <>
      <Header size={headerSize}>
        <RBACWrapper showTo={dashboardRoles}>
          <HeaderItem
            name="menuDashboard"
            to="/dashboard"
            match="dashboard"
            size={headerSize}
            matchRoot
          >
            Dashboard
          </HeaderItem>
        </RBACWrapper>
        <RBACWrapper showTo={deploymentsRoles}>
          <HeaderItem
            name="menuDeployments"
            to="/applications/deployments"
            match="applications"
            size={headerSize}
          >
            Deployments
          </HeaderItem>
        </RBACWrapper>
        <RBACWrapper showTo={infraRoles}>
          <HeaderItem
            name="menuInfrastructure"
            to="/infrastructure"
            match="infrastructure"
            size={headerSize}
          >
            Infrastructure
          </HeaderItem>
        </RBACWrapper>
        <RBACWrapper showTo={alertRoles}>
          <HeaderItem
            name="menuAlerts"
            to="/admin/alerts"
            match="admin/alerts"
            size={headerSize}
          >
            Alerts
          </HeaderItem>
        </RBACWrapper>
      </Header>
      <div>{currentOutlet}</div>
    </>
  );
};

export default Layout;
