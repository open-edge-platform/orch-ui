/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { PropsWithChildren } from "react";
import "./CardBox.scss";

interface CardBoxProps extends PropsWithChildren {
  className?: string;
  dataCy?: string;
}

/** Card with Border */
export const CardBox = ({
  children,
  className = "",
  dataCy = "cardBox",
}: CardBoxProps) => (
  <div
    data-cy={dataCy}
    className={`card-box${className ? ` ${className}` : ""}`}
  >
    {children}
  </div>
);
