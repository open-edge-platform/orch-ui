/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { SquareSpinner } from "@orch-ui/components";
import { SharedStorage } from "@orch-ui/utils";
import { Dropdown, Item } from "@spark-design/react";
import { DropdownSize } from "@spark-design/tokens";

const dataCy = "publicSshKeyDropdown";
interface PublicSshKeyDropdownProps {
  selectedPublicKey?: string;
  onPublicKeySelect?: (account: infra.LocalAccountRead) => void;
  onPublicKeyRemove?: () => void;
}
export const PublicSshKeyDropdown = ({
  selectedPublicKey,
  onPublicKeySelect,
  onPublicKeyRemove,
}: PublicSshKeyDropdownProps) => {
  const cy = { "data-cy": dataCy };

  const { data: localAccountsList, isSuccess } =
    infra.useGetV1ProjectsByProjectNameLocalAccountsQuery({
      projectName: SharedStorage.project?.name ?? "",
    });

  if (!isSuccess || !localAccountsList) {
    return <SquareSpinner />;
  }

  const localAccounts = localAccountsList.localAccounts;

  return (
    <div {...cy} className="public-ssh-key-dropdown">
      <Dropdown
        data-cy="localAccountsDropdown"
        label=""
        name="sshKey"
        placeholder="None"
        size={DropdownSize.Medium}
        selectedKey={selectedPublicKey ?? "None"}
        onSelectionChange={(key) => {
          if (key === "None") {
            onPublicKeyRemove?.();
          }
          if (onPublicKeySelect && key !== "None") {
            const selectedAccount = localAccounts?.find(
              (account) => account.resourceId === key.toString(),
            );
            if (!selectedAccount) return;
            onPublicKeySelect(selectedAccount);
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
