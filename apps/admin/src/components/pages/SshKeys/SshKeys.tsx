/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { HeaderSize, PermissionDenied, RBACWrapper } from "@orch-ui/components";
import { hasRole, Role } from "@orch-ui/utils";
import { Heading, Text } from "@spark-design/react";
import SshKeysTable from "../../organisms/SshKeysTable/SshKeysTable";

export const dataCy = "sshKeys";

const SshKeys = () => {
  const cy = { "data-cy": dataCy };
  return (
    <div {...cy} className="ssh-keys">
      <Heading semanticLevel={1} size={HeaderSize.Large}>
        SSH Keys
      </Heading>
      <Text>Use this page to manage SSH public keys</Text>
      <RBACWrapper
        showTo={[Role.INFRA_MANAGER_READ, Role.INFRA_MANAGER_WRITE]}
        hasRole={hasRole}
        missingRoleContent={<PermissionDenied />}
      >
        <SshKeysTable />
      </RBACWrapper>
    </div>
  );
};

export default SshKeys;
