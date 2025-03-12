/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */
import { eim } from "@orch-ui/apis";
import { Dropdown, Item } from "@spark-design/react";
import { DropdownSize } from "@spark-design/tokens";
import { HostData } from "../../../store/configureHost";

export const dataCy = "publicSshKeyDropdown";
interface PublicSshKeyDropdownProps {
  host: HostData;
  onPublicKeySelect?: (hostId: string, acount: eim.LocalAccount) => void;
  localAccounts: eim.LocalAccountRead[] | undefined;
}
export const PublicSshKeyDropdown = ({
  host,
  onPublicKeySelect,
  localAccounts,
}: PublicSshKeyDropdownProps) => {
  const cy = { "data-cy": dataCy };
  return (
    <div {...cy} className="public-ssh-key-dropdown">
      <Dropdown
        data-cy="localAccountsDropdown"
        label=""
        name="sshKey"
        placeholder="None"
        size={DropdownSize.Medium}
        selectedKey={host.instance?.localAccountID}
        onSelectionChange={(key) => {
          if (onPublicKeySelect) {
            const selectedAccount = localAccounts?.find(
              (account) => account.resourceId === key.toString(),
            );
            if (!selectedAccount) return;
            onPublicKeySelect(host.resourceId!, selectedAccount);
          }
        }}
      >
        {localAccounts?.map((option) => {
          return <Item key={option.resourceId}>{option.username}</Item>;
        })}
      </Dropdown>
    </div>
  );
};
