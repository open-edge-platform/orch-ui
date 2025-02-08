/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import { isOSUpdateAvailable } from "@orch-ui/utils";
import "./OsConfig.scss";
export const dataCy = "osConfig";
export interface OsConfigProps {
  instance?: eim.InstanceRead;
}

export const OsConfig = ({ instance }: OsConfigProps) => {
  const cy = { "data-cy": dataCy };
  return (
    <div {...cy} className="os-config">
      {instance?.os?.name ?? <em>(Not set)</em>}
      {isOSUpdateAvailable(instance) && (
        <label
          className="os-update"
          data-cy="osUpdate"
          title="OS update available"
        >
          Update
        </label>
      )}
    </div>
  );
};
