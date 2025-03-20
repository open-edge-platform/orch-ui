/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { adm } from "@orch-ui/apis";
import {
  CardBox,
  CardContainer,
  Flex,
  MetadataDisplay,
  MetadataPair,
} from "@orch-ui/components";
import { Button, Icon, Text } from "@spark-design/react";
import { useNavigate } from "react-router-dom";
import DeploymentStatusCounter from "../../atoms/DeploymentStatusCounter/DeploymentStatusCounter";
import HostStatusCounter from "../../atoms/HostStatusCounter/HostStatusCounter";
import DeploymentSiteSummary from "../DeploymentSiteSummary/DeploymentSiteSummary";
import "./DeploymentSummary.scss";

const dataCy = "deploymentSummary";

interface DeploymentSummaryProps {
  deployment: adm.Deployment;
}

const DeploymentSummary = ({ deployment }: DeploymentSummaryProps) => {
  const cy = { "data-cy": dataCy };
  const applicationPackageUrl = `/applications/package/${deployment.appName}/version/${deployment.appVersion}`;
  const navigate = useNavigate();
  const metadata: MetadataPair[] =
    // Get metadata only if targetClusters with atleast one cluster & cluster.labels are available
    deployment.targetClusters &&
    deployment.targetClusters.length > 0 &&
    deployment.targetClusters[0].labels
      ? Object.entries(deployment.targetClusters[0].labels).map((kv) => ({
          key: kv[0],
          value: kv[1],
        }))
      : [];

  return (
    <div {...cy} className="deploymentSummary">
      <Flex cols={[6, 6]}>
        <CardContainer
          className="deploymentSummary-applicationPackage column"
          cardTitle="Deployment Package"
          titleSemanticLevel={6}
        >
          <CardBox dataCy="applicationPackageDetails">
            <Flex cols={[3, 9]}>
              {/* TODO replace with the correct icon */}
              <Icon icon="cube" className="icon" />
              <div>
                <Text className="caName" size="l">
                  {deployment.appName}
                </Text>
                <Text className="caVersion" size="m">
                  Version {deployment.appVersion}
                </Text>
                <Button
                  onPress={() => navigate(applicationPackageUrl)}
                  variant="ghost"
                  size="l"
                  data-cy="caDetailsLink"
                >
                  View Details
                </Button>
              </div>
            </Flex>
          </CardBox>
        </CardContainer>
        <CardContainer
          className="deploymentSummary-applicationPackage column"
          cardTitle="Deployment Metadata"
          titleSemanticLevel={6}
        >
          <MetadataDisplay metadata={metadata} />
        </CardContainer>
      </Flex>
      <Flex cols={[6, 6]}>
        <div>
          {/* NOTE that deployment status is always present, see LPUUH-575 */}
          {deployment.status ? (
            <DeploymentStatusCounter
              summary={deployment.status.summary!}
              showAllStates
            />
          ) : null}
        </div>
        <div>
          <HostStatusCounter deployment={deployment} showAllStates />
        </div>
      </Flex>
      <div>
        <DeploymentSiteSummary deployment={deployment} />
      </div>
    </div>
  );
};

export default DeploymentSummary;
