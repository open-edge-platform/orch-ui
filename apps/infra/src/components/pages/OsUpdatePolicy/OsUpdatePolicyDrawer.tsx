/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";

import { Drawer } from "@spark-design/react";

import OsUpdatePolicyDetails from "../../organism/OsUpdatePolicyDetails/OsUpdatePolicyDetails";
import "./OsUpdatePolicy.scss";

interface OsUpdatePolicyDrawerProps {
  showDrawer: boolean;
  selectedOsUpdatePolicy: infra.OsUpdatePolicyRead;
  setShowDrawer: (show: boolean) => void;
}

const OsUpdatePolicyDetailsDrawer = ({
  showDrawer,
  selectedOsUpdatePolicy,
  setShowDrawer,
}: OsUpdatePolicyDrawerProps) => {
  return (
    <Drawer
      show={showDrawer}
      backdropClosable
      onHide={() => {
        setShowDrawer(false);
      }}
      headerProps={{
        title: selectedOsUpdatePolicy.name,
        className: "os-profile-drawer-header",
      }}
      bodyContent={
        <OsUpdatePolicyDetails osUpdatePolicy={selectedOsUpdatePolicy} />
      }
      data-cy="osProfileDrawerContent"
    />
  );
};

export default OsUpdatePolicyDetailsDrawer;
