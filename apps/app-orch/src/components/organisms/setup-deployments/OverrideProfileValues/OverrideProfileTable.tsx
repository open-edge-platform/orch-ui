/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { adm, catalog } from "@orch-ui/apis";
import { ApiError, Table, TableColumn, TableLoader } from "@orch-ui/components";
import { InternalError, parseError, SharedStorage } from "@orch-ui/utils";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  profileParameterOverridesSelector,
  setDeploymentApplications,
  setupDeploymentEmptyMandatoryParams,
} from "../../../../store/reducers/setupDeployment";
import ApplicationProfileOverrideSubComponent from "../../../atoms/ApplicationProfileOverrideSubComponent/ApplicationProfileOverrideSubComponent";
import "./OverrideProfileTable.scss";

const dataCy = "overrideProfileTable";

/** dictionary of `appName: OverrideValues` */
export interface OverrideValuesList {
  [key: string]: adm.OverrideValues;
}

export interface OverrideProfileTableProps {
  selectedPackage: catalog.DeploymentPackage;
  selectedProfile: catalog.DeploymentProfile;
}

const OverrideProfileTable = ({
  selectedPackage,
  selectedProfile,
}: OverrideProfileTableProps) => {
  const cy = { "data-cy": dataCy };
  const dispatch = useAppDispatch();

  const [parsedErr, setParsedErr] = useState<InternalError>();
  const [isLoading, setIsloading] = useState(false);
  const [applications, setApplications] = useState<catalog.Application[]>([]);
  const projectName = SharedStorage.project?.name ?? "";
  const mandatoryEmptyParams = useAppSelector(
    setupDeploymentEmptyMandatoryParams,
  );

  const overrideValues = useAppSelector(profileParameterOverridesSelector);

  const appsWithEmptyMandatoryParams = mandatoryEmptyParams.map((key) => {
    const parts = key.split(".");
    return parts[0];
  });

  /**
   * Given a Deployment Package loads the details for each application listed in its
   * `applicationReferences` property
   */
  const loadPackageApplications = async (dp: catalog.DeploymentPackage) => {
    const fetchApp = dp.applicationReferences.map((ar) => {
      return dispatch(
        catalog.catalogServiceApis.endpoints.catalogServiceGetApplication.initiate(
          {
            projectName,
            applicationName: ar.name,
            version: ar.version,
          },
        ),
      );
    });
    const fetchPromise = await Promise.all(fetchApp);
    const applications = fetchPromise.reduce<catalog.Application[]>(
      (list, { data, isError, error }) => {
        if (isError) {
          throw new Error(parseError(error).data);
        }
        if (data) {
          return [...list, data.application];
        }
        return list;
      },
      [],
    );
    return applications;
  };

  // When the Deployment Package changes, load the application list
  useEffect(() => {
    if (selectedPackage && selectedProfile) {
      setIsloading(true);
      loadPackageApplications(selectedPackage)
        .then((apps: catalog.Application[]) => {
          setApplications(apps);
          dispatch(
            setDeploymentApplications({
              apps,
              profile: selectedProfile,
              values: overrideValues,
            }),
          );
        })
        .catch(setParsedErr)
        .finally(() => setIsloading(false));
    }
  }, [selectedPackage, selectedProfile /* , overrideValues */]);

  const columns: TableColumn<catalog.Application>[] = [
    {
      Header: "Application Name",
      accessor: (app) => app.displayName || app.name,
      Cell: (table: { row: { original: catalog.Application } }) => {
        const applicationName = table.row.original.name;

        let mandatoryClass = "";
        if (appsWithEmptyMandatoryParams.includes(applicationName)) {
          mandatoryClass = "mandatory";
        }
        return (
          <div className={mandatoryClass}>
            {table.row.original.displayName || table.row.original.name}
          </div>
        );
      },
    },
    {
      Header: "Version",
      accessor: "version",
    },
    {
      Header: "Application Profile Name",
      accessor: (app) => selectedProfile?.applicationProfiles[app.name],
    },
    {
      Header: "Value Overrides",
      accessor: (app) => {
        const appOverrideValue = overrideValues[app.name]?.values;

        // return `is this application overriding any parameter chart value?` with a ("Yes"/"No")
        return appOverrideValue && Object.keys(appOverrideValue).length > 0
          ? "Yes"
          : "No";
      },
    },
  ];

  const getContent = () => {
    if (isLoading || !applications) return <TableLoader />;
    if (parsedErr) return <ApiError error={parsedErr} />;

    return (
      <>
        {applications.length && (
          <Table
            columns={columns}
            data={applications ?? []}
            totalOverallRowsCount={applications.length}
            canPaginate={false}
            subRow={(row) => (
              <ApplicationProfileOverrideSubComponent
                app={row.original}
                selectedProfile={selectedProfile}
              />
            )}
          />
        )}
      </>
    );
  };

  return (
    <div {...cy} className="override-values">
      {getContent()}
    </div>
  );
};

export default OverrideProfileTable;
