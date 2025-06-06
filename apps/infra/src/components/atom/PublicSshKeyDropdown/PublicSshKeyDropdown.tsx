/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */
import { eim } from "@orch-ui/apis";
import { Dropdown, Item } from "@spark-design/react";
import { DropdownSize } from "@spark-design/tokens";
import { HostData, unSetPublicSshKey } from "../../../store/configureHost";
import { useAppDispatch } from "../../../store/hooks";

const dataCy = "publicSshKeyDropdown";
interface PublicSshKeyDropdownProps {
  hostId: string;
  host: HostData;
  onPublicKeySelect?: (hostId: string, acount: eim.LocalAccount) => void;
  localAccounts: eim.LocalAccountRead[] | undefined;
}
export const PublicSshKeyDropdown = ({
  hostId,
  host,
  onPublicKeySelect,
  localAccounts,
}: PublicSshKeyDropdownProps) => {
  const cy = { "data-cy": dataCy };
  const dispatch = useAppDispatch();

  return (
    <div {...cy} className="public-ssh-key-dropdown">
      <Dropdown
        data-cy="localAccountsDropdown"
        label=""
        name="sshKey"
        placeholder="None"
        size={DropdownSize.Medium}
        selectedKey={host.instance?.localAccountID || "None"}
        onSelectionChange={(key) => {
          const selectedKey = key?.toString() ?? "None";
          if (selectedKey === "None") {
            dispatch(unSetPublicSshKey({ hostId: hostId }));
          }
          if (onPublicKeySelect && selectedKey !== "None") {
            const selectedAccount = localAccounts?.find(
              (account) => account.resourceId === selectedKey,
            );
            if (!selectedAccount) return;
            onPublicKeySelect(hostId, selectedAccount);
          }
        }}
      >
        <Item textValue="None" key="None">
          None
        </Item>
        {localAccounts?.map((option) => {
          return <Item key={option.resourceId}>{option.username}</Item>;
        })}
      </Dropdown>
    </div>
  );
};
