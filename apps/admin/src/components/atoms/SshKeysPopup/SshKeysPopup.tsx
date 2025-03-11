/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim } from "@orch-ui/apis";
import { Popup } from "@orch-ui/components";
import { SharedStorage } from "@orch-ui/utils";
import { Icon } from "@spark-design/react";
import { useEffect, useState } from "react";

export const dataCy = "sshKeysPopup";
interface SshKeysPopupProps {
  localAccount: eim.LocalAccountRead;
  onViewDetails?: () => void;
  onDelete?: () => void;
}
const SshKeysPopup = ({
  localAccount,
  onViewDetails,
  onDelete,
}: SshKeysPopupProps) => {
  const cy = { "data-cy": dataCy };
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  const { data, isSuccess, refetch } =
    eim.useGetV1ProjectsByProjectNameComputeInstancesQuery(
      {
        projectName: SharedStorage.project?.name ?? "",
        filter: `has(localaccount) AND localaccount.resourceId="${localAccount.resourceId}"`,
      },
      {
        skip: !SharedStorage.project?.name,
      },
    );

  useEffect(() => {
    if (isPopupOpen) {
      refetch();
    }
  }, [isPopupOpen]);

  const isInUse = !isSuccess || (isSuccess && data.totalElements !== 0);
  return (
    <div {...cy} className="ssh-keys-popup">
      <Popup
        jsx={<Icon artworkStyle="light" icon="ellipsis-v" />}
        onToggle={setIsPopupOpen}
        options={[
          {
            displayText: "View Details",
            onSelect: () => onViewDetails && onViewDetails(),
          },
          {
            displayText: "Delete",
            onSelect: () => onDelete && onDelete(),
            disable: isInUse,
          },
        ]}
      />
    </div>
  );
};

export default SshKeysPopup;
