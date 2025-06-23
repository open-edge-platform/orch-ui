/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Popup, PopupOption } from "@orch-ui/components";
import { useNavigate } from "react-router-dom";
import { checkAuthAndRole, Role } from "@orch-ui/utils";
import { Icon } from "@spark-design/react";

export interface DeploymentPackagePopupProps {
  jsx?: React.ReactNode;
}

const DeploymentPackagePopup = ({ jsx }: DeploymentPackagePopupProps) => {
  const navigate = useNavigate();

  const hasWriteAccess = checkAuthAndRole([Role.CATALOG_WRITE]);

  const popupOptions: PopupOption[] = [
    {
      displayText: "Create",
      disable: false,
      onSelect: () => {
        navigate("/applications/packages/create");
      },
    },
    {
      displayText: "Import from file",
      disable: false,
      onSelect: () => {
        navigate("/applications/packages/import");
      },
    },
    {
      displayText: "Import Helm Chart",
      disable: false,
      onSelect: () => {
        navigate("/applications/packages/import-from-helm-chart");
      },
    },
  ];

  return (
    <div className="deployment-package-popup" data-cy="deploymentPackagePopup">
      <Popup
        jsx={
          jsx ?? (
            <button className="spark-button spark-button-action spark-button-size-l">
              <span className="spark-button-content">
                Deployment Packages Actions
                <Icon className="pa-1 mb-1" icon="chevron-down" style={{ marginLeft: "0.5rem" }}/>
              </span>
            </button>
          )
        }
        options={popupOptions}
      />
    </div>
  );
};

export default DeploymentPackagePopup;