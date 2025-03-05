/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isValidHostName } from "../components/organism/hostConfigure/HostDetails/HostDetails";
import { RootState } from "./store";

export const ROOT_REGIONS: string = "null";

export enum HostConfigSteps {
  "Select Site" = 0,
  "Enter Host Details",
  "Add Host Labels",
  "Complete Configuration",
}
const totalSteps = Object.keys(HostConfigSteps).length / 2;

export interface HostConfigFormStatus {
  globalOsValue: string;
  globalSecurityValue: string;
  currentStep: HostConfigSteps;
  enableNextBtn: boolean;
  enablePrevBtn: boolean;
  hasValidationError: boolean;
}

export type HostData = eim.HostWrite & { region?: eim.RegionRead } & {
  serialNumber?: string;
} & { resourceId?: string } & {
  originalOs?: eim.OperatingSystemResourceRead;
} & { error?: string };

export interface HostConfigForm {
  formStatus: HostConfigFormStatus;
  hosts: { [id: string]: HostData };
  autoOnboard: boolean;
  autoProvision: boolean;
}

export const initialState: HostConfigForm = {
  formStatus: {
    currentStep: HostConfigSteps["Select Site"],
    enableNextBtn: false,
    enablePrevBtn: true,
    globalOsValue: "",
    globalSecurityValue: "",
    hasValidationError: false,
  },
  hosts: {},
  autoOnboard: false,
  autoProvision: false,
};

const containsHosts = (state: HostConfigForm) => {
  const { hosts } = state;
  return Object.keys(hosts).length > 0;
};

const everyHost = (
  state: HostConfigForm,
  predicate: (hostData: HostData) => void,
) => {
  const { hosts } = state;
  return Object.values(hosts).every(predicate);
};

const containsUniqueHostNames = (state: HostConfigForm) => {
  const { hosts } = state;
  const names = Object.values(hosts).map((host) => host.name);
  return names.length === new Set(names).size;
};

export const validateStep = (state: HostConfigForm) => {
  const {
    formStatus: { currentStep },
  } = state;
  switch (currentStep) {
    case HostConfigSteps["Select Site"]:
      // all Hosts must have site assigned before we can proceed
      state.formStatus.enableNextBtn = Boolean(
        containsHosts(state) && everyHost(state, (hd) => hd.siteId),
      );
      break;
    case HostConfigSteps["Enter Host Details"]: {
      // all Hosts must have a Name and a OsID before we can proceed
      state.formStatus.enableNextBtn = Boolean(
        containsHosts(state) &&
          containsUniqueHostNames(state) &&
          everyHost(
            state,
            (hd) =>
              hd.name &&
              isValidHostName(hd.name) &&
              hd.instance?.osID &&
              hd.instance?.securityFeature,
          ),
      );
      break;
    }
    case HostConfigSteps["Add Host Labels"]: {
      state.formStatus.enableNextBtn = !state.formStatus.hasValidationError;
      break;
    }
    default:
      // NOTE the default is for steps that don't have validation, for example the review
      state.formStatus.enableNextBtn = true;
  }
  return state;
};

export const _setAutoOnboardValue = (
  state: HostConfigForm,
  action: PayloadAction<boolean>,
) => {
  state.autoOnboard = action.payload;
};

export const configureHost = createSlice({
  name: "configureHost",
  initialState: initialState,
  reducers: {
    // for related
    goToNextStep(state) {
      if (state.formStatus.currentStep < totalSteps - 1) {
        state.formStatus.currentStep = state.formStatus.currentStep + 1;
      }
      state.formStatus.enableNextBtn = false;
      configureHost.caseReducers.validateStep(state);
    },
    goToPrevStep(state) {
      if (state.formStatus.currentStep > 0) {
        state.formStatus.currentStep = state.formStatus.currentStep - 1;
      }
      configureHost.caseReducers.validateStep(state);
    },
    reset() {
      return initialState;
    },
    // host related
    setHostErrorMessage(
      state,
      action: PayloadAction<{ hostName: string; message: string }>,
    ) {
      const { hostName, message } = action.payload;
      state.hosts[hostName].error = message;
    },
    setNewRegisteredHosts(
      state,
      action: PayloadAction<{ hosts: eim.HostRead[] }>,
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
    updateNewRegisteredHost(
      state,
      action: PayloadAction<{ host: eim.HostRead }>,
    ) {
      const { hosts } = state;
      const { host: newHost } = action.payload;

      //Get rid of the temporary version that used name as identifier
      //Since API completed there is a resourceId to use
      delete state.hosts[newHost.name];

      hosts[newHost.resourceId!] = {
        name: newHost.name,
        siteId: newHost.site?.resourceId,
        site: newHost.site,
        metadata: newHost.metadata,
        uuid: newHost.uuid,
        inheritedMetadata: newHost.inheritedMetadata,
        instance: newHost.instance,
        serialNumber: newHost.serialNumber,
        resourceId: newHost.resourceId,
      };

      // If the Instance existed in the API, the Host already had a OS
      if (newHost.instance) {
        hosts[newHost.resourceId!] = {
          ...hosts[newHost.resourceId!],
          originalOs: newHost.instance.os,
        };
      }
    },
    setHosts(state, action: PayloadAction<{ hosts: eim.HostRead[] }>) {
      const { hosts } = state;
      const { hosts: selectedHosts } = action.payload;

      selectedHosts.forEach((host) => {
        hosts[host.resourceId!] = {
          name: host.name,
          siteId: host.site?.resourceId,
          site: host.site,
          metadata: host.metadata,
          uuid: host.uuid,
          inheritedMetadata: host.inheritedMetadata,
          instance: host.instance,
          serialNumber: host.serialNumber,
          resourceId: host.resourceId,
        };

        // If the Instance existed in the API, the Host already had a OS
        if (host.instance) {
          hosts[host.resourceId!] = {
            ...hosts[host.resourceId!],
            originalOs: host.instance.os,
          };
        }
      });
    },
    removeHost(state, action: PayloadAction<string>) {
      delete state.hosts[action.payload];
    },
    setHostName(
      state,
      action: PayloadAction<{ hostId: string; name: string }>,
    ) {
      const host = selectHost(state, action.payload.hostId);
      host.name = action.payload.name;
      configureHost.caseReducers.validateStep(state);
    },
    setMetadata(state, action: PayloadAction<{ metadata: eim.Metadata }>) {
      const { hosts } = state;
      Object.values(hosts).forEach(
        (hd) => (hd.metadata = action.payload.metadata),
      );
    },

    setSecurity(
      state,
      action: PayloadAction<{ hostId: string; value: eim.SecurityFeature }>,
    ) {
      const id = action.payload.hostId;
      const host = selectHost(state, id);

      if (!host.instance) {
        host.instance = {};
      }

      host.instance.securityFeature = action.payload.value;
      configureHost.caseReducers.validateStep(state);
    },
    unsetSecurity(state, action: PayloadAction<{ hostId: string }>) {
      const id = action.payload.hostId;
      const host = selectHost(state, id);

      if (!host.instance) {
        return;
      }

      host.instance.securityFeature = undefined;
      configureHost.caseReducers.validateStep(state);
    },
    setOsProfile(
      state,
      action: PayloadAction<{
        hostId: string;
        os: eim.OperatingSystemResourceRead;
      }>,
    ) {
      const host = selectHost(state, action.payload.hostId);

      if (!host.instance) {
        host.instance = {};
      }

      host.instance!.osID = action.payload.os.resourceId;
      host.instance!.os = action.payload.os;
      configureHost.caseReducers.validateStep(state);
    },
    setRegion(state, action: PayloadAction<{ region: eim.RegionRead }>) {
      const { hosts } = state;
      Object.values(hosts).forEach((hd) => (hd.region = action.payload.region));
      configureHost.caseReducers.validateStep(state);
    },
    setSite(state, action: PayloadAction<{ site: eim.SiteRead }>) {
      const { hosts } = state;
      Object.values(hosts).forEach((hd) => {
        hd.siteId = action.payload.site.resourceId;
        hd.site = action.payload.site;
      });
      configureHost.caseReducers.validateStep(state);
    },
    setGlobalOsValue(state, action: PayloadAction<string>) {
      state.formStatus.globalOsValue = action.payload;
    },
    setGlobalSecurityValue(state, action: PayloadAction<string>) {
      state.formStatus.globalSecurityValue = action.payload;
    },
    setValidationError(state, action: PayloadAction<boolean>) {
      state.formStatus.hasValidationError = action.payload;
      configureHost.caseReducers.validateStep(state);
    },
    setAutoOnboardValue: _setAutoOnboardValue,
    setAutoProvisionValue(state, action: PayloadAction<boolean>) {
      state.autoProvision = action.payload;
    },
    validateStep,
  },
});

export const {
  goToNextStep,
  goToPrevStep,
  reset,
  setNewRegisteredHosts,
  updateNewRegisteredHost,
  setHosts,
  removeHost,
  setHostName,
  setMetadata,
  setSecurity,
  unsetSecurity,
  setOsProfile,
  setSite,
  setRegion,
  setGlobalOsValue,
  setGlobalSecurityValue,
  setHostErrorMessage,
  setValidationError,
  setAutoOnboardValue,
  setAutoProvisionValue,
} = configureHost.actions;

// selectors
export const selectHostConfigForm = (state: RootState) => state.configureHost;
export const selectHosts = (state: RootState) => state.configureHost.hosts;
export const selectUnregisteredHosts = (
  state: RootState,
): { [id: string]: HostData } => {
  const unRegistered = {};
  const { hosts } = state.configureHost;
  Object.keys(hosts).forEach((key) => {
    const host = hosts[key];
    if (!host.resourceId) unRegistered[key] = host;
  });
  return unRegistered;
};

export const selectFirstHost = (state: RootState) => {
  const hosts = state.configureHost.hosts;

  if (Object.keys(hosts).length === 0) {
    throw new Error("There are no Hosts selected for configuration.");
  }

  const key = Object.keys(hosts)[0];
  return hosts[key];
};

export const selectHostById = (id: string) => (state: RootState) =>
  selectHost(state.configureHost, id);

const selectHost = (state: HostConfigForm, id: string) => {
  if (!(id in state.hosts)) {
    throw new Error(`Hosts ${id} not found in redux state`);
  }
  return state.hosts[id];
};

export const selectContainsHosts = (state: RootState) =>
  containsHosts(state.configureHost);

export const isSecurityEnabled = (
  securityFeature?: eim.SecurityFeature,
): boolean =>
  securityFeature === "SECURITY_FEATURE_SECURE_BOOT_AND_FULL_DISK_ENCRYPTION";

// takes a Host from the redux store and converts it to a Host that can be sent to the API
// this selector might be not needed
export const getHostWrite = (
  state: RootState,
  hostId: string,
): eim.HostWrite => {
  const { name, siteId, uuid, metadata } = selectHost(
    state.configureHost,
    hostId,
  );

  return { name, siteId, uuid, metadata };
};

export default configureHost.reducer;
