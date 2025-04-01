/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { adm } from "@orch-ui/apis";
import {
  CardBox,
  CardContainer,
  Empty,
  Flex,
  MetadataDisplay,
  MetadataPair,
  PieSeriesOption,
  ReactEChart,
  Status,
  StatusIcon,
} from "@orch-ui/components";
import { Button, Icon, Text } from "@spark-design/react";
import { TextSize } from "@spark-design/tokens";
import { ReactNode, useEffect, useState } from "react";
import "./DeploymentDetailsStatus.scss";

export interface CompositeAppDetailsProps {
  name: string;
  version: string;
  type: string;
  valueOverrides: boolean;
  onClickViewDetails?: () => void;
}
export interface DeploymentDetailsProps {
  metadataKeyValuePairs: MetadataPair[];
  dateTime: string;
  /* Composite App/ App Pkg name and version */
  compositeAppDetailsProps: CompositeAppDetailsProps;
  /** Deployment Status */
  status?: adm.DeploymentStatusRead;
  detailedStatus?: boolean;
}

export const displayDateTime = (dateTime: string) => {
  let displayDate = dateTime;
  if (displayDate !== "-") {
    const wordDate = new Date(dateTime);
    displayDate = `${wordDate.toLocaleTimeString()} on ${wordDate.toLocaleDateString()}`;
  }
  return displayDate;
};

const DeploymentDetailsStatus = ({
  dataCy = "deploymentDetailsStatus",
  deploymentDetails,
}: {
  dataCy?: string;
  deploymentDetails: DeploymentDetailsProps;
}) => {
  const {
    compositeAppDetailsProps,
    dateTime,
    metadataKeyValuePairs,
    status,
    detailedStatus = false,
  } = deploymentDetails;

  const [chartData, setChartData] = useState<PieSeriesOption["data"]>([]);
  const [statusText, setStatusText] = useState<ReactNode>("");

  useEffect(() => {
    if (status?.summary) {
      if (status.summary.total && status.summary.total > 0) {
        setChartData([
          {
            value: status.summary.running ?? 0,
            itemStyle: { color: "#8BAE46" },
            name: "Running",
          },
          {
            value: status.summary.down ?? 0,
            itemStyle: { color: "#C81326" },
            name: "Down",
          },
        ]);
        if (status.summary.running === status.summary.total) {
          setStatusText(
            <StatusIcon
              status={Status.Ready}
              count={{
                n: status.summary.running ?? 0,
                of: status.summary.total ?? 0,
              }}
              text={`All ${status.summary.total} running`}
              size={TextSize.Large}
              showCount={false}
            />,
          );
        } else if (status.summary.down === status.summary.total) {
          setStatusText(
            <StatusIcon
              status={Status.NotReady}
              count={{
                n: status.summary.down ?? 0,
                of: status.summary.total ?? 0,
              }}
              text={`All ${status.summary.total} down`}
              size={TextSize.Large}
              showCount={false}
            />,
          );
        } else {
          // if it is the detailed view, we show both the total for NotReady and for Ready
          // otherwise we should only the NotReady ones
          if (detailedStatus) {
            setStatusText(
              <Flex cols={[4, 4]} colsLg={[3, 3]}>
                <StatusIcon
                  status={Status.NotReady}
                  count={{
                    n: status.summary.down ?? 0,
                    of: status.summary.total ?? 0,
                  }}
                  text={`${status.summary.down} down`}
                  size={TextSize.Large}
                  showCount={false}
                />
                <StatusIcon
                  status={Status.Ready}
                  count={{
                    n: status.summary.running ?? 0,
                    of: status.summary.total ?? 0,
                  }}
                  text={`${status.summary.running} running`}
                  size={TextSize.Large}
                  showCount={false}
                />
              </Flex>,
            );
          } else {
            setStatusText(
              <StatusIcon
                status={Status.NotReady}
                count={{
                  n: status.summary.down ?? 0,
                  of: status.summary.total ?? 0,
                }}
                text={`${status.summary.down} down`}
                size={TextSize.Large}
                showCount={false}
              />,
            );
          }
        }
      } else {
        setChartData([
          {
            value: 1,
            itemStyle: { color: "#D1D5DB" },
            name: "Total",
          },
        ]);
        setStatusText(
          <StatusIcon
            status={Status.Unknown}
            text={"Not yet deployed"}
            size={TextSize.Large}
            showCount={false}
          />,
        );
      }
    }
  }, []);

  const displayDate = displayDateTime(dateTime);

  return (
    <div className="deployment-details__status" data-cy={dataCy}>
      <div>
        <br />

        <table>
          <tbody>
            <tr>
              <td>
                <span className="subtitle">Deployment Package </span>

                <CardContainer
                  className="deployment-details__status__pkg-details"
                  titleSemanticLevel={6}
                >
                  <CardBox>
                    <table className="deployment-package-table">
                      <tr>
                        <td className="package-icon">
                          {" "}
                          <Icon icon="cube" />
                        </td>
                        <td>
                          <tr>
                            {" "}
                            <Text size="l" data-cy="pkgName">
                              {compositeAppDetailsProps.name}
                            </Text>
                          </tr>
                          <tr>
                            <Text size="s" data-cy="pkgVersion">
                              {compositeAppDetailsProps.version
                                ? `Version ${compositeAppDetailsProps.version}`
                                : "No version found!"}
                            </Text>
                          </tr>
                          <tr>
                            <Text size="s" data-cy="valueOverrides">
                              Value Overrides:
                              {compositeAppDetailsProps.valueOverrides
                                ? "Yes"
                                : "No"}
                            </Text>
                          </tr>
                          <tr>
                            <Button
                              onPress={
                                compositeAppDetailsProps.onClickViewDetails
                              }
                              variant="ghost"
                              size="m"
                              data-cy="viewDetailsButton"
                            >
                              View Details
                            </Button>
                          </tr>
                        </td>
                      </tr>
                    </table>
                  </CardBox>
                </CardContainer>
              </td>
              <td>
                <span className="subtitle">Deployment Configuration </span>
                <CardContainer className="deployment-details__status__metadata-tags">
                  {metadataKeyValuePairs &&
                    metadataKeyValuePairs.length > 0 && (
                      <MetadataDisplay metadata={metadataKeyValuePairs} />
                    )}
                  {(!metadataKeyValuePairs ||
                    metadataKeyValuePairs.length === 0) && (
                    <CardBox
                      className="deployment-details__status__metadata-tags__scrollbox"
                      data-cy="metadataBadges"
                    >
                      <div style={{ padding: "0" }}>
                        <Empty
                          icon="database"
                          subTitle="Metadata are not defined"
                          dataCy="emptyMetadata"
                        />
                      </div>
                    </CardBox>
                  )}
                </CardContainer>
              </td>
            </tr>
            <tr>
              <td>
                <td>
                  <ReactEChart
                    dataCy="deploymentsCounterChart"
                    style={{ minHeight: "100px" }}
                    option={{
                      tooltip: { show: false },
                      series: {
                        silent: true,
                        type: "pie",
                        radius: ["40%", "50%"],
                        name: "Deployment Status",
                        label: { show: false },
                        data: chartData,
                      },
                    }}
                  />
                </td>
                <td>
                  <tr>
                    {" "}
                    <span className="subtitle">Deployment Status </span>
                  </tr>
                  <tr>
                    {" "}
                    <Text size="m" data-cy="deploymentStatus">
                      {statusText}
                    </Text>
                  </tr>
                </td>
              </td>

              <td>
                <td>
                  <Icon icon="time" />
                </td>
                <td>
                  <tr>
                    {" "}
                    <span className="subtitle">Deployment setup at </span>
                  </tr>
                  <tr data-cy="setupDate">{displayDate}</tr>
                </td>
                <td className="deploymentType">
                  <span className="subtitle">Deployment Type </span>
                  <span data-cy="type">{compositeAppDetailsProps.type}</span>
                </td>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeploymentDetailsStatus;
