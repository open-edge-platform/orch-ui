/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";

export default class StoreUtils {
  public static randomString(): string {
    return (Math.random() + 1).toString(36).substring(2);
  }

  /**
   * Verify if host is readonly.
   * Returns
   * `true` if a all host read only values are `undefined` (i.e. not set with value)
   * else `false`.
   **/
  public static isHostReadOnly(host: eim.HostRead): boolean {
    return !(
      host.resourceId ||
      host.currentPowerState ||
      host.hostStatus?.indicator ||
      host.inheritedMetadata ||
      host.instance ||
      host.note
    );
  }

  /**
   * Converts given host to a read-only host.
   * If value substitution is seen on a readOnly options,
   * for example `host.status="HOST_STATUS_RUNNING"` which is a readonly,
   * the option will be removed with the substituted value.
   **/
  public static convertToSafeReadOnlyHost(host: eim.HostRead): eim.HostRead {
    const newHost = { ...host };

    // Remove all read-only values
    if (newHost.resourceId != undefined) delete newHost.resourceId;
    if (newHost.currentPowerState != undefined)
      delete newHost.currentPowerState;
    if (newHost.hostStatus != undefined) delete newHost.hostStatus;
    if (newHost.inheritedMetadata != undefined)
      delete newHost.inheritedMetadata;
    if (newHost.instance != undefined) delete newHost.instance;
    if (newHost.note != undefined) delete newHost.note;

    return newHost;
  }
}
