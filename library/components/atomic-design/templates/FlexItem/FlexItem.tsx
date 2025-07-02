/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactNode } from "react";
import { FlexColConfigCss, FlexColSizeCss } from "../Flex/Flex";
import "./FlexItem.scss";

const dataCy = "flexItem";
export interface FlexItemProps {
  config: FlexColConfigCss;
  children: ReactNode;
}
export const FlexItem = ({ config, ...rest }: FlexItemProps) => {
  const cy = { "data-cy": dataCy };

  const className = "flex-item";
  const getColClasses = () =>
    (Object.keys(config) as FlexColSizeCss[]).reduce((accumulator, key) => {
      const value = config[key];
      return value
        ? accumulator + `${className}--${key}-${value} `
        : accumulator;
    }, "");
  return (
    <div {...cy} className={`${className} ${getColClasses()}`}>
      {rest.children}
    </div>
  );
};
