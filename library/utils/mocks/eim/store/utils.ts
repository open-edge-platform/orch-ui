/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim, enhancedEimSlice } from "@orch-ui/apis";

export class StoreUtils {
  public static randomString(): string {
    return (Math.random() + 1).toString(36).substring(2);
  }

  /**
   * Converts given host to a read-only host.
   * If value substitution is seen on a readOnly options,
   * for example `host.status="HOST_STATUS_RUNNING"` which is a readonly,
   * the option will be removed with the substituted value.
   **/
  public static convertToGeneralHost(host: eim.HostRead): eim.Host {
    const newHost = { ...host };

    // Remove all read-only values
    if (newHost.resourceId !== undefined) delete newHost.resourceId;
    if (newHost.hostStatus !== undefined) delete newHost.hostStatus;
    if (newHost.serialNumber !== undefined) delete newHost.serialNumber;
    if (newHost.memoryBytes !== undefined) delete newHost.memoryBytes;
    if (newHost.cpuModel !== undefined) delete newHost.cpuModel;
    if (newHost.cpuSockets !== undefined) delete newHost.cpuSockets;
    if (newHost.cpuCores !== undefined) delete newHost.cpuCores;
    if (newHost.cpuCapabilities !== undefined) delete newHost.cpuCapabilities;
    if (newHost.cpuArchitecture !== undefined) delete newHost.cpuArchitecture;
    if (newHost.cpuThreads !== undefined) delete newHost.cpuThreads;
    if (newHost.bmcKind !== undefined) delete newHost.bmcKind;
    if (newHost.bmcIp !== undefined) delete newHost.bmcIp;
    if (newHost.hostname !== undefined) delete newHost.hostname;
    if (newHost.productName !== undefined) delete newHost.productName;
    if (newHost.biosVersion !== undefined) delete newHost.biosVersion;
    if (newHost.biosReleaseDate !== undefined) delete newHost.biosReleaseDate;
    if (newHost.biosVendor !== undefined) delete newHost.biosVendor;
    if (newHost.resourceId !== undefined) delete newHost.resourceId;
    if (newHost.hostStorages !== undefined) delete newHost.hostStorages;
    if (newHost.hostNics !== undefined) delete newHost.hostNics;
    if (newHost.hostUsbs !== undefined) delete newHost.hostUsbs;
    if (newHost.hostGpus !== undefined) delete newHost.hostGpus;
    if (newHost.note !== undefined) delete newHost.note;

    return {
      ...newHost,
      instance: newHost.instance
        ? this.convertToWriteInstance(
            newHost.instance as enhancedEimSlice.InstanceReadModified,
          )
        : undefined,
    };
  }

  public static convertToWriteHost(host: eim.HostRead): eim.HostWrite {
    const newHost = { ...host };

    // Remove all read-only values
    if (newHost.cpuTopology !== undefined) delete newHost.cpuTopology;
    if (newHost.resourceId !== undefined) delete newHost.resourceId;
    if (newHost.hostStatus !== undefined) delete newHost.hostStatus;
    if (newHost.serialNumber !== undefined) delete newHost.serialNumber;
    if (newHost.memoryBytes !== undefined) delete newHost.memoryBytes;
    if (newHost.cpuModel !== undefined) delete newHost.cpuModel;
    if (newHost.cpuSockets !== undefined) delete newHost.cpuSockets;
    if (newHost.cpuCores !== undefined) delete newHost.cpuCores;
    if (newHost.cpuCapabilities !== undefined) delete newHost.cpuCapabilities;
    if (newHost.cpuArchitecture !== undefined) delete newHost.cpuArchitecture;
    if (newHost.cpuThreads !== undefined) delete newHost.cpuThreads;
    if (newHost.bmcKind !== undefined) delete newHost.bmcKind;
    if (newHost.bmcIp !== undefined) delete newHost.bmcIp;
    if (newHost.hostname !== undefined) delete newHost.hostname;
    if (newHost.productName !== undefined) delete newHost.productName;
    if (newHost.biosVersion !== undefined) delete newHost.biosVersion;
    if (newHost.biosReleaseDate !== undefined) delete newHost.biosReleaseDate;
    if (newHost.biosVendor !== undefined) delete newHost.biosVendor;
    if (newHost.resourceId !== undefined) delete newHost.resourceId;
    if (newHost.hostStorages !== undefined) delete newHost.hostStorages;
    if (newHost.hostNics !== undefined) delete newHost.hostNics;
    if (newHost.hostUsbs !== undefined) delete newHost.hostUsbs;
    if (newHost.hostGpus !== undefined) delete newHost.hostGpus;
    if (newHost.note !== undefined) delete newHost.note;

    return {
      ...newHost,
      instance: newHost.instance
        ? this.convertToWriteInstance(
            newHost.instance as enhancedEimSlice.InstanceReadModified,
          )
        : undefined,
      siteId: newHost.site?.siteID ?? undefined,
      site: newHost.site ? this.convertToWriteSite(newHost.site) : undefined,
    };
  }

  public static convertToWriteInstance(
    instance: enhancedEimSlice.InstanceReadModified,
  ): eim.InstanceWrite {
    const newInstance: eim.InstanceWrite = {
      name: instance.name,
      kind: instance.kind,
      hostID: instance.host?.resourceId ?? "",
      host: instance.host
        ? StoreUtils.convertToWriteHost(instance.host)
        : undefined,
      osID: instance.os?.resourceId ?? "",
      os: instance.os,
      currentState: instance.currentState,
      securityFeature: instance.securityFeature,
    };

    // Remove all undefined values
    if (newInstance.name === undefined) delete newInstance.name;
    if (newInstance.host === undefined) delete newInstance.host;
    if (newInstance.currentState === undefined) delete newInstance.currentState;
    if (newInstance.os === undefined) delete newInstance.os;
    if (newInstance.host === undefined) delete newInstance.host;
    if (newInstance.securityFeature === undefined)
      delete newInstance.securityFeature;

    return newInstance;
  }
  public static convertToGeneralInstance(
    instance: eim.InstanceRead,
  ): eim.Instance {
    const newInstance: eim.Instance = {
      name: instance.name,
      kind: instance.kind,
      host: instance.host,
      os: instance.os,
      currentState: instance.currentState,
    };

    // Remove all undefined values
    if (newInstance.name === undefined) delete newInstance.name;
    if (newInstance.host === undefined) delete newInstance.host;
    if (newInstance.currentState === undefined) delete newInstance.currentState;
    if (newInstance.os === undefined) delete newInstance.os;

    return newInstance;
  }

  public static convertToWriteSite(site: eim.SiteRead): eim.SiteWrite {
    const newSite = { ...site };

    // Remove all read-only values
    if (newSite.resourceId !== undefined) delete newSite.resourceId;
    if (newSite.siteID !== undefined) delete newSite.siteID;

    const newOu = newSite.ou ? this.convertToGeneralOu(newSite.ou) : undefined;
    if (newOu) newSite.ou = newOu;

    const newRegion = newSite.region
      ? this.convertToWriteRegion(newSite.region)
      : undefined;
    if (newRegion) newSite.region = newRegion;
    return newSite;
  }

  public static convertToWriteRegion(region: eim.RegionRead): eim.RegionWrite {
    const newRegion = { ...region };

    // Remove all read-only values
    if (newRegion.resourceId !== undefined) delete newRegion.resourceId;
    if (newRegion.regionID !== undefined) delete newRegion.regionID;

    const newParentRegion = newRegion.parentRegion
      ? this.convertToWriteRegion(newRegion.parentRegion)
      : undefined;

    if (newParentRegion !== undefined) {
      newRegion.parentRegion = newParentRegion;
      return newRegion;
    } else {
      delete newRegion.parentRegion;
      return newRegion;
    }
  }

  public static convertToGeneralOu(ou: eim.OuRead): eim.Ou {
    const newOu = { ...ou };

    // Remove all read-only values
    if (ou.ouID !== undefined) delete ou.ouID;

    return newOu;
  }
}
