/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { useState } from "react";
import "./TextTruncate.scss";
export const dataCy = "textTruncate";
export interface TextTruncateProps {
  id: string;
  text: string;
  maxLength?: number;
}
export const TextTruncate = ({
  id,
  text,
  maxLength = 200,
}: TextTruncateProps) => {
  const cy = { "data-cy": dataCy };
  const className = "text-truncate";

  const [shouldTruncate] = useState<boolean>(text.length > maxLength);
  const [isTruncated, setIsTruncated] = useState<boolean>(shouldTruncate);

  if (!shouldTruncate)
    return (
      <div {...cy} className={className}>
        {text}
      </div>
    );
  return (
    <div {...cy} className={className}>
      <input
        data-cy="checkbox"
        type="checkbox"
        className={`${className}__toggle`}
        id={id}
        onClick={() => setIsTruncated(!isTruncated)}
      />
      <div className={`${className}__content`}>
        <span data-cy="content">
          {isTruncated ? `${text.slice(0, maxLength)}...` : text}
        </span>
        <label
          data-cy="label"
          htmlFor={id}
          className={`${className}__label ${className}__label-${isTruncated ? "more" : "less"}`}
        >
          Read {isTruncated ? "more" : "less"}
        </label>
      </div>
    </div>
  );
};
