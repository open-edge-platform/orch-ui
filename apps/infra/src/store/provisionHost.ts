/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isEqual } from "lodash";
import { RootState } from "./store";

export enum HostProvisionSteps {
  "Configure All Hosts" = 0,
  "Review and Customize" = 1,
}
const totalSteps = Object.keys(HostProvisionSteps).length / 2;

export type HostData = infra.HostResourceWrite & {
  site?: SiteReadWithPath;
  region?: infra.RegionResourceWrite;
  serialNumber?: string;
  resourceId?: string;
  templateName?: string;
  templateVersion?: string;
  error?: string;
  enableVpro?: boolean;
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
  commonHostData: Omit<HostData, "name" | "site"> & {
    site?: SiteReadWithPath;
    os?: infra.OperatingSystemResourceRead;
    clusterTemplateName?: string;
    clusterTemplateVersion?: string;
    vPro?: boolean;
    securityFeature?: boolean;
    publicSshKey?: infra.LocalAccountResourceRead;
    metadata?: infra.MetadataItem[];
  };
  autoOnboard: boolean;
  registerHost: boolean;
  autoProvision: boolean;
  createCluster: boolean;
  hasHostDefinitionError: boolean;
  kubernetesVersion: string;
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
    vPro: false,
    securityFeature: false,
  },
  autoOnboard: true,
  registerHost: true,
  autoProvision: true,
  createCluster: true,
  hasHostDefinitionError: false,
  kubernetesVersion: "",
};

export type SiteReadWithPath = infra.SiteResourceRead & {
  path?: string[];
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
    setHostErrorMessage(
      state,
      action: PayloadAction<{ hostName: string; message: string }>,
    ) {
      const { hostName, message } = action.payload;
      state.hosts[hostName].error = message;
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
    setRegisterHostValue(state, action: PayloadAction<boolean>) {
      state.registerHost = action.payload;
    },
    setCreateClusterValue(state, action: PayloadAction<boolean>) {
      state.createCluster = action.payload;
    },
    setHostsBasicData(
      state,
      action: PayloadAction<{ hosts: infra.HostResourceRead[] }>,
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
    setHostData(state, action: PayloadAction<{ host: HostData }>) {
      const { host } = action.payload;
      state.hosts[host.name] = {
        ...state.hosts[host.name],
        ...host,
      };
    },
    updateRegisteredHost(
      state,
      action: PayloadAction<{ host: infra.HostResourceRead }>,
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

        host.enableVpro = state.commonHostData.vPro;
        host.instance.localAccountID =
          state.commonHostData.publicSshKey?.resourceId;
        host.metadata = state.commonHostData.metadata;
      });
    },
    setCommonSite(state, action: PayloadAction<SiteReadWithPath>) {
      state.commonHostData.site = action.payload;
      provisionHost.caseReducers.validateStep(state);
    },
    setCommonOsProfile(
      state,
      action: PayloadAction<infra.OperatingSystemResourceRead>,
    ) {
      const changed = state.commonHostData?.os?.name !== action.payload.name;
      state.commonHostData.os = action.payload;
      state.kubernetesVersion =
        (
          JSON.parse(action.payload.metadata ?? "{}") as {
            "kubernetes-version"?: string;
          }
        )["kubernetes-version"] ?? "";

      if (changed) {
        delete state.commonHostData["clusterTemplateName"];
        delete state.commonHostData["clusterTemplateVersion"];
      }
      provisionHost.caseReducers.validateStep(state);
    },
    setCommonClusterTemplateName(state, action: PayloadAction<string>) {
      state.commonHostData.clusterTemplateName = action.payload;
      delete state.commonHostData["clusterTemplateVersion"];
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
      action: PayloadAction<infra.LocalAccountResourceRead | undefined>,
    ) {
      state.commonHostData.publicSshKey = action.payload;
    },
    setCommonMetadata(state, action: PayloadAction<infra.MetadataItem[]>) {
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
  setHostErrorMessage,
  setHostDefinitionError,
  setAutoOnboardValue,
  setAutoProvisionValue,
  setCreateClusterValue,
  setHostsBasicData,
  setHostData,
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
  setRegisterHostValue,
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
      host.enableVpro === commonData.vPro &&
      host.instance?.localAccountID === commonData.publicSshKey?.resourceId &&
      isEqual(host.metadata ?? [], commonData.metadata ?? []);

    if (state.provisionHost.createCluster) {
      result &&=
        host.templateName === commonData.clusterTemplateName &&
        host.templateVersion === commonData.clusterTemplateVersion;
    }
    return result;
  });

export default provisionHost.reducer;
