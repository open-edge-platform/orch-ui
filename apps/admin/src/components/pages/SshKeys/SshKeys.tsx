/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { PermissionDenied, RBACWrapper } from "@orch-ui/components";
import { hasRole, Role } from "@orch-ui/utils";
import { Heading, Text } from "@spark-design/react";
import SshKeysTable from "../../organisms/SshKeysTable/SshKeysTable";

export const dataCy = "sshKeys";

const SshKeys = () => {
  const cy = { "data-cy": dataCy };
  return (
    <div {...cy} className="ssh-keys">
      <Heading semanticLevel={1} size="l">
        SSH Keys
      </Heading>
      <Text>Use this page to manage SSH public keys</Text>
      <RBACWrapper
        showTo={[
          Role.PROJECT_READ,
          Role.PROJECT_WRITE,
          Role.PROJECT_DELETE,
          Role.PROJECT_UPDATE,
        ]}
        hasRole={hasRole}
        missingRoleContent={<PermissionDenied />}
      >
        <SshKeysTable poll />
      </RBACWrapper>
    </div>
  );
};

export default SshKeys;
