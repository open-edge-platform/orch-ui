/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { BaseStore } from "../../baseStore";
import {
  chartOneName,
  chartThreeName,
  chartTwoName,
  registryOneName,
  registryThreeName,
  registryTwoName,
} from "./data/appCatalogIds";

export type ListChartsApiResponse = {
  chartName: string;
  registry: string;
  versions?: string[];
};
export const chartData: ListChartsApiResponse[] = [
  {
    chartName: chartOneName,
    registry: registryOneName,
    versions: ["1.0.0", "1.0.1", "1.2.1"],
  },
  {
    chartName: chartTwoName,
    registry: registryOneName,
    versions: ["1.0.0", "1.1.1", "1.2.0"],
  },
  {
    chartName: chartThreeName,
    registry: registryOneName,
    versions: ["1.0.0", "1.1.0", "1.2.1"],
  },
  {
    chartName: chartOneName,
    registry: registryTwoName,
    versions: ["1.0.0", "1.1.1", "1.2.0"],
  },
  {
    chartName: chartTwoName,
    registry: registryTwoName,
    versions: ["1.2.2", "1.3.0"],
  },
  {
    chartName: chartThreeName,
    registry: registryThreeName,
    versions: ["1.0.0", "1.2.0"],
  },
];

export class ChartStore extends BaseStore<
  "chartName",
  ListChartsApiResponse,
  ListChartsApiResponse
> {
  constructor() {
    super("chartName", chartData);
  }

  convert(body: ListChartsApiResponse): ListChartsApiResponse {
    return body;
  }

  getAllCharts(): ListChartsApiResponse[] {
    return this.resources;
  }

  listChart = (registry: string): string[] => {
    return chartData
      .filter((c) => c.registry === registry)
      .map((c) => c.chartName);
  };

  listVersion = (registry: string, chartName: string): string[] => {
    const chart = chartData.find(
      (c) => c.registry === registry && c.chartName === chartName,
    );
    if (chart) {
      return chart.versions || [];
    }

    return [];
  };
}
