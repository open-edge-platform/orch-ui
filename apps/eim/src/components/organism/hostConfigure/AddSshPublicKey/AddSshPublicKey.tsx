/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim } from "@orch-ui/apis";
import { Table, TableColumn } from "@orch-ui/components";
import { MessageBanner } from "@spark-design/react";
import { MessageBannerAlertState } from "@spark-design/tokens";
import {
  HostData,
  selectHosts,
  setPublicSshKey,
} from "../../../../store/configureHost";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { HostTableColumn } from "../../../../utils/HostTableColumns";
import { PublicSshKeyDropdown } from "../../../atom/PublicSshKeyDropdown/PublicSshKeyDropdown";
import "./AddSshPublicKey.scss";

const dataCy = "addSshPublicKey";

interface AddSshPublicKeyProps {
  localAccounts?: eim.LocalAccountRead[];
}

export const AddSshPublicKey = ({ localAccounts }: AddSshPublicKeyProps) => {
  const cy = { "data-cy": dataCy };
  const hosts = useAppSelector(selectHosts); // selectedHosts to provision
  const dispatch = useAppDispatch();

  const onPublicKeySelect = (hostId, localAccount) => {
    dispatch(setPublicSshKey({ hostId: hostId, value: localAccount }));
  };

  const columns: TableColumn<HostData>[] = [
    HostTableColumn.hostConfigName,
    HostTableColumn.serialNumberUuid,
    HostTableColumn.publicSshKey((host: HostData) => (
      <PublicSshKeyDropdown
        localAccounts={localAccounts}
        host={host}
        onPublicKeySelect={onPublicKeySelect}
      />
    )),
  ];

  return (
    <div {...cy} className="add-ssh-public-key">
      <div className="ssh-key-message-banner">
        <MessageBanner
          messageTitle=""
          variant={MessageBannerAlertState.Info}
          size="m"
          messageBody="This is an optional step, you can also proceed without adding SSH public keys."
          showIcon
          outlined
        />
      </div>
      <Table
        columns={columns}
        data={Object.values(hosts)}
        getRowId={(row) => row.resourceId!}
      />
    </div>
  );
};
