/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { tm } from "@orch-ui/apis";
import {
  AppOrchGuard,
  Flex,
  MetadataPair,
  SquareSpinner,
} from "@orch-ui/components";
import { SharedStorage } from "@orch-ui/utils";
import { Button, Heading, Tag } from "@spark-design/react";
import { ButtonVariant } from "@spark-design/tokens";
import React, { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardCard from "../../atoms/DashboardCard/DashboardCard";
import DeploymentDrawer from "../../organisms/DeploymentDrawer/DeploymentDrawer";
import DeploymentsContainer from "../../organisms/DeploymentsContainer/DeploymentsContainer";
import FiltersDrawer from "../../organisms/FiltersDrawer/FiltersDrawer";
import "./DashboardSummaries.scss";
//import AppOrchUIDeploymentStatus from "AppOrchUI/DeploymentsStatus"; //delay the load

const AppOrchUIDeploymentStatus = React.lazy(
  () => import("AppOrchUI/DeploymentsStatus"),
);
const EimUIHostStatus = React.lazy(() => import("EimUI/HostStatus"));

type urlParams = {
  deploymentId?: string;
};

export const DashboardSummaries = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<MetadataPair[]>([]);
  const { deploymentId } = useParams<urlParams>();
  const [projectName, setProjectName] = useState<string>("");

  const { data: projects } = tm.useListV1ProjectsQuery({ "member-role": true });
  useEffect(() => {
    setProjectName(
      projects?.find((proj) => proj.name === SharedStorage.project?.name)?.spec
        ?.description ?? "",
    );
  }, [projects, SharedStorage.project?.name]);

  const handleFilterChanges = (metadataPairs: MetadataPair[]) => {
    setFilters(metadataPairs);
  };

  const handleRemoveFilter = (filter: MetadataPair) => {
    setFilters((currentFilters) =>
      currentFilters.filter(
        (pair) => pair.key !== filter.key && pair.value !== filter.value,
      ),
    );
  };

  const handleRemoveAllFilters = () => setFilters([]);

  return (
    <div className="dashboard" data-cy="dashboard">
      <Flex cols={[8, 4]}>
        <Heading semanticLevel={4} data-cy="title">
          {projectName}
        </Heading>

        <Button
          variant={ButtonVariant.Primary}
          style={{ marginLeft: "auto" }}
          onPress={() => {
            setShowFilters(true);
          }}
        >
          Filter by Metadata
        </Button>
      </Flex>
      <DashboardCard style={{ padding: 0 }}>
        <Flex cols={[6, 6]} colsSm={[12, 12]}>
          <Suspense fallback={<SquareSpinner message="One moment..." />}>
            <AppOrchUIDeploymentStatus metadata={{ pairs: filters }} />
          </Suspense>
          <Suspense fallback={<SquareSpinner message="One moment..." />}>
            <EimUIHostStatus metadata={{ pairs: filters }} />
          </Suspense>
        </Flex>
      </DashboardCard>

      <div className="filters">
        {filters.map((pair) => (
          <Tag
            key={pair.key}
            iconPosition="after"
            iconVariant="solid"
            label={`${pair.key} = ${pair.value}`}
            onRemove={() => handleRemoveFilter(pair)}
            rounding="semi-round"
            size="small"
            variant="secondary"
            removable
          />
        ))}
        {filters.length > 0 && (
          <Tag
            label="Clear all filters"
            onClick={handleRemoveAllFilters}
            size="small"
            variant="ghost"
          />
        )}
      </div>

      <AppOrchGuard>
        <DashboardCard style={{ marginTop: "2rem" }}>
          <DeploymentsContainer filters={filters} />
        </DashboardCard>
      </AppOrchGuard>

      <FiltersDrawer
        show={showFilters}
        filters={filters}
        onApply={handleFilterChanges}
        onClose={() => setShowFilters(false)}
      />
      <DeploymentDrawer deploymentId={deploymentId} />
    </div>
  );
};

export default DashboardSummaries;
