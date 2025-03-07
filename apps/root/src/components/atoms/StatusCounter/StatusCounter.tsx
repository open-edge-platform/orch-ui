/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  PieSeriesOption,
  ReactEChart,
  Status,
  StatusIcon,
} from "@orch-ui/components";
import { Text } from "@spark-design/react";
import { TextSize } from "@spark-design/tokens";
import { useEffect, useState } from "react";
import "./StatusCounter.scss";

export const dataCy = "statusCounter";

export interface StatusSummary {
  total: number;
  down: number;
  running: number;
}
interface StatusCounterProps {
  showAllStates?: boolean;
  summary: StatusSummary;
  showAllStatesTitle?: string;
  noTotalMessage?: string;
  dataCy?: string;
}

interface StatusIconProps {
  status: Status;
  count?: {
    n: number;
    of: number;
  };
  text?: string;
  size?: TextSize;
  showCount?: boolean;
}
const StatusCounter = ({
  summary,
  showAllStates,
  showAllStatesTitle = "All States",
  noTotalMessage = "Totals unavailable",
  dataCy: customCy = dataCy,
}: StatusCounterProps) => {
  const cy = { "data-cy": customCy };

  //colors
  const unavailableColor = "#D1D5DB";
  const runningColor = "#8BAE46";
  const downColor = "#C81326";
  const [chartData, setChartData] = useState<PieSeriesOption["data"]>([]);
  const defaultStatusIconProps: StatusIconProps = {
    status: Status.Unknown,
    count: { n: 0, of: 0 },
    text: "Unavailable",
    size: TextSize.Large,
    showCount: false,
  };
  const [statusIconProps, setStatusIconProps] = useState<StatusIconProps[]>([
    defaultStatusIconProps,
  ]);

  const hasTotal = (summary: StatusSummary) =>
    summary && summary.total && summary.total > 0;
  const areAllRunning = (summary: StatusSummary) =>
    summary.running === summary.total;
  const areAllDown = (summary: StatusSummary) => summary.down === summary.total;

  const createChartDataItem = (value: number, color: string, name: string) => ({
    value,
    itemStyle: { color },
    name,
  });

  const createMultiStatusIconProps = ({
    running,
    down,
    total,
  }: StatusSummary): StatusIconProps[] => {
    return [
      {
        ...defaultStatusIconProps,
        status: Status.Error,
        count: { n: down ?? 0, of: total ?? 0 },
        text: `${down} Down`,
      },
      {
        ...defaultStatusIconProps,
        status: Status.Ready,
        count: { n: running ?? 0, of: total ?? 0 },
        text: `${running} Running`,
      },
    ];
  };

  const createSingleStatusIconProps = (
    summary: StatusSummary,
  ): StatusIconProps => {
    const { running, down, total } = summary;
    if (areAllRunning(summary)) {
      return {
        ...defaultStatusIconProps,
        status: Status.Ready,
        count: { n: running ?? 0, of: total ?? 0 },
        text: "All Running",
      };
    } else if (areAllDown(summary)) {
      return {
        ...defaultStatusIconProps,
        status: Status.Error,
        count: { n: down ?? 0, of: total ?? 0 },
        text: "All Down",
      };
    } else {
      return {
        ...statusIconProps,
        status: Status.Error,
        count: { n: down ?? 0, of: total ?? 0 },
        text: `${down} Down`,
      };
    }
  };

  const createStatusJsx = () => {
    const statusJsx = statusIconProps.map((props: StatusIconProps) => (
      <StatusIcon
        key={props.text}
        showCount={false}
        //className={`${cssSelector}__status`}
        {...{ ...props }}
      />
    ));

    return showAllStates ? (
      <div>
        <Text data-cy="showAllStatesTitle">{showAllStatesTitle}</Text>
        <div>{statusJsx}</div>
      </div>
    ) : (
      statusJsx
    );
  };

  useEffect(() => {
    //Note: anytime totals dont exist you create the grey cricle with this message
    if (!hasTotal(summary)) {
      setChartData([createChartDataItem(1, unavailableColor, "Total")]);
      setStatusIconProps([
        {
          ...statusIconProps,
          status: Status.Unknown,
          count: { n: 0, of: 0 },
          text: noTotalMessage,
        },
      ]);
      return;
    }

    if (showAllStates) {
      setStatusIconProps(createMultiStatusIconProps(summary));
    } else {
      setStatusIconProps([createSingleStatusIconProps(summary)]);
    }

    setChartData([
      createChartDataItem(summary.running ?? 0, runningColor, "Running"),
      createChartDataItem(summary.down ?? 0, downColor, "Down"),
    ]);
  }, [summary, showAllStates]);

  const cssSelector = "status-counter";
  return (
    <div {...cy} className={cssSelector}>
      <ReactEChart
        className={`${cssSelector}__chart`}
        style={{ width: "50px", height: "50px" }}
        dataCy={"chart"}
        option={{
          tooltip: { show: false },
          series: {
            silent: true,
            type: "pie",
            radius: ["55%", "70%"],
            name: "Deployment Status",
            label: { show: false },
            data: chartData,
          },
        }}
      />
      {createStatusJsx()}
    </div>
  );
};

export default StatusCounter;
