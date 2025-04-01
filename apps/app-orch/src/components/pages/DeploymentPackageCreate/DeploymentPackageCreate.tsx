/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { setActiveNavItem, setBreadcrumb } from "@orch-ui/components";
import { useEffect, useMemo } from "react";
import {
  createDeploymentPackageBreadcrumb,
  deploymentPackageBreadcrumb,
  homeBreadcrumb,
  packagesNavItem,
} from "../../../routes/const";
import { useAppDispatch } from "../../../store/hooks";
import { clearDeploymentPackage } from "../../../store/reducers/deploymentPackage";
import DeploymentPackageCreateEdit from "../../organisms/deploymentPackages/DeploymentPackageCreateEdit/DeploymentPackageCreateEdit";

const dataCy = "deploymentPackageCreate";

const DeploymentPackageCreate = () => {
  const cy = { "data-cy": dataCy };

  const dispatch = useAppDispatch();
  const breadcrumb = useMemo(
    () => [
      homeBreadcrumb,
      deploymentPackageBreadcrumb,
      createDeploymentPackageBreadcrumb,
    ],
    [],
  );

  useEffect(() => {
    dispatch(setBreadcrumb(breadcrumb));
    dispatch(setActiveNavItem(packagesNavItem));
  }, []);

  dispatch(clearDeploymentPackage());

  return (
    <div {...cy} className="deployment-package-create">
      <DeploymentPackageCreateEdit mode="add" />
    </div>
  );
};

export default DeploymentPackageCreate;
