/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { adm, catalog } from "@orch-ui/apis";
import { OrchTable } from "@orch-ui/components";
import { SharedStorage, SparkTableColumn } from "@orch-ui/utils";
import { Dropdown } from "@spark-design/react";
import { useEffect, useState } from "react";
import { ApplicationTableColumns } from "../DeploymentDetailsDrawerContent/DeploymentDetailsDrawerContent";
import "./DeploymentApplicationsTable.scss";

export const dataCy = "deploymentApplicationsTable";
interface DeploymentApplicationsTableProps {
  deployment: adm.Deployment;
  deploymentPackage: catalog.DeploymentPackage;
}

const DeploymentApplicationsTable = ({
  deployment,
  deploymentPackage,
}: DeploymentApplicationsTableProps) => {
  const cy = { "data-cy": dataCy };
  const [appTableState, setAppTableState] = useState<{
    applicationList: catalog.Application[];
    lazyAppRefIndex: number;
  }>({
    applicationList: [],
    lazyAppRefIndex: 0,
  });
  const [selectedDeploymentProfile, setSelectedDeploymentProfile] =
    useState<catalog.DeploymentProfile>();
  const projectName = SharedStorage.project?.name ?? "";
  let appParam: catalog.CatalogServiceGetApplicationApiArg = {
    applicationName: "",
    version: "",
    projectName: "",
  };

  const getOverrideValues = (
    profiles: catalog.Profile[],
    deployment: adm.Deployment,
    appName: string,
  ) => {
    let hasOverride = false;
    const mapValues = (
      override: adm.OverrideValues,
      param: catalog.ParameterTemplate,
      appName: string,
    ) => {
      const setOverrides = (
        obj: object,
        parentKey = "",
      ): { [key: string]: string }[] => {
        return Object.entries(obj).flatMap(([key, value]) => {
          const currentKey = parentKey ? `${parentKey}.${key}` : key;
          if (typeof value === "object" && !Array.isArray(value)) {
            return setOverrides(value as object, currentKey);
          } else {
            return [{ [currentKey]: value }];
          }
        });
      };

      const overrides = setOverrides(override.values ?? {});

      let values = <></>;
      overrides.forEach((value: { [key: string]: string }) => {
        if (
          appName === override.appName &&
          param.name === Object.keys(value).toString()
        ) {
          hasOverride = true;
          values = (
            <tr>
              <td data-cy="paramName" className="param-name">
                {Object.keys(value).toString()}
              </td>
              <td>
                <Dropdown
                  data-cy="paramValue"
                  placeholder={Object.values(value)[0].toString() ?? ""}
                  isDisabled={true}
                  name={"overrideName"}
                  label={""}
                />
              </td>
            </tr>
          );
        }
      });
      return values;
    };
    const mapDeployments = (param: catalog.ParameterTemplate) => {
      return deployment.overrideValues?.map((override) => {
        return mapValues(override, param, appName);
      });
    };
    const mapProfiles = (profile: catalog.Profile) => {
      return profile?.parameterTemplates?.map((param) => {
        return mapDeployments(param);
      });
    };

    const overrides = profiles?.map((profile: catalog.Profile) => {
      return mapProfiles(profile);
    });
    return { overrides, hasOverride };
  };

  useEffect(() => {
    if (deploymentPackage.profiles) {
      setSelectedDeploymentProfile(
        // Find the DP Profile (use deployment.profileName if present or default to deploymentPackage.defaultProfileName)
        deploymentPackage.profiles?.filter(
          (profile) =>
            (deployment.profileName || deploymentPackage.defaultProfileName) ===
            profile.name,
        )[0],
      );
    }
  }, [deploymentPackage.profiles]);

  const columns: SparkTableColumn<
    catalog.Application,
    ApplicationTableColumns
  >[] = [
    {
      Header: "Display Name",
      accessor: (application) => {
        return <>{application.displayName || application.name}</>;
      },
    },
    {
      Header: "Version",
      accessor: "version",
    },
    {
      Header: "Helm Registry",
      accessor: "helmRegistryName",
    },
    {
      Header: "Application Profiles",
      accessor: (application) => {
        return (
          <div data-cy="appProfile">
            {/* From the selected deployment package profile, use it's `applicationProfiles` to get the profile setting on `application.name`*/}
            {selectedDeploymentProfile?.applicationProfiles[application.name] ||
              "-"}
          </div>
        );
      },
    },
    {
      Header: "Value Overrides",
      accessor: "profiles",
      Cell: (table) => {
        if (
          getOverrideValues(
            table.row.original.profiles ?? [],
            deployment,
            table.row.original.name,
          ).hasOverride
        ) {
          return <>Yes</>;
        } else {
          return <>No</>;
        }
      },
    },
  ];

  const appRefs = deploymentPackage.applicationReferences;
  if (appTableState.lazyAppRefIndex < appRefs.length) {
    appParam = {
      applicationName: appRefs[appTableState.lazyAppRefIndex].name,
      version: appRefs[appTableState.lazyAppRefIndex].version,
      projectName,
    };
  }
  // NOTE: This hooks needs to be called for every table row!!
  const {
    data: applicationData,
    isFetching,
    isLoading,
  } = catalog.useCatalogServiceGetApplicationQuery(appParam, {
    skip: appTableState.lazyAppRefIndex >= appRefs.length || !projectName,
  });

  // Update table list untill lazyIndex equals length of appRef list
  // Rerender table after every Application-AppRef API mapping
  if (
    appTableState.lazyAppRefIndex < appRefs.length &&
    !isFetching &&
    !isLoading
  ) {
    const appListCopy = appTableState.applicationList.slice();
    appListCopy.push(
      applicationData
        ? applicationData.application
        : {
            name: appParam.applicationName,
            version: appParam.version,
            chartName: "N/A",
            chartVersion: "N/A",
            helmRegistryName: "N/A",
          },
    );
    setAppTableState({
      lazyAppRefIndex: appTableState.lazyAppRefIndex + 1,
      applicationList: appListCopy,
    });
  }

  const getSubRow = (table: { row: { original: catalog.Application } }) => {
    const { row } = table;
    let profiles: catalog.Profile[] = [];
    const parameterTemplates: catalog.ParameterTemplate[] = [];

    if (row.original.profiles) {
      profiles = row.original.profiles;
    }
    profiles?.forEach((value) => {
      value.parameterTemplates?.forEach((parameter) => {
        parameterTemplates.push(parameter);
      });
    });

    // filter override values from parameter overrides
    // to show only override values for that application
    if (
      row.original.profiles &&
      getOverrideValues(row.original.profiles, deployment, row.original.name)
        .hasOverride
    ) {
      return (
        <table className="override-form" data-cy="profileExpand">
          <tr>
            <td></td>
            <td className="param-title">Override Values</td>
          </tr>
          {
            getOverrideValues(
              row.original.profiles,
              deployment,
              row.original.name,
            ).overrides
          }
        </table>
      );
    } else {
      return <>No override values available</>;
    }
  };

  return (
    <div {...cy} className="deployment-applications-table">
      <OrchTable
        tableProps={{
          columns: columns,
          data: appTableState.applicationList,
          size: "m",
          subComponent:
            deployment.overrideValues && deployment.overrideValues.length > 0
              ? getSubRow
              : undefined,
        }}
        isSuccess={appTableState.applicationList.length > 0}
      />
    </div>
  );
};

export default DeploymentApplicationsTable;
