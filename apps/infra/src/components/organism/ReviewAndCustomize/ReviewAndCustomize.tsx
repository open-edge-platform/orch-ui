/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Flex,
  Popup,
  PopupOption,
  Table,
  TableColumn,
} from "@orch-ui/components";
import { Icon, Text } from "@spark-design/react";
import { TextSize } from "@spark-design/tokens";
import { useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  HostData,
  removeHost,
  selectHostProvisionState,
} from "../../../store/provisionHost";
import HostProvisionEditDrawer from "../HostProvisionEditDrawer/HostProvisionEditDrawer";
import HostReviewDetails from "./HostReviewDetails";
import "./ReviewAndCustomize.scss";

const dataCy = "reviewAndCustomize";

const countDistinctValuesWithLabels = (
  array: HostData[],
  propertyPaths: string | string[],
  labels = {},
) => {
  const counts: { [key: string]: number } = {};

  const paths = Array.isArray(propertyPaths) ? propertyPaths : [propertyPaths];

  array.forEach((item) => {
    const values = paths.map((path) =>
      path
        .split(".")
        .reduce(
          (obj, key) => (obj && obj[key] !== undefined ? obj[key] : undefined),
          item,
        ),
    );
    const value = values.join(" ");
    const label = labels[value] || value;
    if (counts[label]) {
      counts[label]++;
    } else {
      counts[label] = 1;
    }
  });

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([label, count]) => `${label} (${count})`)
    .join(", ");
};

const ReviewAndCustomize = () => {
  const cy = { "data-cy": dataCy };

  const tableRef = useRef(null);
  const [expanded, setExpanded] = useState<boolean>(true);

  const [hostToEdit, setHostToEdit] = useState<HostData | undefined>(undefined);

  const { hosts, createCluster } = useAppSelector(selectHostProvisionState);
  const dispatch = useAppDispatch();

  const hostValues = Object.values(hosts);

  const columns: TableColumn<HostData>[] = [
    {
      Header: "Host Name",
      accessor: "name",
    },
    {
      Header: "Serial Number and UUID",
      Cell: (table) => (
        <>
          {table.row.original.serialNumber}
          <br />
          {table.row.original.uuid}
        </>
      ),
    },
    {
      Header: "OS Profile",
      accessor: "instance.os.name",
    },
    {
      Header: "Site",
      accessor: "site.name",
    },
  ];

  if (createCluster) {
    columns.push({
      Header: "Cluster",
      accessor: (item) => `Cluster-${item.name}`,
    });
  }

  const getActionItems = (hostData: HostData): PopupOption[] => [
    {
      displayText: "Edit",
      onSelect: () => {
        setHostToEdit(hostData);
      },
    },
    {
      displayText: "Delete",
      disable: Object.keys(hosts).length <= 1,
      onSelect: () => {
        dispatch(removeHost(hostData.name));
      },
    },
  ];

  columns.push({
    Header: "Actions",
    textAlign: "center",
    padding: "0",
    accessor: (row) => (
      <Popup options={getActionItems(row)} jsx={<Icon icon="ellipsis-v" />} />
    ),
  });

  return (
    <div {...cy} className="review-and-customize">
      <div className="deployment-application-details-row">
        <Flex cols={[10, 2]}>
          <div className="hosts-overview-container">
            <div className="icon-container">
              <Icon
                className="hosts-overview-icon"
                artworkStyle="light"
                icon="host"
                onClick={() => setExpanded((e) => !e)}
              />
            </div>
            <div className="hosts-overview-details">
              <div>
                <Text>Total Hosts: {hostValues.length}</Text>
              </div>
              <div>
                <Text size={TextSize.Small}>
                  Operating System :{" "}
                  {countDistinctValuesWithLabels(
                    hostValues,
                    "instance.os.name",
                  )}
                </Text>
              </div>
              <div>
                <Text size={TextSize.Small}>
                  Cluster Template :{" "}
                  {countDistinctValuesWithLabels(hostValues, [
                    "templateName",
                    "templateVersion",
                  ])}
                </Text>
              </div>
              <div>
                <Text size={TextSize.Small}>
                  Sites :{" "}
                  {countDistinctValuesWithLabels(hostValues, "site.name")}
                </Text>
              </div>
            </div>
            <div className="hosts-overview-details">
              {/* <div></div>
              <div>
                <Text size={TextSize.Small}>
                  vPRO :{" "}
                  {countDistinctValuesWithLabels(hostValues, "enableVpro", {
                    true: "Enabled",
                    false: "Disabled",
                  })}
                </Text>
              </div> */}
              <div>
                <Text size={TextSize.Small}>
                  Secure Boot and Full Disk Encryption :{" "}
                  {countDistinctValuesWithLabels(
                    hostValues,
                    "instance.securityFeature",
                    {
                      SECURITY_FEATURE_SECURE_BOOT_AND_FULL_DISK_ENCRYPTION:
                        "Enabled",
                      SECURITY_FEATURE_NONE: "Disabled",
                    },
                  )}
                </Text>
              </div>
              <div></div>
            </div>
          </div>
          <div className="expand-action-icon-container">
            <Icon
              data-cy="expandToggle"
              className="expand-toggle"
              artworkStyle="regular"
              icon={expanded ? "chevron-down" : "chevron-right"}
              onClick={() => setExpanded((e) => !e)}
            />
          </div>
        </Flex>
      </div>
      <CSSTransition
        appear={true}
        in={expanded}
        nodeRef={tableRef}
        classNames="slide-down"
        addEndListener={(done: () => void) => done}
      >
        <div ref={tableRef} className="slide-down">
          <div className="scrollable-table-container">
            <Table
              columns={columns}
              data={hostValues}
              subRow={(row) => <HostReviewDetails host={row.original} />}
            />
          </div>
        </div>
      </CSSTransition>
      {hostToEdit && (
        <HostProvisionEditDrawer
          host={hostToEdit}
          onClose={() => {
            setHostToEdit(undefined);
          }}
        />
      )}
    </div>
  );
};

export default ReviewAndCustomize;
