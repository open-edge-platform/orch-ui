/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { enhancedInfraSlice, infra } from "@orch-ui/apis";

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
  public static convertToGeneralHost(host: infra.HostRead): infra.Host {
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
            newHost.instance as enhancedInfraSlice.InstanceReadModified,
          )
        : undefined,
    };
  }

  public static convertToWriteHost(host: infra.HostRead): infra.HostWrite {
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
            newHost.instance as enhancedInfraSlice.InstanceReadModified,
          )
        : undefined,
      siteId: newHost.site?.siteID ?? undefined,
      site: newHost.site ? this.convertToWriteSite(newHost.site) : undefined,
    };
  }

  public static convertToWriteInstance(
    instance: enhancedInfraSlice.InstanceReadModified,
  ): infra.InstanceWrite {
    const newInstance: infra.InstanceWrite = {
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
    instance: infra.InstanceRead,
  ): infra.Instance {
    const newInstance: infra.Instance = {
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

  public static convertToWriteSite(site: infra.SiteRead): infra.SiteWrite {
    const copySite = { ...site };

    // Remove all read-only values
    if (copySite.resourceId !== undefined) delete copySite.resourceId;
    if (copySite.siteID !== undefined) delete copySite.siteID;

    const newSite: infra.SiteWrite = { ...copySite };
    if (copySite.ou) newSite.ou = this.convertToGeneralOu(copySite.ou);
    if (copySite.region)
      newSite.region = this.convertToWriteRegion(copySite.region);

    return newSite;
  }

  public static convertToWriteRegion(
    region: infra.RegionRead,
  ): infra.RegionWrite {
    const copyRegion = { ...region };

    // Remove all read-only values
    if (copyRegion.resourceId !== undefined) delete copyRegion.resourceId;
    if (copyRegion.regionID !== undefined) delete copyRegion.regionID;

    const newRegion: infra.RegionWrite = { ...copyRegion };
    if (copyRegion.parentRegion !== undefined)
      newRegion.parentRegion = this.convertToWriteRegion(
        copyRegion.parentRegion,
      );
    else delete newRegion.parentRegion;

    return newRegion;
  }

  public static convertToGeneralOu(ou: infra.OuRead): infra.Ou {
    const newOu = { ...ou };

    // Remove all read-only values
    if (ou.ouID !== undefined) delete ou.ouID;

    return newOu;
  }
}
