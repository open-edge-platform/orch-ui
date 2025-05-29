/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Divider } from "@spark-design/react";
import { DividerThickness } from "@spark-design/tokens";
import React from "react";
import "./Section.scss";

export interface SectionProps {
  title: string;
  last?: boolean;
  children?: React.ReactNode;
}

export const Section = ({ title, last = false, children }: SectionProps) => {
  return (
    <div className={`section${last ? " last" : ""}`}>
      <h2 className="section__title">{title}</h2>
      <div className="section__content">{children}</div>
      {!last && <Divider thickness={DividerThickness.Light} />}
    </div>
  );
};
