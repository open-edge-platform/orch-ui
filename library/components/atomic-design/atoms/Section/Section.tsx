/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import "./Section.scss";

export interface SectionProps {
  title: string;
  children?: React.ReactNode;
}

export const Section = ({ title, children }: SectionProps) => {
  return (
    <div className={"section"}>
      <h2 className="section__title">{title}</h2>
      <div className="section__content">{children}</div>
    </div>
  );
};
