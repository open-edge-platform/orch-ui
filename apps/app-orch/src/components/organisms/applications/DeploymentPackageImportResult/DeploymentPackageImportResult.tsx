/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

// TODO: Check if this component is required. SEEN NOT USED ANYWHERE IN UI

import { MessageBanner, Table, Tooltip } from "@spark-design/react";
import { Result } from "../../../pages/DeploymentPackageImport/DeploymentPackageImport";

export const dataCy = "deploymentPackageImportResult";

interface DeploymentPackageImportResultProps {
  results: Result[];
  isError: boolean;
}
const generateStatusColumn = (table: { row: { original: Result } }) => {
  const r = table.row.original;
  if (r.status === "success" && r.errors.length === 0) {
    return (
      <span className="status-icon">
        <span className="icon icon-ready" />
        Successful
      </span>
    );
  } else {
    const errorMessage =
      r.errors && Array.isArray(r.errors) && r.errors.length > 0
        ? r.errors.reduce((p = "", c) => p + "; " + c)
        : "";
    return (
      <span className="status-icon">
        <span className="icon icon-error" />
        {errorMessage.length > 30 ? (
          <Tooltip content={errorMessage}>
            {`Failed. ${errorMessage.slice(0, 30)}...`}
          </Tooltip>
        ) : (
          `Failed. ${errorMessage.slice(0, 30)}`
        )}
      </span>
    );
  }
};

const DeploymentPackageImportResult = ({
  results,
  isError,
}: DeploymentPackageImportResultProps) => {
  const cy = { "data-cy": dataCy };
  const columns = [
    { Header: "File name", accessor: "filename" },
    {
      Header: "Status",
      Cell: (table: { row: { original: Result } }) =>
        generateStatusColumn(table),
    },
  ];
  return (
    <div {...cy} className="deployment-package-import-result">
      <>
        {results.some((r) => r.errors.length !== 0) &&
          results.some((r) => r.errors.length === 0) && (
            <MessageBanner
              messageTitle="Warning"
              messageBody="Few of the files couldn't be imported."
              variant="warning"
              showIcon
            />
          )}
        {results.every((r) => r.errors.length !== 0) && isError && (
          <MessageBanner
            messageTitle="Failure"
            messageBody="Files couldn't be imported."
            variant="error"
            showIcon
          />
        )}
        {results.every((r) => r.errors.length === 0) && !isError && (
          <MessageBanner
            messageTitle="Success"
            messageBody="All the files imported successfully."
            variant="success"
            showIcon
          />
        )}
        {results.every((r) => r.errors.length === 0) && isError && (
          <MessageBanner
            messageTitle="Failure"
            messageBody="UNKNOW_ERROR. Please contact the administrator."
            variant="error"
            showIcon
          />
        )}
        <Table
          columns={columns}
          data={results}
          data-cy="result"
          variant="minimal"
        />
      </>
    </div>
  );
};

export default DeploymentPackageImportResult;
