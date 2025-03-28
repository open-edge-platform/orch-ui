/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog } from "@orch-ui/apis";
import {
  Empty,
  Popup,
  PopupOption,
  Table,
  TableColumn,
} from "@orch-ui/components";
import { Icon, Tooltip } from "@spark-design/react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  selectApplication,
  setDefaultProfileName,
} from "../../../../store/reducers/application";

const dataCy = "applicationProfilesTable";

export interface ApplicationProfileTableAction {
  text: string;
  action: (item: catalog.Profile) => void;
}

interface ApplicationProfileTableProps {
  actions?: ApplicationProfileTableAction[];
}

const ApplicationProfileTable = ({ actions }: ApplicationProfileTableProps) => {
  const cy = { "data-cy": dataCy };
  const { profiles } = useAppSelector(selectApplication);
  const { defaultProfileName } = useAppSelector(selectApplication);
  const dispatch = useAppDispatch();

  const columns: TableColumn<catalog.Profile>[] = [
    {
      Header: "Name",
      accessor: (row) => row.displayName ?? row.name,
    },
    {
      Header: "Description",
      accessor: (row) =>
        row.description && row.description.length > 30 ? (
          <Tooltip content={row.description} size="s">
            {`${row.description.slice(0, 30)}...`}
          </Tooltip>
        ) : (
          <span>{row.description || "No description found"}</span>
        ),
    },
    {
      Header: "Is default",
      accessor: (row) => {
        return (
          <div className="default-radio">
            <input
              type="radio"
              id="isDefault"
              value={row.name}
              checked={row.name === defaultProfileName}
              onChange={() => dispatch(setDefaultProfileName(row.name))}
            />
          </div>
        );
      },
    },
  ];

  if (actions) {
    columns.push({
      Header: "Action",
      textAlign: "center",
      padding: "0",
      accessor: (item) => (
        <Popup
          options={actions.map(
            (action): PopupOption => ({
              displayText: action.text,
              onSelect: action.action.bind(this, item),
            }),
          )}
          jsx={<Icon icon="ellipsis-v" />}
          dataCy="popup"
        />
      ),
    });
  }

  if (!profiles || profiles.length === 0) {
    return <Empty icon="document-gear" title="No Profiles present" />;
  }

  return (
    <div {...cy}>
      <Table
        key="application-profiles-table"
        columns={columns}
        data={profiles}
        isServerSidePaginated={false}
        canPaginate
        sortColumns={[0]}
      />
    </div>
  );
};

export default ApplicationProfileTable;
