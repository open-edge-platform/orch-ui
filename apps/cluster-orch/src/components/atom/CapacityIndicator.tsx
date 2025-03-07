/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { ProgressIndicator } from "@spark-design/react";
import React from "react";

interface ClusterIndicatorProps {
  name: string;
  percent: number;
}

export default function CapacityIndicator(props: ClusterIndicatorProps) {
  const { name, percent } = props;
  return (
    <React.Fragment>
      <ProgressIndicator
        label={name}
        successMessage={name}
        errorMessage={name}
        error={percent === 100}
        value={percent}
      />
    </React.Fragment>
  );
}
