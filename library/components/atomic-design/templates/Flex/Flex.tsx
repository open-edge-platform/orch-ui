/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { ReactNode } from "react";
import { FlexItem } from "../FlexItem/FlexItem";
import "./Flex.scss";
export const dataCy = "flex";
const colSize = ["cols", "colsSm", "colsMd", "colsLg"] as const;
const colSizeCss = ["col", "col-sm", "col-md", "col-lg"] as const;
export type FlexColSize = (typeof colSize)[number];
export type FlexColSizeCss = (typeof colSizeCss)[number];
export type FlexColValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type FlexColConfig = Record<FlexColSize, number>;
export type FlexColConfigCss = Record<FlexColSizeCss, number>;
export type FlexWrap = "wrap" | "no-wrap";
export type FlexAlign = "middle" | "start" | "end";
export type FlexJustify = "middle" | "start" | "end";
export interface FlexProps
  extends Partial<Record<FlexColSize, FlexColValue[]>> {
  wrap?: FlexWrap;
  align?: FlexAlign;
  justify?: FlexJustify;
  children: ReactNode;
  dataCy?: string;
  className?: string;
}

export const Flex = ({
  cols = [],
  colsSm = [],
  colsMd = [],
  colsLg = [],
  wrap = "wrap",
  align = "middle",
  justify = "start",
  dataCy: _dataCy = dataCy,
  className: _className = "",
  ...rest
}: FlexProps) => {
  const cy = { "data-cy": _dataCy };
  const childrenElements = React.Children.toArray(rest.children);
  const className = "flex";
  return (
    <div
      {...cy}
      className={`${className} ${className}--${wrap} ${className}--align-${align} ${className}--justify-${justify} ${_className}`.trim()}
    >
      {React.Children.map(
        childrenElements,
        (element: ReactNode, index: number) => {
          const current: FlexColConfigCss = {
            col: cols[index % cols.length],
            "col-lg": colsLg[index % colsLg.length],
            "col-md": colsMd[index % colsMd.length],
            "col-sm": colsSm[index % colsSm.length],
          };
          return (
            <FlexItem key={index} config={current}>
              {element}
            </FlexItem>
          );
        },
      )}
    </div>
  );
};
