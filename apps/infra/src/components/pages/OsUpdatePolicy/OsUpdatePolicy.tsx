/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import {
  ApiError,
  Empty,
  Popup,
  RbacRibbonButton,
  Table,
  TableColumn,
  TableLoader,
} from "@orch-ui/components";
import { hasRole, parseError, Role, SharedStorage } from "@orch-ui/utils";
import { Heading, Icon, Text, Toast, ToastProps } from "@spark-design/react";
import {
  ButtonSize,
  ButtonVariant,
  ToastPosition,
  ToastState,
  ToastVisibility,
} from "@spark-design/tokens";
import { useState } from "react";
import CreateOsUpdatePolicyDrawer from "./CreateOsUpdatePolicyDrawer";
import OsUpdatePolicyDetailsDrawer from "./OsUpdatePolicyDrawer";

import "./OsUpdatePolicy.scss";
const dataCy = "osUpdatePolicy";
const OsUpdatePolicy = () => {
  const cy = { "data-cy": dataCy };
  const className = "os-update-policy";

  // Toast state management
  const [toastProps, setToastProps] = useState<ToastProps>({
    state: ToastState.Success,
    visibility: ToastVisibility.Hide,
    duration: 3000,
    position: ToastPosition.TopRight,
    canClose: true,
  });

  const showToast = (message: string, state: ToastState) => {
    setToastProps({
      ...toastProps,
      message,
      state,
      visibility: ToastVisibility.Show,
    });
  };

  const hideToast = () => {
    setToastProps({
      ...toastProps,
      visibility: ToastVisibility.Hide,
    });
  };
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [showCreateOsPolicyDrawer, setShowCreateOsPolicyDrawer] =
    useState<boolean>(false);
  const [selectedOsUpdatePolicy, setSelectedOsUpdatePolicy] = useState<
    infra.OsUpdatePolicyRead | undefined
  >();

  const {
    data: osUpdatePolicy,
    isSuccess,
    isLoading,
    isError,
    error,
    refetch,
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
        showToast(
          "OS Update Policy has been deleted successfully.",
          ToastState.Success,
        );
      })
      .catch((error) => {
        showToast(
          `Failed to delete OS Update Policy: ${parseError(error).data}`,
          ToastState.Danger,
        );
      });
  };

  const addOsUpdatePolicyButton = (
    <RbacRibbonButton
      name="addOsUpdatePolicy"
      size={ButtonSize.Large}
      variant={ButtonVariant.Action}
      text="Add OS Update Policy"
      onPress={() => {
        setShowCreateOsPolicyDrawer(true);
      }}
      disabled={!hasRole([Role.INFRA_MANAGER_WRITE])}
      tooltip={""}
      tooltipIcon="lock"
    />
  );

  const getContent = () => {
    if (isLoading) {
      return (
        <div className={`${className}__table-loader`}>
          <TableLoader />
        </div>
      );
    } else if (isSuccess && osUpdatePolicy.totalElements === 0) {
      return (
        <Empty
          title="No OS update policies are available here."
          icon="information-circle"
          actions={[
            {
              name: "Add OS Update Policy",
              disable: !hasRole([Role.INFRA_MANAGER_WRITE]),
              action: () => {
                setShowCreateOsPolicyDrawer(true);
              },
            },
          ]}
        />
      );
    } else {
      return (
        <Table
          columns={columns}
          data={osUpdatePolicy?.osUpdatePolicies}
          canSearch
          sortColumns={[0]}
          isLoading={isLoading}
          actionsJsx={addOsUpdatePolicyButton}
        />
      );
    }
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

      {showCreateOsPolicyDrawer && (
        <CreateOsUpdatePolicyDrawer
          showDrawer={showCreateOsPolicyDrawer}
          setShowDrawer={setShowCreateOsPolicyDrawer}
          onPolicyCreated={() => refetch()}
          showToast={showToast}
        />
      )}

      <Toast {...toastProps} onHide={hideToast} />
    </div>
  );
};

export default OsUpdatePolicy;
