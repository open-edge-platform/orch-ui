/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { EChartGrid, EChartLegend, EChartTitle } from "@orch-ui/utils";
import { ReactEChart } from "../../atoms/EChart/EChart";

export interface EChartDonutSeriesItem<T> {
  name: string;
  value: number;
  color?: string;
  item?: T;
  showLabel?: boolean;
}

export interface EChartDonutSeries<T> {
  data: Map<string, EChartDonutSeriesItem<T>>;
  radius: [inner: string | number, outer: string | number];
  color?: string;
  labelFormatter?: (item: T) => string;
}

export interface EChartDonutProps<T> {
  series: EChartDonutSeries<T>[];
  height?: string;
  width?: string;
  title?: string;
  dataCy?: string;
  theme?: "light" | "dark";
  showLegend?: boolean;
  showLabel?: boolean;
  middleTitle?: string;
  showTitle?: boolean;
  legendFormatter?: (item: T) => string;
}

export const EChartDonut = <T,>({
  series,
  height = "100%",
  width = "100%",
  title,
  dataCy = "echarts-donut",
  theme = "light",
  showLegend = true,
  showLabel = true,
}: EChartDonutProps<T>): JSX.Element => {
  return (
    <div data-cy={dataCy} style={{ height, width }}>
      <ReactEChart
        theme={theme}
        option={{
          title: title
            ? {
                ...EChartTitle(title),
                left: "center",
                top: "bottom",
                padding: [0, 0, 10, 0],
                textStyle: {
                  fontSize: 20,
                  fontWeight: "lighter",
                },
              }
            : { show: false },
          grid: { ...EChartGrid() },
          legend: showLegend
            ? { ...EChartLegend(), formatter: "{name}" }
            : { show: false },
          series: series.map((s: EChartDonutSeries<T>) => {
            return {
              type: "pie",
              top: showLegend ? 20 : 0,
              bottom: 20,
              itemStyle: { color: s.color },
              radius: s.radius,
              markPoint: {
                tooltip: { show: false },
                symbolOffset: [0, -10],
                label: {
                  show: true,
                  formatter: "{b}", //name of data Item
                  fontSize: 20,
                },
              },
              data: Array.from(s.data.values()).map(
                (value: EChartDonutSeriesItem<T>) => ({
                  ...value,
                  label: {
                    show: value.showLabel ?? true,
                  },
                  itemStyle: { color: value.color },
                }),
              ),
              label: showLabel
                ? {
                    position: "inner",
                    formatter: s.labelFormatter
                      ? (params) => {
                          const { item } = params.data as any;
                          return s.labelFormatter
                            ? s.labelFormatter(item as T)
                            : "";
                        }
                      : "{c}",
                  }
                : { show: false },
            };
          }),
        }}
      />
    </div>
  );
};
