/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { EChartGrid, EChartLegend, EChartTitle } from "@orch-ui/utils";
import { ReactEChart } from "../../atoms/EChart/EChart";

export interface EChartBarSeriesItem<T> {
  name: string;
  value: number;
  color?: string;
  item?: T;
  showLabel?: boolean;
}

export interface EChartBarSeries<T> {
  data: Map<string, EChartBarSeriesItem<T>[]>;
  color?: string;
  labelFormatter?: (item: T) => string;
  categories: string[];
}

export interface EChartBarProps<T> {
  series: EChartBarSeries<T>;
  height?: string;
  width?: string;
  title?: string;
  dataCy?: string;
  theme?: "light" | "dark";
  showLegend?: boolean;
  showTitle?: boolean;
  showLabel?: boolean;
  middleTitle?: string;
  legendFormatter?: (item: T) => string;
}

export const EChartBar = <T,>({
  series,
  height = "100%",
  width = "100%",
  title,
  dataCy = "echartsBar",
  theme = "light",
  showLegend = true,
  showTitle = true,
}: EChartBarProps<T>): JSX.Element => {
  return (
    <div data-cy={dataCy} style={{ height, width }}>
      <ReactEChart
        theme={theme}
        option={{
          xAxis: {
            type: "category",
            data: series.categories,
          },
          yAxis: { type: "value" },
          title: showTitle
            ? {
                ...EChartTitle(title),
                left: "center",
                top: 0,
                padding: [0, 0, 10, 0],
                textStyle: {
                  fontSize: 20,
                },
              }
            : { show: false },
          grid: { ...EChartGrid(30, 30, 30, 30) },
          legend: showLegend
            ? { ...EChartLegend(), formatter: "{name}" }
            : { show: false },
          series: Array.from(series.data.values()).map(
            (serie: EChartBarSeriesItem<T>[]) => {
              return {
                type: "bar",
                data: serie.map((item: EChartBarSeriesItem<T>) => {
                  return {
                    value: item.value,
                    itemStyle: {
                      color: item.color,
                    },
                    label: {
                      show: true,
                      position: "inside",
                    },
                  };
                }),
              };
            },
          ),
        }}
      />
    </div>
  );
};
