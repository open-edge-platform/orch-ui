/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { setActiveNavItem, setBreadcrumb } from "@orch-ui/components";
import { checkAuthAndRole, Role } from "@orch-ui/utils";
import { Heading } from "@spark-design/react";
import { useEffect, useMemo, useState } from "react";
import {
  createDeploymentBreadcrumb,
  deploymentBreadcrumb,
  deploymentsNavItem,
  homeBreadcrumb,
} from "../../../routes/const";
import { useAppDispatch } from "../../../store/hooks";
import DeploymentsTable from "../../organisms/deployments/DeploymentsTable/DeploymentsTable";
import "./Deployments.scss";

const Deployments = () => {
  const dispatch = useAppDispatch();
  const [setupDeployment, setSetupDeployment] = useState(false);
  const breadcrumb = useMemo(() => {
    if (setupDeployment) {
      return [homeBreadcrumb, deploymentBreadcrumb, createDeploymentBreadcrumb];
    } else {
      return [homeBreadcrumb, deploymentBreadcrumb];
    }
  }, [setupDeployment]);

  useEffect(() => {
    dispatch(setBreadcrumb(breadcrumb));
    dispatch(setActiveNavItem(deploymentsNavItem));
  }, [setupDeployment]);

  return (
    <div className="deployments" data-cy="deployments">
      <Heading semanticLevel={1} size="l">
        Deployments
      </Heading>

      <DeploymentsTable
        hasPermission={checkAuthAndRole([Role.AO_WRITE])}
        onActionPress={() => {
          setSetupDeployment(true);
        }}
        poll
      />
    </div>
  );
};

export default Deployments;
