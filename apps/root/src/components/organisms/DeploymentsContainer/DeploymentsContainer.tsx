/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { MetadataPair } from "@orch-ui/components";
import { Heading } from "@spark-design/react";
import { useEffect, useState } from "react";
import DeploymentDetailsTable from "../../molecules/DeploymentDetailsTable/DeploymentDetailsTable";
import "./DeploymentsContainer.scss";

interface DeploymentsContainerProps {
  filters: MetadataPair[];
}

const dataCy = "deploymentsContainer";

const DeploymentsContainer = ({ filters }: DeploymentsContainerProps) => {
  const cy = { "data-cy": dataCy };
  const [labelFilter, setLabelFilter] = useState<string[]>([]);
  useEffect(() => {
    if (filters && filters.length > 0) {
      setLabelFilter(filters.map((pair) => `${pair.key}=${pair.value}`));
    } else {
      setLabelFilter([]);
    }
  }, [filters]);

  return (
    <div className="deployments-container" {...cy}>
      <Heading semanticLevel={6}>Deployments Details</Heading>
      <DeploymentDetailsTable labels={labelFilter} />
    </div>
  );
};

export default DeploymentsContainer;
