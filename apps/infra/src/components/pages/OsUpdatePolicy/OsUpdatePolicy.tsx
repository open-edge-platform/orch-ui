/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import {
  ApiError,
  MessageBannerAlertState,
  Popup,
  Table,
  TableColumn,
  TableLoader,
} from "@orch-ui/components";
import { parseError, SharedStorage } from "@orch-ui/utils";
import { Heading, Icon, Text } from "@spark-design/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setMessageBanner } from "../../../store/notifications";
import OsUpdatePolicyDetailsDrawer from "./OsUpdatePolicyDrawer";

import "./OsUpdatePolicy.scss";
const dataCy = "osUpdatePolicy";
interface OsUpdatePolicyProps {}
const OsUpdatePolicy = ({}: OsUpdatePolicyProps) => {
  const cy = { "data-cy": dataCy };
  const className = "o-s-profiles";
  const dispatch = useDispatch();
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [selectedOsUpdatePolicy, setSelectedOsUpdatePolicy] = useState<
    infra.OsUpdatePolicyRead | undefined
  >();

  const {
    data: osUpdatePolicy,
    isLoading,
    isError,
    error,
  } = infra.useOsUpdatePolicyListOsUpdatePolicyQuery({
    projectName: SharedStorage.project?.name ?? "",
    pageSize: 100,
  });

  const [deleteOsUpdatePolicy] =
    infra.useOsUpdatePolicyDeleteOsUpdatePolicyMutation();

  const deleteOsUpdatePolicyHandler = (osUpdatePolicyId) => {
    deleteOsUpdatePolicy({
      projectName: SharedStorage.project?.name ?? "",
      resourceId: osUpdatePolicyId,
    })
      .unwrap()
      .then(() => {
        dispatch(
          setMessageBanner({
            icon: "check-circle",
            text: "OS Update Policy has been deleted.",
            title: "Deletion Succeeded",
            variant: MessageBannerAlertState.Success,
          }),
        );
      })
      .catch((error) => {
        dispatch(
          setMessageBanner({
            icon: "alert-triangle",
            text: parseError(error).data,
            title: "Deletion Failed",
            variant: MessageBannerAlertState.Error,
          }),
        );
      });
  };

  const getContent = () => {
    if (isLoading) {
      return (
        <div className={`${className}__table-loader`}>
          <TableLoader />
        </div>
      );
    }

    return (
      <Table
        columns={columns}
        data={osUpdatePolicy?.osUpdatePolicies}
        canSearch
        sortColumns={[0]}
        isLoading={isLoading}
      />
    );
  };

  if (isError) {
    return (
      <div {...cy}>
        <ApiError error={error} />
      </div>
    );
  }

  const columns: TableColumn<infra.OsUpdatePolicyRead>[] = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Target OS",
      accessor: "targetOs.name",
    },
    {
      Header: "Action",
      textAlign: "center",
      padding: "0",
      accessor: (item: infra.OsUpdatePolicyRead) => {
        return (
          <Popup
            dataCy="osProfilesPopup"
            jsx={<Icon artworkStyle="light" icon="ellipsis-v" />}
            options={[
              {
                displayText: "View Details",
                onSelect: () => {
                  setShowDrawer(true);
                  setSelectedOsUpdatePolicy(item);
                },
              },
              {
                displayText: "Delete",
                onSelect: () => {
                  deleteOsUpdatePolicyHandler(item?.resourceId);
                },
              },
            ]}
          />
        );
      },
    },
  ];
  console.log("selectedOsUpdatePolicy", selectedOsUpdatePolicy);
  return (
    <div {...cy} className={className}>
      <Heading semanticLevel={1} size="l" data-cy="title">
        OS Update Policy
      </Heading>
      <Text>Use this page to manage OS update policies</Text>

      {getContent()}
      {selectedOsUpdatePolicy && showDrawer && (
        <OsUpdatePolicyDetailsDrawer
          showDrawer={showDrawer}
          selectedOsUpdatePolicy={selectedOsUpdatePolicy}
          setShowDrawer={setShowDrawer}
        />
      )}
    </div>
  );
};

export default OsUpdatePolicy;
