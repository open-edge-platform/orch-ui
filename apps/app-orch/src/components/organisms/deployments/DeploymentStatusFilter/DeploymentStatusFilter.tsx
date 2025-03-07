/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Heading } from "@spark-design/react";
import "./DeploymentStatusFilter.scss";

export interface DeploymentStatusFilterProps {
  label: string;
  value: number;
  active?: boolean;
  filterActivated: (filter: string) => void;
}

const DeploymentStatusFilter = ({
  label,
  value,
  active = false,
  filterActivated,
  ...props
}: DeploymentStatusFilterProps) => {
  let classes = "deployments__status-search";

  if (active) {
    classes = "deployments__status-search deployments__status-search-active";
  }

  const handleClick = () => {
    filterActivated(label);
  };

  return (
    <div className={classes} onClick={handleClick} {...props}>
      {label}
      <Heading semanticLevel={5}>{value}</Heading>
    </div>
  );
};

export default DeploymentStatusFilter;
