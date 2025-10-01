/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Drawer } from "@spark-design/react";
import CreateOsUpdatePolicy from "../../organism/CreateOsUpdatePolicy/CreateOsUpdatePolicy";
import "./OsUpdatePolicy.scss";

interface OsUpdatePolicyDrawerProps {
  showDrawer: boolean;
  setShowDrawer: (show: boolean) => void;
}

const CreateOsUpdatePolicyDrawer = ({
  showDrawer,
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
        title: "Create OS Update Policy",
        // className: "os-profile-drawer-header",
      }}
      bodyContent={<CreateOsUpdatePolicy />}
      data-cy="osProfileDrawerContent"
    />
  );
};

export default CreateOsUpdatePolicyDrawer;
