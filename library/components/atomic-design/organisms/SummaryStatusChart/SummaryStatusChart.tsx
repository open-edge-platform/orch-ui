/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { ReactEChart } from "../../atoms/EChart/EChart";

export interface SummaryStatusChartProps {
  data?: {
    total: number;
    error: number;
    running: number;
    unknown: number;
  };
  centerText?: string;
}

export const SummaryStatusChart = ({
  centerText = "Running",
  data = { total: 50, error: 15, running: 33, unknown: 7 }, // Temporary default data until integration with dashbaord
}: SummaryStatusChartProps) => {
  const chartData = [
    { value: data.running, name: "Running", itemStyle: { color: "#8BAE46" } },
    { value: data.error, name: "Error", itemStyle: { color: "#CE0000" } },
    { value: data.unknown, name: "Unknown", itemStyle: { color: "#B2B3B9" } },
  ];

  return (
    <ReactEChart
      style={{ minWidth: "250px", minHeight: "250px" }}
      dataCy={"chart"}
      option={{
        silent: true,
        legend: {
          right: "5%",
          top: "center",
          itemWidth: 20,
          selectedMode: false,
          textStyle: {
            color: "#09857C",
            fontSize: "14px",
          },
          itemGap: 15,
          orient: "vertical",
          formatter: (name) => {
            return (
              chartData.filter((row) => row.name === name)[0].value + " " + name
            );
          },
        },
        title: {
          text: centerText,
          left: "19%",
          top: "53%",
        },
        series: [
          {
            name: "Summary Status",
            type: "pie",
            center: ["30%", "50%"],
            radius: ["70%", "82%"],
            avoidLabelOverlap: false,
            padAngle: 1,
            label: {
              color: "#000",
              fontSize: "30",
              position: "center",
              formatter: () => {
                return data.total
                  ? `${Math.ceil((data.running * 100) / data.total)}%`
                  : "0";
              },
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: chartData,
          },
        ],
      }}
    />
  );
};
