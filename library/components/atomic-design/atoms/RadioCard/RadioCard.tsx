/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { RadioButton } from "@spark-design/react";
import { ReactElement } from "react";
import "./RadioCard.scss";

export interface RadioCardProps {
  value: string;
  label: string;
  description: string | ReactElement;
  dataCy?: string;
}
export const RadioCard = ({
  label,
  value,
  description,
  dataCy = "radioCard",
}: RadioCardProps) => {
  const cy = { "data-cy": dataCy };
  const rc = "radio-card";
  return (
    <div {...cy} className={rc}>
      <RadioButton value={value} data-cy="radioBtn">
        {label}
      </RadioButton>
      <div className="description" data-cy="description">
        {description}
      </div>
    </div>
  );
};
