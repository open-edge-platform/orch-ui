/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Table, TableColumn } from "@orch-ui/components";
import { MessageBanner } from "@spark-design/react";
import { MessageBannerAlertState } from "@spark-design/tokens";
import { HostData, selectHosts } from "../../../../store/configureHost";
import { useAppSelector } from "../../../../store/hooks";
import { HostTableColumn } from "../../../../utils/HostTableColumns";
import "./AddSshPublicKey.scss";

const dataCy = "addSshPublicKey";

export const AddSshPublicKey = () => {
  const cy = { "data-cy": dataCy };
  const hosts = useAppSelector(selectHosts); // selectedHosts to provision

  const columns: TableColumn<HostData>[] = [
    HostTableColumn.hostConfigName,
    HostTableColumn.serialNumberUuid,
    HostTableColumn.publicSshKey(() => <>public ssh</>),
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
