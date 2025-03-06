/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { adm, catalog, cm } from "@orch-ui/apis";
import {
  AggregatedStatuses,
  AggregatedStatusesMap,
  aggregateStatuses,
  Flex,
  MetadataPair,
  SquareSpinner,
  Table,
  TableColumn,
} from "@orch-ui/components";
import { clusterToStatuses } from "@orch-ui/utils";
import { Heading, Text, ToggleSwitch } from "@spark-design/react";
import { TextSize, ToggleSwitchSize } from "@spark-design/tokens";
import { useCallback, useState } from "react";
import { useAppSelector } from "../../../../store/hooks";
import { setupDeploymentApplications } from "../../../../store/reducers/setupDeployment";
import { flattenObject, generateMetadataPair } from "../../../../utils/global";
import DeploymentPackage from "../../../atoms/DeploymentPackage/DeploymentPackage";
import { DeploymentType } from "../../../pages/SetupDeployment/SetupDeployment";
import { OverrideValuesList } from "../../setup-deployments/OverrideProfileValues/OverrideProfileTable";
import "./Review.scss";

export const dataCy = "review";

type Diff = {
  parameterName: string;
  oldValue: string;
  newValue: string;
};

type MetadataDiff = {
  oldPair: string;
  newPair: string;
};

interface ReviewProps {
  deployment: adm.DeploymentRead;
  deploymentType?: string | DeploymentType;
  selectedPackage?: catalog.DeploymentPackage;
  selectedProfile?: catalog.DeploymentProfile;
  selectedParameterOverrides?: OverrideValuesList;
  selectedDeploymentName?: string;
  selectedMetadata: MetadataPair[];
  selectedClusters?: cm.ClusterInfoRead[];
}

const Review = ({
  deployment,
  deploymentType,
  selectedPackage,
  selectedProfile,
  selectedParameterOverrides,
  selectedDeploymentName,
  selectedMetadata,
  selectedClusters,
}: ReviewProps) => {
  const cy = { "data-cy": dataCy };
  console.log(deploymentType);
  const [changedOnly, setChangedOnly] = useState<boolean>(false);

  if (
    !deploymentType ||
    !selectedPackage ||
    !selectedProfile ||
    !selectedDeploymentName ||
    !selectedParameterOverrides
  ) {
    return <SquareSpinner />;
  }

  const deploymentApps = useAppSelector(setupDeploymentApplications);

  const asterisk = useCallback(
    (newValue?: string, oldValue?: string): string =>
      newValue !== oldValue ? " *" : "",
    [],
  );

  const basicColumns: TableColumn<Diff>[] = [
    { Header: "Parameter", accessor: "parameterName" },
    { Header: "Original Value", accessor: "oldValue" },
    { Header: "New Value", accessor: "newValue" },
  ];

  const basicDiff: Diff[] = [
    {
      parameterName: "Deployment Name",
      oldValue: deployment.displayName || deployment.name || "",
      newValue: `${selectedDeploymentName}${asterisk(
        selectedDeploymentName,
        deployment.displayName || deployment.name || "",
      )}`,
    },
    {
      parameterName: "Package Profile",
      oldValue: deployment.profileName ?? "",
      newValue: `${selectedProfile?.name}${asterisk(
        selectedProfile?.name,
        deployment.profileName,
      )}`,
    },
  ];

  const basicDiffChangedOnly = basicDiff.filter(
    ({ oldValue, newValue }) => oldValue !== newValue,
  );

  const parameterOverridesDiff = Object.entries(selectedParameterOverrides).map(
    ([appName, overrides]) => {
      const app = deploymentApps.find((app) => app.name === appName);

      if (!app) {
        throw new Error(`Unknown deployment application ${appName}`);
      }

      const profileName = selectedProfile.applicationProfiles[appName];
      const profileParamTemplates = app.profiles?.find(
        (profile) => profile.name === profileName,
      )?.parameterTemplates;

      if (!profileParamTemplates) {
        throw new Error(
          `Profile ${profileName} of application ${appName} is missing parameter templates`,
        );
      }

      const newValues = flattenObject(overrides?.values ?? {});
      const oldValues = flattenObject(
        deployment.overrideValues?.find((ov) => ov.appName === appName)
          ?.values ?? {},
      );

      if (Object.keys(newValues).length === 0) {
        throw new Error(
          `Selected parameter overrides for application ${appName} got no values.`,
        );
      }

      const diff: Diff[] = Object.entries(newValues).map(([key, value]) => ({
        parameterName:
          profileParamTemplates.find((ppt) => ppt.name === key)?.displayName ??
          "",
        oldValue: oldValues[key],
        newValue: `${value}${asterisk(value, oldValues[key])}`,
      }));

      return {
        header: `${app.displayName || app.name} (version ${app.version})`,
        diff,
      };
    },
  );

  const metadataColumns: TableColumn<MetadataDiff>[] = [
    { Header: "Original Metadata", accessor: "oldPair" },
    { Header: "New Metadata", accessor: "newPair" },
  ];

  const originalMetadata = generateMetadataPair(
    deployment.targetClusters?.find(
      (tc) => Object.keys(tc.labels ?? {}).length > 0,
    )?.labels ?? {},
  );

  const metadataDiff: MetadataDiff[] = selectedMetadata.map(
    ({ key, value }) => {
      const oldPair = originalMetadata.find(({ key: k }) => k === key);
      const newPair = `${key} = ${value}${asterisk(value, oldPair?.value)}`;

      return {
        oldPair: oldPair ? `${oldPair.key} = ${oldPair.value}` : "",
        newPair,
      };
    },
  );

  const metadataDiffChangedOnly = metadataDiff.filter(
    ({ oldPair, newPair }) => oldPair !== newPair,
  );

  const clusterColumns: TableColumn<cm.ClusterInfoRead>[] = [
    {
      Header: "Cluster Name",
      accessor: (item) => item.name + " *",
    },
    {
      Header: "Host Count",
      accessor: "nodeQuantity",
    },
    {
      Header: "Status",
      accessor: (item) =>
        aggregateStatuses(clusterToStatuses(item), "lifecyclePhase").message,
      Cell: (table) => (
        <AggregatedStatuses<AggregatedStatusesMap>
          statuses={clusterToStatuses(table.row.original)}
          defaultStatusName="lifecyclePhase"
        />
      ),
    },
  ];

  return (
    <div {...cy} className="review">
      <Text size={TextSize.Large} data-cy="title">
        Review Changes: {selectedDeploymentName}
      </Text>
      <Flex cols={[6, 6]}>
        <DeploymentPackage
          name={selectedPackage.name}
          version={selectedPackage.version}
          description={selectedPackage.description}
        />
        <div className="review__deployment-type">
          <Heading
            semanticLevel={6}
            className={"review__deployment-type__name"}
          >
            {deploymentType === DeploymentType.AUTO && "Automatic"}
            {deploymentType === DeploymentType.MANUAL && "Manual"} Deployment
          </Heading>
          <Text className={"review__deployment-type__description"}>
            {deploymentType === DeploymentType.AUTO &&
              "Deploy to clusters with metadata that matches deployment's metadata."}
            {deploymentType === DeploymentType.MANUAL &&
              "Deploy package to selected clusters."}
          </Text>
        </div>
      </Flex>
      <ToggleSwitch
        data-cy="changedOnlySwitch"
        isSelected={changedOnly}
        onChange={setChangedOnly}
        size={ToggleSwitchSize.Large}
      >
        Display changes only
      </ToggleSwitch>
      <Heading semanticLevel={6}>Deployment</Heading>
      <Flex cols={[8, 4]} className="table-three-columns">
        <Table
          dataCy="basic"
          columns={basicColumns}
          data={changedOnly ? basicDiffChangedOnly : basicDiff}
        />
        <></>
      </Flex>
      <Heading semanticLevel={6}>Applications and Profile Values</Heading>
      {parameterOverridesDiff.map(({ header, diff }) => (
        <>
          <Text size={TextSize.Large}>{header}</Text>
          <Flex cols={[8, 4]} className="table-three-columns">
            <Table
              dataCy="basic"
              columns={basicColumns}
              data={
                changedOnly
                  ? diff.filter(
                      ({ oldValue, newValue }) => oldValue !== newValue,
                    )
                  : diff
              }
            />
            <></>
          </Flex>
        </>
      ))}
      {deploymentType === DeploymentType.AUTO && (
        <>
          <Heading semanticLevel={6}>Metadata</Heading>
          <Flex cols={[7, 5]}>
            <Table
              dataCy="metadata"
              columns={metadataColumns}
              data={changedOnly ? metadataDiffChangedOnly : metadataDiff}
            />
            <></>
          </Flex>
        </>
      )}
      {deploymentType === DeploymentType.MANUAL && (
        <>
          <Heading semanticLevel={6}>Clusters</Heading>
          <Table
            dataCy="clusterReviewList"
            columns={clusterColumns}
            data={selectedClusters}
            sortColumns={[0, 1]}
          />
        </>
      )}
    </div>
  );
};

export default Review;
