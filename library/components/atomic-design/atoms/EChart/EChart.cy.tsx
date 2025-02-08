/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { EChartColorSet } from "@orch-ui/utils";
import { ReactEChart } from "./EChart";
import { EChartPom } from "./EChart.pom";

describe("Echart basic tests", () => {
  const xValues = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const yValues = [820, 932, 901, 934, 1290, 1330, 1320];

  beforeEach(() => {
    cy.mount(
      <ReactEChart
        option={{
          color: EChartColorSet,

          xAxis: {
            type: "category",
            boundaryGap: false,
            data: xValues,
          },
          yAxis: {
            type: "value",
          },
          tooltip: {
            trigger: "item",
          },
          series: [
            {
              data: yValues,
              type: "line",
              areaStyle: {},
            },
          ],
        }}
        theme="light"
        loading={false}
        style={{ minHeight: "400px" }}
      />,
    );
  });

  it("Should load graph", () => {
    const pom = new EChartPom("eCharts");
    pom.root.should("exist");
  });

  it("Should display X-Axis text", () => {
    const pom = new EChartPom("eCharts");
    xValues.forEach((value) => {
      pom.getValues().should("contain", value);
    });
  });

  it("Should display Y-Axis text", () => {
    const pom = new EChartPom("eCharts");
    const num = Math.max(...yValues);
    const numbersLength = Math.ceil(num / 300);
    const yHigh = numbersLength * 300;
    const format = yHigh.toLocaleString("en-US");
    pom.getValues().should("contain", format.toString());
  });
});
