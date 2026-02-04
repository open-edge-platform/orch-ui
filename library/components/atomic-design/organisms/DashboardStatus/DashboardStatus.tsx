/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Heading, Icon, IconVariant } from "@spark-design/react";
import { ApiError } from "../../atoms/ApiError/ApiError";
import { SquareSpinner } from "../../atoms/SquareSpinner/SquareSpinner";
import { Empty } from "../../molecules/Empty/Empty";
import { Flex } from "../../templates/Flex/Flex";
import "./DashboardStatus.scss";

export const DashboardStatusFooter = ({
  footerLeft = null,
  footerRight = null,
}: {
  footerLeft?: React.ReactNode;
  footerRight?: React.ReactNode;
}) => (
  <Flex cols={[6, 6]} className="dashboard-status__footer">
    <div className="dashboard-status__footer-content">{footerLeft}</div>

    <div className="dashboard-status__footer-content justify-right">
      {footerRight}
    </div>
  </Flex>
);

export interface DashboardStatusProps {
  cardTitle: string;
  isSuccess?: boolean;
  isError?: boolean;
  apiError?: unknown;
  isLoading?: boolean;
  total: number;
  error: number;
  running: number;
  empty?: {
    icon?: IconVariant;
    text?: string;
  };
  footer?: {
    left?: React.ReactNode;
    right?: React.ReactNode;
  };
  dataCy?: string;
  showTooltip?: boolean;
}
export const DashboardStatus = ({
  cardTitle = "",
  isSuccess,
  isError,
  apiError,
  isLoading,
  total = 0,
  error = 0,
  running = 0,
  empty = {
    icon: "cube-detached",
    text: "Empty",
  },
  footer = {
    left: null,
    right: null,
  },
  dataCy = "dashboardStatus",
  showTooltip = false,
}: DashboardStatusProps) => {
  if (isSuccess && (total === 0 || error > total || running > total)) {
    return (
      <Empty
        dataCy={dataCy}
        icon={empty?.icon ?? "cube-detached"}
        title={empty?.text ?? "Empty"}
      />
    );
  }
  return (
    <div className="dashboard-status" data-cy={dataCy}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <Heading semanticLevel={6}>{cardTitle}</Heading>
        {showTooltip && (
          <Icon
            icon="information-circle"
            title={`This metrics represents the count of deployment clusters,\nnot the number of deployments`}
            style={{
              cursor: "pointer",
              color: "var(--spark-color-classic-blue)",
            }}
          />
        )}
      </div>
      {isSuccess && (
        <>
          <div className="dashboard-status__stat-group">
            <div className="dashboard-status__stat-card info">
              <Icon className="icon" icon="information-circle" />
              <div className="sub-title">Total</div>
              <div className="stat" data-cy={`${dataCy}Total`}>
                {total}
              </div>
            </div>
            <div
              className={`dashboard-status__stat-card success${
                running === 0 ? " disabled" : ""
              }`}
            >
              <Icon className="icon" icon="check-circle" />
              <div className="sub-title">Running</div>
              <div className="stat" data-cy={`${dataCy}Running`}>
                {running !== 0 ? running : "-"}
              </div>
            </div>
            <div
              className={`dashboard-status__stat-card error${
                error === 0 ? " disabled" : ""
              }`}
            >
              <Icon className="icon" icon="cross-circle" />
              <div className="sub-title">Error</div>
              <div className="stat" data-cy={`${dataCy}Error`}>
                {error !== 0 ? error : "-"}
              </div>
            </div>
          </div>
          <div className="dashboard-status__footer">
            <DashboardStatusFooter
              footerLeft={footer && footer.left}
              footerRight={footer && footer.right}
            />
          </div>
        </>
      )}

      {isLoading && <SquareSpinner />}
      {isError && <ApiError error={apiError} />}
    </div>
  );
};
