/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { omApi } from "@orch-ui/apis";
import { Empty } from "@orch-ui/components";
import { SharedStorage } from "@orch-ui/utils";
import { Button, Checkbox, Drawer, Table } from "@spark-design/react";
import { ToastState } from "@spark-design/tokens";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { showToast } from "../../../store/notifications";
import "./ReceiversList.scss";

const dataCy = "receiversList";
interface ReceiversListProps {
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}
interface User {
  name: string;
  email: string;
  origin: string;
  enabled: boolean;
}
const ReceiversList = ({ isOpen = false, setIsOpen }: ReceiversListProps) => {
  const cy = { "data-cy": dataCy };
  const [selectedRows, setSelectedRows] = useState<User[]>([]);
  const { data: receivers, isSuccess } = omApi.useGetProjectAlertReceiversQuery(
    {
      projectName: SharedStorage.project?.name ?? "",
    },
  );
  const [patchReceivers] = omApi.usePatchProjectAlertReceiverMutation();
  const dispatch = useAppDispatch();

  const columns = [
    {
      Header: "Enabled",
      accessor: "enabled",
      Cell: (table: { row: { original: User } }) => (
        <Checkbox
          onChange={(isSelected) => {
            const result = selectedRows;
            const index = result.findIndex(
              (u) => u.email === table.row.original.email,
            );
            if (isSelected && index < 0) {
              result.push(table.row.original);
              setSelectedRows(result);
            }
            if (!isSelected && index >= 0) {
              result.splice(index, 1);
              setSelectedRows(result);
            }
          }}
          defaultSelected={table.row.original.enabled}
        />
      ),
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Email",
      accessor: "email",
    },
  ];
  const updateReceivers = () => {
    const id = receivers?.receivers?.[0].id;
    const emails: string[] = [];
    selectedRows.map((sr) => {
      emails.push(sr.origin);
    });
    if (id) {
      patchReceivers({
        receiverId: id,
        projectName: SharedStorage.project?.name ?? "",
        body: {
          emailConfig: {
            to: {
              enabled: emails,
            },
          },
        },
      })
        .unwrap()
        .then(() => {
          dispatch(
            showToast({
              state: ToastState.Success,
              message: "Receivers Successfully updated",
            }),
          );
        })
        .catch(() => {
          dispatch(
            showToast({
              state: ToastState.Danger,
              message: "Failed to update receivers",
            }),
          );
        });
    }
  };
  const generateEmailList = (receivers: omApi.Receiver[]) => {
    const users: User[] = [];
    const emails = receivers[0]?.emailConfig?.to?.allowed ?? [];
    const emailsEnabled = receivers[0]?.emailConfig?.to?.enabled ?? [];
    for (let i = 0; i < emails.length; i++) {
      // TODO: replace with a library to split name and email address
      // Email in this format: LastName, FirstName <last.first@domain.com>
      const userInfo = emails[i].split("<");
      // if userInfo[1] exist means API side is returning email address in above format
      // if not means API is still returning old format last.first@domain.com
      // in both cases, for name cell we should show userInfo[0], so check needed
      const name = userInfo[0].trim();
      const email = userInfo[1]
        ? userInfo[1].trim().replace(">", "")
        : emails[i];
      users.push({
        name: name,
        email: email,
        origin: emails[i],
        enabled: emailsEnabled.some((e) => e === emails[i]),
      });
    }
    return users;
  };
  useEffect(() => {
    if (isSuccess && receivers && receivers.receivers) {
      const users = generateEmailList(receivers?.receivers ?? []);
      setSelectedRows(users.filter((u) => u.enabled === true));
    }
  }, [receivers, isSuccess]);
  return (
    <div {...cy} className="receivers-list">
      <Drawer
        data-cy="alertDrawerBody"
        show={isOpen}
        onHide={() => setIsOpen && setIsOpen(false)}
        headerProps={{
          title: "Email Alerts",
        }}
        bodyContent={
          receivers && isSuccess ? (
            <Table
              columns={columns}
              data={generateEmailList(receivers?.receivers ?? [])}
              size="l"
              variant="minimal"
              data-cy="table"
            />
          ) : (
            <Empty
              icon="email"
              title="No receivers are present in the system"
            />
          )
        }
        footerContent={
          <div className="receivers-list__footer">
            <Button
              variant="secondary"
              onPress={() => {
                if (setIsOpen) setIsOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onPress={() => {
                updateReceivers();
                if (setIsOpen) setIsOpen(false);
              }}
            >
              Save
            </Button>
          </div>
        }
      ></Drawer>
    </div>
  );
};

export default ReceiversList;
