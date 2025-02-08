/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { Heading, Text, semanticLevels } from "@spark-design/react";
import { PropsWithChildren } from "react";
import "./CardContainer.scss";

export interface CardContainerProps extends PropsWithChildren {
  /** Card Heading */
  cardTitle?: string;
  /** Title/Heading semantic level 1 to 6. If no semantic level is provided, by default title is considered a `<Text>` style type */
  titleSemanticLevel?: semanticLevels;
  className?: string;
  dataCy?: string;
}

/** Card with title and body */
export const CardContainer = ({
  children,
  cardTitle,
  titleSemanticLevel,
  className = "",
  dataCy = "cardContainer",
}: CardContainerProps) => (
  <div
    data-cy={dataCy}
    className={`card-container${className ? ` ${className}` : ""}`}
  >
    {cardTitle &&
      (titleSemanticLevel ? (
        <Heading semanticLevel={titleSemanticLevel}>{cardTitle}</Heading>
      ) : (
        <Text>{cardTitle}</Text>
      ))}
    {children}
  </div>
);
