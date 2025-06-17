/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Ribbon,
  setActiveNavItem,
  setBreadcrumb,
} from "@orch-ui/components";
import { checkAuthAndRole, Role } from "@orch-ui/utils";
import { Heading, Item, Tabs, Text, } from "@spark-design/react";
import { HeaderSize } from "@spark-design/tokens";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  deploymentPackageBreadcrumb,
  homeBreadcrumb,
  packagesNavItem,
} from "../../../routes/const";
import { useAppDispatch } from "../../../store/hooks";
import DeploymentPackagesTable from "../../organisms/deploymentPackages/DeploymentPackageTable/DeploymentPackageTable";
import "./DeploymentPackages.scss";
import DeploymentPackagePopup from "src/components/organisms/deploymentPackages/DeploymentPackagePopup/DeploymentPackagePopup";


const dataCy = "deploymentPackages";

const DeploymentPackages = () => {
  const cy = { "data-cy": dataCy };

  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const breadcrumb = useMemo(
    () => [homeBreadcrumb, deploymentPackageBreadcrumb],
    [],
  );

  const [tabIndex, setTabIndex] = useState<number>(0);

  useEffect(() => {
    dispatch(setBreadcrumb(breadcrumb));
    dispatch(setActiveNavItem(packagesNavItem));
  }, []);

  return (
    <div className="deployment-packages" {...cy}>
      <div className="deployment-packages__intro" data-cy="title">
        <Heading semanticLevel={1} size={HeaderSize.Large}>
          Deployment Packages
        </Heading>
        <Text className="deployment-packages__intro__subHeader">
          This page lists the packages that are available for deployment.
        </Text>
      </div>

      <div className="deployment-packages__ribbon" data-cy="packagesSearch">
        <Ribbon
          onSearchChange={(searchTerm) => {
            setSearchParams((prev) => {
              prev.set("direction", "asc");
              prev.set("offset", "0");
              if (searchTerm.trim() === "") {
                prev.delete("searchTerm");
              } else {
                prev.set("searchTerm", searchTerm);
              }
              return prev;
            });
          }}
          defaultValue={searchParams.get("searchTerm") ?? ""}
          customButtons={tabIndex === 0 ? <DeploymentPackagePopup /> : undefined}
        />
      </div>

      <Tabs
        onSelectionChange={(key) => {
          const index = key.toString().split(".")[1];
          setTabIndex(parseInt(index));
        }}
      >
        <Item title="Packages">
          <div className="packages-table-content" data-cy="packagesTabContent">
            <DeploymentPackagesTable
              hasPermission={checkAuthAndRole([Role.CATALOG_WRITE])}
              kind="KIND_NORMAL"
            />
          </div>
        </Item>

        <Item title="Extensions">
          <div
            className="extensions-table-content"
            data-cy="extensionsTabContent"
          >
            <DeploymentPackagesTable
              hasPermission={checkAuthAndRole([Role.CATALOG_WRITE])}
              kind="KIND_EXTENSION"
            />
          </div>
        </Item>
      </Tabs>
    </div>
  );
};

export default DeploymentPackages;
