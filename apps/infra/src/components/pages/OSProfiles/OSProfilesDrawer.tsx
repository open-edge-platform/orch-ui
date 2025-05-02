/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";

import { Drawer } from "@spark-design/react";

import OSProfileDetails from "../../organism/OSProfileDetails/OSProfileDetails";
import "./OSProfiles.scss";

interface OSProfileDrawerProps {
  showDrawer: boolean;
  selectedOsProfile: infra.OperatingSystemResourceRead;
  setShowDrawer: (show: boolean) => void;
}

const OSProfileDetailsDrawer = ({
  showDrawer,
  selectedOsProfile,
  setShowDrawer,
}: OSProfileDrawerProps) => {
  return (
    <Drawer
      show={showDrawer}
      backdropClosable
      onHide={() => {
        setShowDrawer(false);
      }}
      headerProps={{
        title: selectedOsProfile.name,
        className: "os-profile-drawer-header",
      }}
      bodyContent={<OSProfileDetails os={selectedOsProfile} />}
      data-cy="osProfileDrawerContent"
    />
  );
};

export default OSProfileDetailsDrawer;
