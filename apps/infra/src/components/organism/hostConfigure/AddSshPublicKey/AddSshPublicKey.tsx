/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
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
  localAccounts?: infra.LocalAccountRead[];
}

export const AddSshPublicKey = ({ localAccounts }: AddSshPublicKeyProps) => {
  const cy = { "data-cy": dataCy };
  const hosts = useAppSelector(selectHosts); // selectedHosts to provision
  const dispatch = useAppDispatch();

  const onPublicKeySelect = (hostId, localAccount) => {
    dispatch(setPublicSshKey({ hostId: hostId, value: localAccount }));
  };

  // returns a identifier corresponding to the host
  const getHostId = (host: HostData): string => {
    for (const key of Object.keys(hosts)) {
      const selectedHost = hosts[key];
      if (
        selectedHost.resourceId === host.resourceId ||
        selectedHost.name === host.name
      ) {
        return key;
      }
    }
    return host.resourceId || host.name;
  };

  const columns: TableColumn<HostData>[] = [
    HostTableColumn.hostConfigName,
    HostTableColumn.serialNumberUuid,
    HostTableColumn.publicSshKey((host: HostData) => (
      <PublicSshKeyDropdown
        hostId={getHostId(host)}
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
          messageBody="This step is optional. Select an SSH key name to enable local user access to hosts."
          showIcon
          outlined
        />
      </div>
      <Table columns={columns} data={Object.values(hosts)} />
    </div>
  );
};
