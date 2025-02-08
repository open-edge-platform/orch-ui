/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import { Icon } from "@spark-design/react";
import HostPopup from "../HostPopup/HostPopup";
import UnconfiguredHostPopup from "../UnconfiguredHostPopup/UnconfiguredHostPopup";

interface HostDetailsActionsProp {
  host: eim.HostRead;
  instance?: eim.InstanceRead;
}

/** This renders buttons for all host actions based on configured/unconfigured property of host */
const HostDetailsActions = ({ host, instance }: HostDetailsActionsProp) => {
  // Else decide actions supported for a host based on configured/unconfigured
  return (
    <div className="host-details-actions" data-cy="hostDetailsActions">
      {host.site ? (
        <HostPopup
          host={host}
          instance={instance}
          showViewDetailsOption={false}
          basePath="../"
          jsx={
            <button
              data-cy="configuredActions"
              className="spark-button spark-button-action spark-button-size-l spark-focus-visible spark-focus-visible-self spark-focus-visible-snap"
              type="button"
            >
              <span className="spark-button-content">
                Host Actions <Icon className="pa-1 mb-1" icon="chevron-down" />
              </span>
            </button>
          }
        />
      ) : (
        <UnconfiguredHostPopup
          host={host}
          basePath="../"
          showViewDetailsOption={false}
          jsx={
            <button
              data-cy="unconfiguredActions"
              className="spark-button spark-button-action spark-button-size-l spark-focus-visible spark-focus-visible-self spark-focus-visible-snap"
              type="button"
            >
              <span className="spark-button-content">
                Host Actions <Icon className="pa-1 mb-1" icon="chevron-down" />
              </span>
            </button>
          }
        />
      )}
    </div>
  );
};

export default HostDetailsActions;
