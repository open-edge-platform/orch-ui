/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { RuntimeConfig } from "@orch-ui/utils";
import { TextField } from "@spark-design/react";
import React, { ComponentType, LazyExoticComponent } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  selectHostProvisionState,
  setCommonClusterTemplateName,
  setCommonClusterTemplateVersion,
  setCommonOsProfile,
  setCommonSite,
} from "../../../store/provisionHost";
import OsProfileDropdown from "../OsProfileDropdown/OsProfileDropdown";
import "./ConfigureAllHosts.scss";

const dataCy = "configureAllHosts";

type RemoteComponent = LazyExoticComponent<ComponentType<any>> | null;

let ClusterTemplatesDropdownRemote: RemoteComponent = null;
let ClusterTemplateVersionsDropdownRemote: RemoteComponent = null;

if (RuntimeConfig.isEnabled("CLUSTER_ORCH")) {
  ClusterTemplatesDropdownRemote = React.lazy(
    async () => await import("ClusterOrchUI/ClusterTemplatesDropdown"),
  );
  ClusterTemplateVersionsDropdownRemote = React.lazy(
    async () => await import("ClusterOrchUI/ClusterTemplateVersionsDropdown"),
  );
}

const ConfigureAllHosts = () => {
  const cy = { "data-cy": dataCy };

  const dispatch = useAppDispatch();

  const { commonHostData } = useAppSelector(selectHostProvisionState);

  return (
    <div {...cy} className="configure-all-hosts">
      Site:{" "}
      <TextField
        value={commonHostData?.site?.name}
        onChange={(value: string) => {
          dispatch(setCommonSite({ name: value, siteID: value }));
        }}
      />
      <OsProfileDropdown
        value={commonHostData?.os?.resourceId}
        hideLabel
        onSelectionChange={(os) => {
          if (!os) return;
          dispatch(setCommonOsProfile(os));
        }}
      />
      {ClusterTemplatesDropdownRemote && (
        <ClusterTemplatesDropdownRemote
          clusterTemplateName={commonHostData.clusterTemplateName}
          onSelectionChange={(value: string) => {
            dispatch(setCommonClusterTemplateName(value));
          }}
        />
      )}
      {ClusterTemplateVersionsDropdownRemote && (
        <ClusterTemplateVersionsDropdownRemote
          clusterTemplateVersion={commonHostData.clusterTemplateVersion}
          templateName={commonHostData.clusterTemplateName}
          isDisabled={
            !(
              commonHostData.clusterTemplateName &&
              commonHostData.clusterTemplateName.length > 0
            )
          }
          onSelectionChange={(value: string) => {
            dispatch(setCommonClusterTemplateVersion(value));
          }}
        />
      )}
    </div>
  );
};

export default ConfigureAllHosts;
