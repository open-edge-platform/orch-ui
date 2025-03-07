/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Shadow } from "@spark-design/react";
import React, { CSSProperties } from "react";
import "./DashboardCard.scss";

export const dataCy = "dashboardCard";

const DashboardCard = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: CSSProperties;
}) => {
  const cy = { "data-cy": dataCy };
  return (
    <div className="dashboard-card" {...cy}>
      <Shadow className="dashboard-card__shadow" style={style}>
        {children}
      </Shadow>
    </div>
  );
};

export default DashboardCard;
