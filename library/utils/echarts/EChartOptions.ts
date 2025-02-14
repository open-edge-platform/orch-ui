/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import {
  GridComponentOption,
  LegendComponentOption,
  registerTheme,
  TitleComponentOption,
  XAXisComponentOption,
  YAXisComponentOption,
} from "echarts";

import darkTheme from "./EChartsThemeDark.json";
import lightTheme from "./EChartsThemeLight.json";

registerTheme("light", lightTheme);
registerTheme("dark", darkTheme);

//If you had multiple separate charts, this can control the sizes of each grid.
export const EChartGrid = (
  top = 0,
  right = 0,
  bottom = 0,
  left = 0,
): GridComponentOption => {
  return {
    show: true,
    top,
    right,
    bottom,
    left,
    borderColor: "transparent",
    backgroundColor: "#f9f9f9",
  };
};

export const EChartTitle = (
  text = "<Title>",
  maxWidth?: number,
): TitleComponentOption => {
  return {
    text,
    left: 0,
    top: 0,
    textStyle: {
      fontSize: 24,
      fontWeight: 100,
      width: maxWidth,
      overflow: "breakAll",
    },
  };
};

export const EChartXAxisByCategory = (
  categories: string[],
): XAXisComponentOption => {
  return {
    type: "category",
    boundaryGap: true,
    data: categories,
    axisLabel: {
      rotate: -45,
      fontSize: 12,
      color: "black",
    },
    axisLine: {
      lineStyle: {
        color: "#aeaeae",
      },
    },
    axisTick: {
      show: false,
    },
  };
};

export const EChartYAxisByValue = (
  name: string,
  min: number,
  max: number | undefined,
): YAXisComponentOption => {
  return {
    splitLine: {
      lineStyle: {
        type: "dashed",
        color: "#e9e9e9", //carbon-tint2
      },
    },
    type: "value",
    name,
    nameGap: 0,
    nameTextStyle: {
      padding: 10,
    },
    axisTick: {
      show: false,
    },
    min: min,
    max: max,
    axisLine: {
      lineStyle: {
        color: "#aeaeae",
      },
    },
    axisLabel: {
      color: "black",
    },
  };
};

export const EChartLegend = (
  orientation: "horizontal" | "vertical" = "horizontal",
): LegendComponentOption => {
  const options: LegendComponentOption = {
    show: true,
    symbolKeepAspect: true,
    selectedMode: true,
    itemHeight: 8,
    itemWidth: 8,
    itemGap: 8,
    orient: orientation,
    icon: "rect",
    type: "scroll",
    textStyle: {
      fontSize: 12,
    },
  };
  switch (orientation) {
    case "vertical":
      options.top = 0;
      break;
    case "horizontal":
      options.top = 10;
      options.align = "auto";
      break;
    default:
      break;
  }
  return options;
};

export const EChartColorSet = [
  "#0068b5", //classic-blue
  "#8bae46", //moss
  "#edb200", //daisy shade1
  "#8f5da2", //geode
  "#e96115", //rust
  "#00c7fd", //energy blue
  "#548fad", //blue steel
  "#1e2eb8", //cobalt
  "#808080", //carbon
  "#fec91b", //daisy
  "#004a86", //classic-blue shade 1
  "#ff5662", //coral
  "#c81326", //coral shade 2
  "#ccc", // gray
];

export const EChartColorSetNames = {
  classicBlue: "#0068b5", //classic-blue
  moss: "#8bae46", //moss
  daisyShade1: "#edb200", //daisy shade1
  geode: "#8f5da2", //geode
  rust: "#e96115", //rust
  energyBlue: "#00c7fd", //energy blue
  blueSteel: "#548fad", //blue steel
  cobalt: "#1e2eb8", //cobalt
  carbon: "#808080", //carbon
  daisy: "#fec91b", //daisy
  classicBlueShade1: "#004a86", //classic-blue shade 1
  coral: "#ff5662", //coral
  coralShade2: "#c81326", //coral shade 2
  gray: "#ccc",
};
