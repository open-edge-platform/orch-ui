/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog } from "@orch-ui/apis";
import { Ribbon } from "@orch-ui/components";
import { checkAuthAndRole, Role } from "@orch-ui/utils";
import { Item, Tabs, Text } from "@spark-design/react";
import { TextSize } from "@spark-design/tokens";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import DeploymentPackageTable from "../../deploymentPackages/DeploymentPackageTable/DeploymentPackageTable";
import "./SelectPackage.scss";

export interface SelectPackageProps {
  onSelect: (applicationPackage: catalog.DeploymentPackageRead | null) => void;
  selectedPackage?: catalog.DeploymentPackageRead;
}
const SelectPackage = ({ onSelect, selectedPackage }: SelectPackageProps) => {
  const [currentSelect, setCurrentSelect] = useState<
    catalog.DeploymentPackageRead | undefined
  >(selectedPackage);
  const [tabIndex, setTabIndex] = useState<string | number>(
    selectedPackage?.kind ?? "KIND_NORMAL",
  );
  const [searchParams, setSearchParams] = useSearchParams();

  const onRowSelect = (selection: catalog.DeploymentPackageRead) => {
    onSelect(selection);
    setCurrentSelect(selection);
  };

  return (
    <div data-cy="selectPackage" className="select-package">
      <Text size={TextSize.Large}>Select a Package</Text>
      <div className="applications__ribbon" data-cy="packagesSearch">
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
        />
      </div>
      <Tabs
        onSelectionChange={(key) => {
          setCurrentSelect(undefined);
          onSelect(null);
          setTabIndex(key);
        }}
        isCloseable={false}
        defaultSelectedKey={tabIndex}
        className="package-tabs"
      >
        <Item title="Packages" key={"KIND_NORMAL"}>
          <div className="packages-table-content" data-cy="packagesTabContent">
            <DeploymentPackageTable
              hasPermission={checkAuthAndRole([Role.CATALOG_WRITE])}
              kind={"KIND_NORMAL"}
              hideColumns={["Actions"]}
              canRadioSelect
              prevRadioSelection={currentSelect}
              onRadioSelectRow={onRowSelect}
            />
          </div>
        </Item>

        <Item title="Extensions" key={"KIND_EXTENSION"}>
          <div
            className="extensions-table-content"
            data-cy="extensionsTabContent"
          >
            <DeploymentPackageTable
              hasPermission={checkAuthAndRole([Role.CATALOG_WRITE])}
              kind={"KIND_EXTENSION"}
              hideColumns={["Actions"]}
              canRadioSelect
              prevRadioSelection={currentSelect}
              onRadioSelectRow={onRowSelect}
            />
          </div>
        </Item>
      </Tabs>
    </div>
  );
};

export default SelectPackage;
