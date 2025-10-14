/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { formatOsUpdateAvailable, isOSUpdateAvailable } from "@orch-ui/utils";
import { Icon } from "@spark-design/react";
import "./OsConfig.scss";
const dataCy = "osConfig";
export interface OsConfigProps {
  instance?: infra.InstanceResourceRead;
  iconOnly?: boolean;
}

export const OsConfig = ({ instance, iconOnly = false }: OsConfigProps) => {
  const cy = { "data-cy": dataCy };
  const showUpdateAvailable = isOSUpdateAvailable(instance);

  const getOsName = () => {
    if (instance?.os?.name) {
      return instance.os.name;
    }

    const osUpdateAvailable = formatOsUpdateAvailable(
      instance?.osUpdateAvailable,
    );

    if (osUpdateAvailable) {
      return osUpdateAvailable;
    }
    return <em>(Not set)</em>;
  };

  return (
    <div {...cy} className="os-config">
      {showUpdateAvailable && iconOnly && (
        <Icon
          className="os-update-icon"
          data-cy="icon"
          icon="information-circle"
          title="OS update available"
        />
      )}
      {getOsName()}
      {showUpdateAvailable && iconOnly === false && (
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
