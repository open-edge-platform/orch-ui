/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { Breadcrumb, BreadcrumbItem } from "@spark-design/react";
import { Link } from "react-router-dom";
import { BreadcrumbPiece } from "../../../ui/slice";
import "./LPBreadcrumb.scss";

interface LPBreadcrumbProps {
  breadcrumbPieces: BreadcrumbPiece[];
}

export const LPBreadcrumb = ({ breadcrumbPieces = [] }: LPBreadcrumbProps) => {
  let isCurrentValue: boolean;
  // Check if length of breadcrumb is larger than 2

  return breadcrumbPieces.length <= 2 ? null : (
    <Breadcrumb data-cy="breadcrumb">
      {breadcrumbPieces.map((piece) => {
        // Check if trail link
        if (breadcrumbPieces[breadcrumbPieces.length - 1].text === piece.text) {
          isCurrentValue = true;
        } else {
          isCurrentValue = false;
        }
        return (
          <BreadcrumbItem
            isCurrent={isCurrentValue}
            key={piece.text}
            as="span"
            // TODO: active does not exist on latest SI updated of this component
            //active={index === breadcrumbPieces.length - 1}
          >
            <Link
              {...{
                to: piece.link,
                ...(piece.isRelative && { relative: "path" }),
              }}
            >
              {piece.text}
            </Link>
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
};
