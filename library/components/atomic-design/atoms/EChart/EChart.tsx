/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

//https://dev.to/maneetgoyal/using-apache-echarts-with-react-and-typescript-353k
import {
  BarSeriesOption,
  ECharts,
  EChartsOption,
  getInstanceByDom,
  init,
  PieSeriesOption,
  SetOptionOpts,
} from "echarts";
import { CSSProperties, useEffect, useRef } from "react";

export interface ReactEChartProps {
  option: EChartsOption;
  style?: CSSProperties;
  className?: string;
  settings?: SetOptionOpts;
  loading?: boolean;
  theme?: "light" | "dark";
  dataCy?: string;
}

export { BarSeriesOption, PieSeriesOption };

// Can't just call it EChart because it interferes with library name
export function ReactEChart({
  option,
  style,
  className,
  settings,
  loading,
  theme,
  dataCy = "eCharts",
}: ReactEChartProps): JSX.Element {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize chart
    let chart: ECharts | undefined;
    if (chartRef.current !== null) {
      chart = init(chartRef.current, theme, { renderer: "svg" });
    }

    // Add chart resize listener
    // ResizeObserver is leading to a bit janky UX
    const resizeChart = () => {
      chart?.resize();
    };
    window.addEventListener("resize", resizeChart);

    // Return cleanup function
    return () => {
      chart?.dispose();
      window.removeEventListener("resize", resizeChart);
    };
  }, [theme]);

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      if (chart) chart.setOption(option, settings);
    }
  }, [option, settings, theme]); // Whenever theme changes we need to add option and setting due to it being deleted in cleanup function

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);

      if (loading && chart) chart.showLoading();
      else if (chart) chart.hideLoading();
    }
  }, [loading, theme]);

  return (
    <div
      ref={chartRef}
      data-cy={dataCy}
      className={className}
      style={{ width: "100%", height: "100%", ...style }}
    />
  );
}
