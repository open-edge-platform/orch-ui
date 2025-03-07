/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { adm, catalog } from "@orch-ui/apis";
import { Flex, Table, TableColumn } from "@orch-ui/components";
import { Combobox, Item, MessageBanner } from "@spark-design/react";
import { ComboboxSize, ComboboxVariant } from "@spark-design/tokens";
import React, { useState } from "react";
import "./NetworkInterconnect.scss";

export const dataCy = "networkInterconnect";

type NetworkInterconnectProps = {
  networks: string[];
  selectedNetwork: string;
  applications?: catalog.ApplicationReference[];
  selectedServices: adm.ServiceExport[];
  onNetworkUpdate: (value: string) => void;
  onExportsUpdate: (
    selectedRowData: catalog.ApplicationReference,
    isSelected: boolean,
  ) => void;
};

const NetworkInterconnect = ({
  networks,
  selectedNetwork,
  applications,
  selectedServices,
  onNetworkUpdate,
  onExportsUpdate,
}: NetworkInterconnectProps) => {
  const cy = { "data-cy": dataCy };

  const [networkValue, setNetworkValue] = useState<string>(selectedNetwork);
  const [selectedApps, setSelectedApps] = useState<
    catalog.ApplicationReference[]
  >(
    applications?.filter((app) => {
      const service = selectedServices.find((v) => v.appName === app.name);
      return service && service.enabled;
    }) ?? [],
  );

  const columns: TableColumn<catalog.ApplicationReference>[] = [
    {
      Header: "Expose Services",
    },
    {
      Header: "Application Name",
      accessor: (item) => item.name,
      apiName: "name",
    },
  ];

  const getIdFromRow = (app: catalog.ApplicationReference) =>
    `${app.name}@${app.version}`;

  return (
    <div {...cy} className="network-interconnect">
      <Flex cols={[3, 9]}>
        <Combobox
          label="Network Interconnect"
          className="network-interconnect__select"
          size={ComboboxSize.Large}
          variant={ComboboxVariant.Primary}
          defaultInputValue={networkValue}
          onSelectionChange={(value: React.Key | null) => {
            setNetworkValue(value as string);
            onNetworkUpdate(value as string);
          }}
          errorMessage="Registry Name is required"
          data-cy="networkInterconnectCombobox"
        >
          <Item key="">{"None selected"}</Item>
          {networks.map((name) => (
            <Item key={name}>{name}</Item>
          ))}
        </Combobox>
      </Flex>
      {networkValue && applications && (
        <>
          <MessageBanner
            messageBody="All applications can now access data over the chosen interconnect. Select which applications can share data below."
            variant="info"
            messageTitle=""
            size="s"
            showIcon
            outlined
            data-cy="interconnectMessage"
          />
          <p>Total: {applications.length}</p>
          <Table
            columns={columns}
            data={applications}
            canPaginate={false}
            canSelectRows={true}
            getRowId={(row) => `${row.name}@${row.version}`}
            selectedIds={selectedApps.map(getIdFromRow)}
            onSelect={(row: catalog.ApplicationReference, isSelected) => {
              const rowId = getIdFromRow(row); // you can also use the unused var `rowIndex` here...
              setSelectedApps((prev) => {
                if (isSelected) {
                  return prev.concat(row);
                }
                return prev.filter(
                  (selectedRow) => getIdFromRow(selectedRow) !== rowId,
                );
              });
              onExportsUpdate(row, isSelected);
            }}
          />
        </>
      )}
    </div>
  );
};

export default NetworkInterconnect;
