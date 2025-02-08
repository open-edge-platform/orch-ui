/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { enhancedEimSlice } from "@orch-ui/apis";
import { ApiErrorPom, EmptyPom, RibbonPom } from "@orch-ui/components";
import { SparkTableColumn } from "@orch-ui/utils";
import { InstanceTableColumn } from "../../../utils/InstanceTableColumns";
import InstancesTable from "./InstancesTable";
import { InstancesTablePom } from "./InstancesTable.pom";

const pom = new InstancesTablePom();
const emptyPom = new EmptyPom();
const apiErrorPom = new ApiErrorPom();
const ribbonPom = new RibbonPom();

describe("<InstancesTable/>", () => {
  const columns: SparkTableColumn<enhancedEimSlice.InstanceReadModified>[] = [
    InstanceTableColumn.name,
    InstanceTableColumn.os,
    InstanceTableColumn.serial,
    InstanceTableColumn.site,
    InstanceTableColumn.status,
  ];
  describe("when API returns success", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.instancesListSuccess]);
      cy.mount(<InstancesTable columns={columns} />);
      pom.waitForApis();
    });

    it("display table when data is loaded", () => {
      pom.root.should("be.visible");
    });
  });

  it("handle empty", () => {
    pom.interceptApis([pom.api.instancesListEmpty]);
    cy.mount(<InstancesTable columns={columns} />);
    pom.waitForApis();
    emptyPom.root.should("be.visible");
  });

  it("handle loading", () => {
    pom.interceptApis([pom.api.instancesListSuccess]);
    cy.mount(<InstancesTable columns={columns} />);
    cy.get(".spark-shimmer").should("be.visible");
    cy.get(".spark-shimmer").should("exist");
    pom.waitForApis();
    cy.get(".spark-shimmer").should("not.exist");
  });

  it("handle 500 error", () => {
    pom.interceptApis([pom.api.instancesListError500]);
    cy.mount(<InstancesTable columns={columns} />);
    pom.waitForApis();
    apiErrorPom.root.should("be.visible");
  });

  describe("InstancesTable pagination, fiter and order should", () => {
    it("pass search value to GET request", () => {
      pom.interceptApis([pom.api.instancesListSuccess]);
      cy.mount(<InstancesTable columns={columns} />);
      pom.waitForApis();
      pom.interceptApis([pom.api.instancesListSuccessWithFilter]);
      ribbonPom.el.search.type("testingSearch");
      pom.waitForApis();
    });
    it("pass order value to GET request", () => {
      pom.interceptApis([pom.api.instancesListSuccess]);
      cy.mount(<InstancesTable columns={columns} sort={[0, 1, 2, 3, 4]} />);
      pom.waitForApis();
      pom.interceptApis([pom.api.instancesListSuccessWithOrder]);
      pom.table.getColumns().eq(0).click();
      pom.waitForApis();
    });
    it("pass page value to GET request", () => {
      pom.interceptApis([pom.api.instancesListSuccess]);
      cy.mount(<InstancesTable columns={columns} />);
      pom.waitForApis();
      pom.interceptApis([pom.api.instancesListSuccessWithOffset]);
      cy.get(".spark-pagination-list").contains(2).click();
      pom.waitForApis();
    });
  });
});
