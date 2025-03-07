/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import {
  ApiError,
  columnApiNameToDisplayName,
  columnDisplayNameToApiName,
  Empty,
  Popup,
  RbacRibbonButton,
  Ribbon,
  SortDirection,
  Table,
  TableColumn,
  TextTruncate,
} from "@orch-ui/components";
import {
  API_INTERVAL,
  checkAuthAndRole,
  Direction,
  getFilter,
  getOrder,
  hasRole,
  Operator,
  Role,
  SharedStorage,
} from "@orch-ui/utils";
import { Icon } from "@spark-design/react";
import {
  ButtonSize,
  ButtonVariant,
  MessageBannerAlertState,
  ToastState,
} from "@spark-design/tokens";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../../store/hooks";
import {
  showMessageNotification,
  showToast,
} from "../../../store/notifications";
import SshKeyInUseByHostsCell from "../../atoms/SshKeyInUseByHostsCell/SshKeyInUseByHostsCell";
import DeleteSSHDialog from "../DeleteSSHDialog/DeleteSSHDialog";
import SshKeysAddEditDrawer from "../SshKeysAddEditDrawer/SshKeysAddEditDrawer";
import SshKeysViewDrawer from "../SshKeysViewDrawer/SshKeysViewDrawer";

export const dataCy = "sshKeysTable";

interface SshDrawerControl {
  isOpen: boolean;
  localAccount?: eim.LocalAccountRead;
}

const SshKeysTable = ({
  hasPermission = hasRole([Role.PROJECT_WRITE]),
  poll,
}: {
  hasPermission?: boolean;
  poll?: boolean;
}) => {
  const cy = { "data-cy": dataCy };
  const [searchParams, setSearchParams] = useSearchParams();
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState<boolean>(false);
  const [isViewDrawerOpen, setIsViewDrawerOpen] = useState<SshDrawerControl>({
    isOpen: false,
  });
  const [selectedSshToDelete, setSelectedSshToDelete] = useState<
    eim.LocalAccountRead | undefined
  >();
  const dispatch = useAppDispatch();

  const openViewDrawer = (localAccount: eim.LocalAccountRead) => {
    setIsViewDrawerOpen({
      isOpen: true,
      localAccount: localAccount,
    });
  };

  const columns: TableColumn<eim.LocalAccountRead>[] = [
    {
      Header: "Key Name",
      apiName: "username",
      accessor: (ssh) => ssh.username,
      Cell: (table: { row: { original: eim.LocalAccountRead } }) => (
        <Link
          data-cy={`${table.row.original.username}SshLink`}
          to=""
          onClick={() => openViewDrawer(table.row.original)}
        >
          {table.row.original.username}
        </Link>
      ),
    },
    {
      Header: "Key",
      apiName: "sshKey",
      accessor: (ssh) => ssh.sshKey,
      Cell: (table: { row: { original: eim.LocalAccountRead } }) => (
        <TextTruncate
          maxLength={50}
          text={table.row.original.sshKey}
          id={table.row.original.username}
          hideReadMore
        />
      ),
    },
    {
      Header: "In Use",
      Cell: (table: { row: { original: eim.LocalAccountRead } }) => (
        <SshKeyInUseByHostsCell localAccount={table.row.original} />
      ),
    },
    {
      Header: "Action",
      Cell: (table: { row: { original: eim.LocalAccountRead } }) => {
        const localAccount = table.row.original;
        return (
          <Popup
            jsx={<Icon artworkStyle="light" icon="ellipsis-v" />}
            options={[
              {
                displayText: "View Details",
                onSelect: () => openViewDrawer(localAccount),
              },
              {
                displayText: "Delete",
                onSelect: () => {
                  setSelectedSshToDelete(localAccount);
                },
                disable: false, //ssh.isInUse,
              },
            ]}
          />
        );
      },
    },
  ];

  const sortColumn =
    columnApiNameToDisplayName(columns, searchParams.get("column")) ??
    "Key Name";
  const sortDirection = (searchParams.get("direction") ?? "asc") as Direction;
  const pageSize = parseInt(searchParams.get("pageSize") ?? "10");
  const offset = parseInt(searchParams.get("offset") ?? "0");
  const orderBy =
    getOrder(searchParams.get("column"), sortDirection) ?? "username asc";
  const searchTerm = searchParams.get("searchTerm") ?? undefined;

  const [addSshKey] = eim.usePostV1ProjectsByProjectNameLocalAccountsMutation();
  const {
    data: localAccountData,
    isSuccess,
    isError,
    error,
  } = eim.useGetV1ProjectsByProjectNameLocalAccountsQuery(
    {
      projectName: SharedStorage.project?.name ?? "",
      pageSize,
      offset,
      orderBy,
      filter: getFilter<eim.LocalAccount>(
        searchParams.get("searchTerm") ?? "",
        ["username"],
        Operator.OR,
      ),
    },
    {
      skip: !SharedStorage.project?.name,
      ...(poll ? { pollingInterval: API_INTERVAL } : {}),
    },
  );

  const sshList = localAccountData?.localAccounts;
  const onSearch = (searchTerm: string) => {
    setSearchParams((prev) => {
      prev.set("direction", "asc");
      prev.set("offset", "0");
      if (searchTerm) prev.set("searchTerm", searchTerm);
      else prev.delete("searchTerm");
      return prev;
    });
  };

  const sshAddButton = (
    <RbacRibbonButton
      name="SshAddButton"
      size={ButtonSize.Large}
      variant={ButtonVariant.Action}
      text="Add Key"
      onPress={() => {
        setIsAddDrawerOpen(true);
      }}
      disabled={!hasPermission}
      tooltip={
        checkAuthAndRole([Role.PROJECT_WRITE])
          ? ""
          : "The users with 'View Only' access can mostly view the data and do few of the Add/Edit operations."
      }
      tooltipIcon="lock"
    />
  );

  const onSshAdd = (localAccount: eim.LocalAccount) => {
    const showError = (err?: any) => {
      dispatch(
        showToast({
          message: `Failed to add SSHkey. ${err ? `Error: ${err}` : ""}`,
          state: ToastState.Danger,
        }),
      );
    };

    if (SharedStorage.project?.name)
      addSshKey({ localAccount, projectName: SharedStorage.project.name })
        .unwrap()
        .then(() => {
          dispatch(
            showToast({
              message: "SSH key is successfully added!",
              state: ToastState.Success,
            }),
          );
        })
        .catch(showError);
  };

  const getTable = () => {
    if (isError) {
      return <ApiError error={error} />;
    } else if (!sshList || (isSuccess && sshList.length === 0)) {
      return (
        <>
          <Ribbon
            defaultValue={searchTerm}
            onSearchChange={onSearch}
            customButtons={sshAddButton}
            showSearch={false}
          />
          <Empty
            icon="key"
            subTitle="Currently, there are no SSH keys to be shown."
          />
        </>
      );
    } else {
      return (
        <Table
          key="projectTable"
          dataCy="projectsTableList"
          columns={columns}
          data={sshList}
          initialSort={{
            column: sortColumn,
            direction: sortDirection,
          }}
          // Pagination
          onChangePage={(index: number) => {
            setSearchParams((prev) => {
              prev.set("offset", (index * pageSize).toString());
              return prev;
            });
          }}
          onChangePageSize={(pageSize: number) => {
            setSearchParams((prev) => {
              prev.set("pageSize", pageSize.toString());
              return prev;
            });
          }}
          // Sorting
          sortColumns={[0]}
          onSort={(column: string, direction: SortDirection) => {
            setSearchParams((prev) => {
              if (direction) {
                const apiName = columnDisplayNameToApiName(columns, column);

                if (apiName) {
                  prev.set("column", apiName);
                  prev.set("direction", direction);
                }
              } else {
                prev.delete("column");
                prev.delete("direction");
              }
              return prev;
            });
          }}
          // Searching
          canSearch
          searchTerm={searchTerm}
          onSearch={onSearch}
          actionsJsx={sshAddButton}
        />
      );
    }
  };
  return (
    <div {...cy} className="ssh-keys-table">
      {getTable()}
      <SshKeysAddEditDrawer
        isOpen={isAddDrawerOpen}
        onHide={() => {
          setIsAddDrawerOpen(false);
        }}
        onAdd={onSshAdd}
      />
      {isViewDrawerOpen.isOpen && isViewDrawerOpen.localAccount && (
        <SshKeysViewDrawer
          isOpen
          localAccount={isViewDrawerOpen.localAccount}
          onHide={() => {
            setIsViewDrawerOpen({ isOpen: false, localAccount: undefined });
          }}
        />
      )}
      {selectedSshToDelete && (
        <DeleteSSHDialog
          ssh={selectedSshToDelete}
          onCancel={() => setSelectedSshToDelete(undefined)}
          onDelete={() => {
            dispatch(
              showMessageNotification({
                messageTitle: "Deletion in process",
                messageBody: `SSH ${selectedSshToDelete.username} is being deleted.`,
                variant: MessageBannerAlertState.Success,
              }),
            );
            setSelectedSshToDelete(undefined);
          }}
          onError={(errorMessage) => {
            dispatch(
              showMessageNotification({
                messageTitle: "Error",
                messageBody: `Error in deleting ssh ${selectedSshToDelete.username}. ${errorMessage}`,
                variant: MessageBannerAlertState.Error,
              }),
            );
            setSelectedSshToDelete(undefined);
          }}
        />
      )}
    </div>
  );
};

export default SshKeysTable;
