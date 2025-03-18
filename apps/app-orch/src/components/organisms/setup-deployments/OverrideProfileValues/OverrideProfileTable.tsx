/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { adm, catalog } from "@orch-ui/apis";
import { ApiError, Table, TableColumn, TableLoader } from "@orch-ui/components";
import { LpInternalError, parseError, SharedStorage } from "@orch-ui/utils";
import { MessageBanner } from "@spark-design/react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  setDeploymentApplications,
  setupDeploymentEmptyMandatoryParams,
} from "../../../../store/reducers/setupDeployment";
import ApplicationProfileParameterOverrideForm from "../../../atoms/ApplicationProfileParameterOverrideForm/ApplicationProfileParameterOverrideForm";
import "./OverrideProfileTable.scss";

const dataCy = "overrideProfileTable";

/** dictionary of `appName: OverrideValues` */
export interface OverrideValuesList {
  [key: string]: adm.OverrideValues;
}

export interface OverrideProfileTableProps {
  selectedPackage: catalog.DeploymentPackage;
  selectedProfile: catalog.DeploymentProfile;
  overrideValues: OverrideValuesList;
  onOverrideValuesUpdate: (updatedOverrideValues: OverrideValuesList) => void;
}

const OverrideProfileTable = ({
  selectedPackage,
  selectedProfile,
  overrideValues,
  onOverrideValuesUpdate,
}: OverrideProfileTableProps) => {
  const cy = { "data-cy": dataCy };
  const dispatch = useAppDispatch();

  const [parsedErr, setParsedErr] = useState<LpInternalError>();
  const [isLoading, setIsloading] = useState(false);
  const [applications, setApplications] = useState<catalog.Application[]>([]);
  const projectName = SharedStorage.project?.name ?? "";
  const mandatoryEmptyParams = useAppSelector(
    setupDeploymentEmptyMandatoryParams,
  );
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
    if (selectedPackage) {
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
  }, [selectedPackage, selectedProfile, overrideValues]);

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

  /** This will render application profiles with override form upon row expand */
  const RenderSubComponent = ({
    row: { original: app },
  }: {
    row: { original: catalog.Application };
  }) => {
    /** Application Profile configuration on the selected deployment package profile */
    const appProfile = app.profiles?.find(
      (profile) =>
        // Check if the application profile name is what is seen selected in the selected deployment package profile
        profile.name === selectedProfile.applicationProfiles[app.name],
    );
    /** stored override values belonging specifically to the application */
    const overrides = overrideValues[app.name] ?? { appName: app.name };

    if (!appProfile) {
      return (
        <MessageBanner
          messageTitle="Error while reading Parameter Template"
          messageBody={`No profile found for app "${app.name}@${app.version} in Deployment Profile ${selectedProfile.name}"`}
          variant="error"
        />
      );
    }

    return (
      <ApplicationProfileParameterOverrideForm
        application={app}
        applicationProfile={appProfile}
        parameterOverrides={overrides}
        onParameterUpdate={(updatedOverrideValue: adm.OverrideValues) =>
          onOverrideValuesUpdate({
            [app.name]: updatedOverrideValue,
          })
        }
      />
    );
  };

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
            subRow={(row) => <RenderSubComponent row={row} />}
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
