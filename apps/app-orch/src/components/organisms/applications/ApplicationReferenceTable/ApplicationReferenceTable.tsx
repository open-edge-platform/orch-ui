/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog } from "@orch-ui/apis";
import { Table, TableColumn } from "@orch-ui/components";
import { useAppSelector } from "../../../../store/hooks";
import ApplicationName from "../../../atoms/ApplicationName/ApplicationName";

export const dataCy = "applicationReferencesTable";

const ApplicationReferencesTable = () => {
  const cy = { "data-cy": dataCy };

  const { applicationReferences } = useAppSelector(
    (state) => state.deploymentPackage,
  );

  const columns: TableColumn<catalog.ApplicationReference>[] = [
    {
      Header: "Name",
      accessor: (row) => `${row.name}@${row?.version ?? "0.0.0"}`,
      Cell: (table: { row: { original: catalog.ApplicationReference } }) => {
        const appVersion = table.row.original?.version ?? "0.0.0";
        return (
          <ApplicationName
            applicationReference={{
              name: table.row.original.name,
              version: appVersion,
            }}
          />
        );
      },
    },
    {
      Header: "Version",
      accessor: "version",
    },
  ];

  return (
    <div {...cy} className="application-reference-table">
      <Table
        key="application-reference-table"
        columns={columns}
        data={applicationReferences}
        sortColumns={[0, 1]}
      />
    </div>
  );
};

export default ApplicationReferencesTable;
