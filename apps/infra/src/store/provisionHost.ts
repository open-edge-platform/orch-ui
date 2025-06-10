/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { areArraysOfObjectsIdentical } from "@orch-ui/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isEqual } from "lodash";
import { RootState } from "./store";

export enum HostProvisionSteps {
  "Configure All Hosts" = 0,
  "Review and Customize" = 1,
}
const totalSteps = Object.keys(HostProvisionSteps).length / 2;

export type HostData = infra.HostWrite & {
  region?: infra.RegionRead;
  serialNumber?: string;
  resourceId?: string;
  os?: infra.OperatingSystemResourceRead;
  templateName?: string;
  templateVersion?: string;
  error?: string;
};

export interface HostProvisionFormState {
  currentStep: HostProvisionSteps;
  enableNextBtn: boolean;
  hasValidationError: boolean;
  showAdvancedOptions: boolean;
}

export interface HostProvisionState {
  formStatus: HostProvisionFormState;
  hosts: { [name: string]: HostData };
  commonHostData: Omit<HostData, "name"> & {
    clusterTemplateName?: string;
    clusterTemplateVersion?: string;
    vPro?: boolean;
    securityFeature?: boolean;
    publicSshKey?: infra.LocalAccountRead;
    metadata?: infra.Metadata;
  };
  autoOnboard: boolean;
  autoProvision: boolean;
  createCluster: boolean;
  hasHostDefinitionError: boolean;
}

export const initialState: HostProvisionState = {
  formStatus: {
    currentStep: HostProvisionSteps["Configure All Hosts"],
    enableNextBtn: false,
    hasValidationError: false,
    showAdvancedOptions: false,
  },
  hosts: {},
  commonHostData: {
    vPro: true,
    securityFeature: true,

    // TODO: remove, just for testing
    clusterTemplateName: "5G Template3",
    clusterTemplateVersion: "v3.4.5",
    os: {
      resourceId: "os-ubuntu",
      architecture: "x86_64",
      name: "Ubuntu",
      repoUrl: "http://archive.ubuntu.com/ubuntu",
      kernelCommand: "kvmgt vfio-iommu-type1 vfio-mdev i915.enable_gvt=1",
      updateSources: ["deb https://files.edgeorch.net orchui release"],
      sha256:
        "09f6e5d55cd9741a026c0388d4905b7492749feedbffc741e65aab35fc38430d",
      profileName: "Ubuntu-x86_profile",
      securityFeature: "SECURITY_FEATURE_SECURE_BOOT_AND_FULL_DISK_ENCRYPTION",
      osType: "OPERATING_SYSTEM_TYPE_MUTABLE",
      installedPackages:
        '{"Repo":[{"Name":"libpcre2-32-0","Version":"10.42-3","Architecture":"x86_64","Distribution":"tmv3","URL":"https://www.pcre.org/","License":"BSD","Modified":"No"},{"Name":"libpcre2-16-0","Version":"10.42-3","Architecture":"x86_64","Distribution":"tmv3","URL":"https://www.pcre.org/","License":"BSD","Modified":"No"}]}',
    },
    site: {
      name: "test",
    },
  },
  autoOnboard: true,
  autoProvision: false,
  createCluster: true,
  hasHostDefinitionError: false,
};

const containsHosts = (state: HostProvisionState) => {
  const { hosts } = state;
  return Object.keys(hosts).length > 0;
};

const isSet = (value: string | undefined) => {
  if (value === undefined) {
    return false;
  }
  return value.trim().length > 0;
};

const everyHost = (
  state: HostProvisionState,
  predicate: (hostData: HostData) => boolean,
) => {
  const { hosts } = state;
  return Object.values(hosts).every(predicate);
};

const checkSecurityFeature = (
  sfHost: infra.SecurityFeature | undefined,
  sfData: boolean | undefined,
) => {
  if (sfData) {
    return sfHost === "SECURITY_FEATURE_SECURE_BOOT_AND_FULL_DISK_ENCRYPTION";
  } else {
    return sfHost === "SECURITY_FEATURE_NONE";
  }
};

const validateStep = (state: HostProvisionState) => {
  const {
    formStatus: { currentStep },
  } = state;
  switch (currentStep) {
    case HostProvisionSteps["Configure All Hosts"]: {
      const hasSite = isSet(state.commonHostData?.site?.name);

      const hasOs = isSet(state.commonHostData?.os?.resourceId);

      const hasClusterTemplate =
        !state.createCluster ||
        (isSet(state.commonHostData?.clusterTemplateName) &&
          isSet(state.commonHostData?.clusterTemplateVersion));

      const noComponentsErrors = !state.formStatus.hasValidationError;

      // add other validations as needed

      state.formStatus.enableNextBtn =
        hasSite && hasOs && hasClusterTemplate && noComponentsErrors;
      break;
    }
    default:
      state.formStatus.enableNextBtn = true;
  }
  return state;
};

export const provisionHost = createSlice({
  name: "provisionHost",
  initialState,
  reducers: {
    goToNextStep(state) {
      if (state.formStatus.currentStep < totalSteps - 1) {
        state.formStatus.currentStep = state.formStatus.currentStep + 1;
      }
      state.formStatus.enableNextBtn = false;
      provisionHost.caseReducers.validateStep(state);
    },
    goToPrevStep(state) {
      if (state.formStatus.currentStep > 0) {
        state.formStatus.currentStep = state.formStatus.currentStep - 1;
      }
      provisionHost.caseReducers.validateStep(state);
    },
    setShowAdvancedOptions(state, action: PayloadAction<boolean>) {
      state.formStatus.showAdvancedOptions = action.payload;
    },
    reset() {
      return initialState;
    },
    setValidationError(state, action: PayloadAction<boolean>) {
      state.formStatus.hasValidationError = action.payload;
      provisionHost.caseReducers.validateStep(state);
    },
    validateStep,
    setHostDefinitionError(state, action: PayloadAction<boolean>) {
      state.hasHostDefinitionError = action.payload;
    },
    setAutoOnboardValue(state, action: PayloadAction<boolean>) {
      state.autoOnboard = action.payload;
    },
    setAutoProvisionValue(state, action: PayloadAction<boolean>) {
      state.autoProvision = action.payload;
    },
    setCreateClusterValue(state, action: PayloadAction<boolean>) {
      state.createCluster = action.payload;
    },
    setHostsBasicData(
      state,
      action: PayloadAction<{ hosts: infra.HostRead[] }>,
    ) {
      const { hosts } = action.payload;
      state.hosts = {};
      hosts.forEach((host) => {
        state.hosts[host.name] = {
          name: host.name,
          serialNumber: host.serialNumber,
          uuid: host.uuid,
        };
      });
    },
    setHostData(state, action: PayloadAction<{ host: infra.HostRead }>) {
      const { host } = action.payload;
      state.hosts[host.name] = {
        ...state.hosts[host.name],
        ...host,
      };
    },
    updateRegisteredHost(
      state,
      action: PayloadAction<{ host: infra.HostRead }>,
    ) {
      const { hosts } = state;
      const { host: newHost } = action.payload;

      hosts[newHost.name] = {
        ...hosts[newHost.name],
        resourceId: newHost.resourceId,
      };
    },
    populateCommonHostData(state) {
      const { hosts } = state;
      Object.keys(hosts).forEach((hostName) => {
        const host = hosts[hostName];
        if (!host.instance) {
          host.instance = {};
        }
        host.site = state.commonHostData.site;
        host.instance.os = state.commonHostData.os;
        host.instance.osID = state.commonHostData.os?.resourceId;

        if (state.createCluster) {
          host.templateName = state.commonHostData.clusterTemplateName;
          host.templateVersion = state.commonHostData.clusterTemplateVersion;
        }

        // TODO: how to populate vPro
        host.instance.securityFeature = state.commonHostData.securityFeature
          ? "SECURITY_FEATURE_SECURE_BOOT_AND_FULL_DISK_ENCRYPTION"
          : "SECURITY_FEATURE_NONE";
        host.instance.localAccountID =
          state.commonHostData.publicSshKey?.resourceId;
        host.metadata = state.commonHostData.metadata;
        // continue with other properties
      });
    },
    setCommonSite(state, action: PayloadAction<infra.SiteRead>) {
      state.commonHostData.site = action.payload;
      provisionHost.caseReducers.validateStep(state);
    },
    setCommonOsProfile(
      state,
      action: PayloadAction<infra.OperatingSystemResourceRead>,
    ) {
      state.commonHostData.os = action.payload;
      provisionHost.caseReducers.validateStep(state);
    },
    setCommonClusterTemplateName(state, action: PayloadAction<string>) {
      state.commonHostData.clusterTemplateName = action.payload;
      provisionHost.caseReducers.validateStep(state);
    },
    setCommonClusterTemplateVersion(state, action: PayloadAction<string>) {
      state.commonHostData.clusterTemplateVersion = action.payload;
      provisionHost.caseReducers.validateStep(state);
    },
    setCommonVPro(state, action: PayloadAction<boolean>) {
      state.commonHostData.vPro = action.payload;
    },
    setCommonSecurityFeature(state, action: PayloadAction<boolean>) {
      state.commonHostData.securityFeature = action.payload;
    },
    setCommonPublicSshKey(
      state,
      action: PayloadAction<infra.LocalAccountRead | undefined>,
    ) {
      state.commonHostData.publicSshKey = action.payload;
    },
    setCommonMetadata(state, action: PayloadAction<infra.Metadata>) {
      state.commonHostData.metadata = action.payload;
    },
    removeHost(state, action: PayloadAction<string>) {
      delete state.hosts[action.payload];
    },
  },
});

export const {
  goToNextStep,
  goToPrevStep,
  setShowAdvancedOptions,
  reset,
  setValidationError,
  setHostDefinitionError,
  setAutoOnboardValue,
  setAutoProvisionValue,
  setCreateClusterValue,
  setHostsBasicData,
  updateRegisteredHost,
  populateCommonHostData,
  setCommonSite,
  setCommonOsProfile,
  setCommonClusterTemplateName,
  setCommonClusterTemplateVersion,
  setCommonVPro,
  setCommonSecurityFeature,
  setCommonPublicSshKey,
  setCommonMetadata,
  removeHost,
} = provisionHost.actions;

// selectors
export const selectHostProvisionState = (state: RootState) =>
  state.provisionHost;

export const selectHosts = (state: RootState) => state.provisionHost.hosts;

export const selectUnregisteredHosts = (
  state: RootState,
): { [id: string]: HostData } => {
  const unRegistered = {};
  const { hosts } = state.provisionHost;
  // TODO: convert to map/filter
  Object.keys(hosts).forEach((key) => {
    const host = hosts[key];
    if (!host.resourceId) unRegistered[key] = host;
  });
  return unRegistered;
};

export const selectContainsHosts = (state: RootState) =>
  containsHosts(state.provisionHost);

export const selectCommonHostData = (state: RootState) =>
  state.provisionHost.commonHostData;

export const selectNoChangesInHosts = (state: RootState) =>
  everyHost(state.provisionHost, (host) => {
    const commonData = state.provisionHost.commonHostData;

    let result =
      host.site?.name === commonData.site?.name &&
      host.instance?.os?.name === commonData.os?.name &&
      host.instance?.osID === commonData.os?.resourceId &&
      checkSecurityFeature(
        host.instance?.securityFeature,
        commonData.securityFeature,
      ) &&
      host.instance?.localAccountID === commonData.publicSshKey?.resourceId &&
      isEqual(host.metadata ?? [], commonData.metadata ?? []);

    if (state.provisionHost.createCluster) {
      result &&=
        host.templateName === commonData.clusterTemplateName &&
        host.templateVersion === commonData.clusterTemplateVersion;
    }
    return result && false;
  });

export default provisionHost.reducer;
