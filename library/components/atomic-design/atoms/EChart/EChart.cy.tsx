/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cyGet } from "@orch-ui/tests";
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
        className="test-class"
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

  it("Should apply and match custom className", () => {
    cyGet("eCharts").should("have.class", "test-class").and("exist");
  });

  it("Should apply custom style", () => {
    cyGet("eCharts")
      .should("have.attr", "style")
      .and("include", "min-height: 400px");
  });

  it("Should respond to theme changes", () => {
    cy.mount(
      <ReactEChart
        option={{
          xAxis: { type: "category", data: xValues },
          yAxis: { type: "value" },
          series: [{ data: yValues, type: "bar" }],
        }}
        theme="dark"
        dataCy="custom-eChart"
      />,
    );
    cyGet("custom-eChart").should("exist");
  });

  it("Should apply settings correctly", () => {
    const settings = { notMerge: true };

    cy.mount(
      <ReactEChart
        option={{
          xAxis: { type: "category", data: xValues },
          yAxis: { type: "value" },
          series: [{ data: yValues, type: "line" }],
        }}
        settings={settings}
        dataCy="eCharts"
      />,
    );

    cyGet("eCharts").should("exist");
  });

  it("Should render without style or className props", () => {
    cy.mount(
      <ReactEChart
        option={{
          xAxis: { type: "category", data: xValues },
          yAxis: { type: "value" },
          series: [{ data: yValues, type: "line" }],
        }}
      />,
    );
    cy.get("div").should("exist");
  });

  it("Should use default data-cy when not provided", () => {
    cy.mount(
      <ReactEChart
        option={{
          xAxis: { type: "category", data: xValues },
          yAxis: { type: "value" },
          series: [{ data: yValues, type: "line" }],
        }}
      />,
    );
    cyGet("eCharts").should("exist");
  });
});
