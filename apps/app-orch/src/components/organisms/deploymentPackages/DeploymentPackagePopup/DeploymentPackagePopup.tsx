/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Popup, PopupOption } from "@orch-ui/components";
import { Icon } from "@spark-design/react";
import { useNavigate } from "react-router-dom";

export interface DeploymentPackagePopupProps {
  jsx?: React.ReactNode;
}

export const PACKAGES_BASE_PATH = "/applications/packages";

const DeploymentPackagePopup = ({ jsx }: DeploymentPackagePopupProps) => {
  const navigate = useNavigate();

  const popupOptions: PopupOption[] = [
    {
      displayText: "Create",
      disable: false,
      onSelect: () => {
        navigate(`${PACKAGES_BASE_PATH}/create`);
      },
    },
    {
      displayText: "Import from file",
      disable: false,
      onSelect: () => {
        navigate(`${PACKAGES_BASE_PATH}/import`);
      },
    },
    {
      displayText: "Import Helm Chart",
      disable: false,
      onSelect: () => {
        navigate(`${PACKAGES_BASE_PATH}/import-from-helm-chart`);
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
                <Icon
                  className="pa-1 mb-1"
                  icon="chevron-down"
                  style={{ marginLeft: "0.5rem" }}
                />
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
